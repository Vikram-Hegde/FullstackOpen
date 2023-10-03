import { Router } from 'express'
import { Blog } from '../models/Blog.js'

const blogsRouter = Router()

blogsRouter.get('/', async (req, res) => {
	try {
		const response = await Blog.find({}).lean()
		res.json(response)
	} catch (e) {
		console.error(e)
		res.sendStatus(500)
	}
})

blogsRouter.post('/', async (req, res, next) => {
	try {
		const { body } = req
		const newBlog = await Blog.create(body)
		const response = await newBlog.save()
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
