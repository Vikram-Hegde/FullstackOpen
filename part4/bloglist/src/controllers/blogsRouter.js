import { Router } from 'express'
import { Blog } from '../models/Blog.js'
import { User } from '../models/User.js'
import jwt from 'jsonwebtoken'

const blogsRouter = Router()

blogsRouter.get('/', async (req, res) => {
	try {
		const response = await Blog.find({}).populate('user')
		res.json(response)
	} catch (e) {
		console.error(e)
		res.sendStatus(500)
	}
})

blogsRouter.get('/:id', async (req, res, next) => {
	try {
		const id = req.params.id
		const response = await Blog.findById(id)
		res.json(response)
	} catch (e) {
		next(e)
	}
})

blogsRouter.post('/', async (req, res, next) => {
	try {
		const { body } = req

		const newBlog = await Blog.create(body)
		const verifyToken = jwt.verify(req.token, process.env.SECRET)
		const user = await User.findById(verifyToken.id)

		newBlog.user = user._id

		const response = await newBlog.save()
		user.bloglist = user.bloglist.concat(response._id)
		await user.save()
		res.json(response)
	} catch (e) {
		next(e)
	}
})

blogsRouter.delete('/:id', async (req, res, next) => {
	try {
		const id = req.params.id
		await Blog.findByIdAndDelete(id)
		res.sendStatus(204)
	} catch (e) {
		next(e)
	}
})

blogsRouter.put('/:id', async (req, res, next) => {
	try {
		const { body } = req
		const id = req.params.id
		const updatedBlog = await Blog.findByIdAndUpdate(id, body, {
			runValidators: true,
			context: 'query',
			new: true,
		})
		const response = await updatedBlog.save()
		res.json(response)
	} catch (e) {
		next(e)
	}
})

export default blogsRouter
