import mongoose from 'mongoose'
import supertest from 'supertest'
import { app } from '../index.js'

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

afterAll(async () => {
	await mongoose.connection.close()
})
