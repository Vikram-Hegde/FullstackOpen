import { Router } from 'express'
import { Blog } from '../models/Blog.js'

const blogsRouter = Router()

blogsRouter.get('/', (req, res) => {
	Blog.find({})
		.then((result) => res.json(result))
		.catch((e) => {
			console.error(e)
			res.sendStatus(500)
		})
})

blogsRouter.post('/', (req, res, next) => {
	const { body } = req
	const newBlog = new Blog(body)
	newBlog
		.save()
		.then((result) => res.json(result))
		.catch((e) => {
			next(e)
		})
})

export default blogsRouter
