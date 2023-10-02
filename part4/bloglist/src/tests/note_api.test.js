import mongoose from 'mongoose'
import supertest from 'supertest'
import { app } from '../index.js'
import { Blog } from '../models/Blog.js'

const api = supertest(app)

test('blogs are returned as json', async () => {
	await api
		.get('/api/blogs')
		.expect(200)
		.expect('Content-Type', /application\/json/)
}, 8000)

test('blogs have id defined', async () => {
	const response = await api.get('/api/blogs')
	expect(response.status).toBe(200)
	response.body.forEach((res) => expect(res.id).toBeDefined())
}, 8000)

test('post request adds to db', async () => {
	const beforePost = await api.get('/api/blogs')
	expect(beforePost.status).toBe(200)
	const newBlog = {
		title: 'React patterns',
		author: 'Michael Chan',
		url: 'https://reactpatterns.com/',
		likes: 7,
	}

	await Blog.create(newBlog)

	const afterPost = await api.get('/api/blogs')
	expect(afterPost.body.length).toBe(beforePost.body.length + 1)
}, 15000)

afterAll(async () => {
	await mongoose.connection.close()
})
