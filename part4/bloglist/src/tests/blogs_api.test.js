import { api } from './supertest.js'
import mongoose from 'mongoose'

// eslint-disable-next-line no-unused-vars
let id

test('blogs are returned as json', async () => {
	await api
		.get('/api/blogs')
		.expect(200)
		.expect('Content-Type', /application\/json/)
}, 15000)

test('blogs have id defined', async () => {
	const response = await api.get('/api/blogs')
	expect(response.status).toBe(200)
	console.log(response.body)
	response.body.forEach((res) => expect(res.id).toBeDefined())
}, 15000)

test('post request adds to db', async () => {
	const beforePost = await api.get('/api/blogs')
	expect(beforePost.status).toBe(200)
	const newBlog = {
		title: 'React patterns',
		author: 'Michael Chan',
		url: 'https://reactpatterns.com/',
		likes: 7,
	}

	const response = await api.post('/api/blogs').send(newBlog)
	id = response.body.id
	expect(response.status).toBe(200)

	const afterPost = await api.get('/api/blogs')
	expect(afterPost.body.length).toBe(beforePost.body.length + 1)
}, 15000)

test('checking if deleting on malformatted id return error', async () => {
	const del = await api.delete('/api/blogs/8965123548')
	expect(del.status).toBe(400)
}, 15000)

test('checking if updating on malformatted id return error', async () => {
	await api.put('/api/blogs/8965123548').expect(400)
}, 15000)

test('updating likes', async () => {
	const updatedLikes = 10
	const put = await api
		.put(`/api/blogs/${id}`)
		.send({ likes: updatedLikes })
		.expect(200)

	expect(put.body.likes).toBe(updatedLikes)
})

test('checking if deleteing works', async () => {
	const response = await api.get('/api/blogs')
	expect(response.status).toBe(200)
	await api.delete(`/api/blogs/${id}`).expect(204)
}, 15000)

afterAll(async () => {
	await mongoose.connection.close()
})
