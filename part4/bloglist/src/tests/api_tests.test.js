import { api } from './supertest.js'
import mongoose from 'mongoose'

/*
	Poorvi JWT - eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InBvb3J2aTEyMjQiLCJpZCI6IjY1MjQwZjRjYzUxYTlkYzI5MDk1NDc5MSIsImlhdCI6MTY5NzE4Njg5Nn0.a6kVwSoiNr-HCBeiUhnVqEA3wm6lAWKPXgTc9nVxM00
	Vikram JWT - eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InZpa3JhbSIsImlkIjoiNjUxZWZkNmVhZWFmY2ZiY2ZkZTlkMWVlIiwiaWF0IjoxNjk3MTg2OTU3fQ.C3RFLofWEJQTdrPFFqsE8V59pU0igNKZgMseDzub_nY
*/

// eslint-disable-next-line no-unused-vars
let id

describe('crud operations on /api/blogs', () => {
	test('blogs are returned as json', async () => {
		await api
			.get('/api/blogs')
			.set(
				'Authorization',
				'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InBvb3J2aTEyMjQiLCJpZCI6IjY1MjQwZjRjYzUxYTlkYzI5MDk1NDc5MSIsImlhdCI6MTY5NzE4Njg5Nn0.a6kVwSoiNr-HCBeiUhnVqEA3wm6lAWKPXgTc9nVxM00'
			)
			.expect(200)
			.expect('Content-Type', /application\/json/)
	}, 15000)

	test('blogs have id defined', async () => {
		const response = await api
			.get('/api/blogs')
			.set(
				'Authorization',
				'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InBvb3J2aTEyMjQiLCJpZCI6IjY1MjQwZjRjYzUxYTlkYzI5MDk1NDc5MSIsImlhdCI6MTY5NzE4Njg5Nn0.a6kVwSoiNr-HCBeiUhnVqEA3wm6lAWKPXgTc9nVxM00'
			)
		expect(response.status).toBe(200)
		response.body.forEach((res) => expect(res.id).toBeDefined())
	}, 15000)

	test('post request adds to db', async () => {
		const beforePost = await api
			.get('/api/blogs')
			.set(
				'Authorization',
				'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InBvb3J2aTEyMjQiLCJpZCI6IjY1MjQwZjRjYzUxYTlkYzI5MDk1NDc5MSIsImlhdCI6MTY5NzE4Njg5Nn0.a6kVwSoiNr-HCBeiUhnVqEA3wm6lAWKPXgTc9nVxM00'
			)
		expect(beforePost.status).toBe(200)
		const newBlog = {
			title: 'React patterns',
			author: 'Michael Chan',
			url: 'https://reactpatterns.com/',
			likes: 7,
			user: '651efd6eaeafcfbcfde9d1ee',
		}

		const response = await api
			.post('/api/blogs')
			.set(
				'Authorization',
				'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InBvb3J2aTEyMjQiLCJpZCI6IjY1MjQwZjRjYzUxYTlkYzI5MDk1NDc5MSIsImlhdCI6MTY5NzE4Njg5Nn0.a6kVwSoiNr-HCBeiUhnVqEA3wm6lAWKPXgTc9nVxM00'
			)
			.send(newBlog)
		id = response.body.id
		expect(response.status).toBe(200)

		const afterPost = await api
			.get('/api/blogs')
			.set(
				'Authorization',
				'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InBvb3J2aTEyMjQiLCJpZCI6IjY1MjQwZjRjYzUxYTlkYzI5MDk1NDc5MSIsImlhdCI6MTY5NzE4Njg5Nn0.a6kVwSoiNr-HCBeiUhnVqEA3wm6lAWKPXgTc9nVxM00'
			)
		expect(afterPost.body.length).toBe(beforePost.body.length + 1)
	}, 15000)

	test('checking if deleting on malformatted id return error', async () => {
		const del = await api
			.delete('/api/blogs/8965123548')
			.set(
				'Authorization',
				'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InBvb3J2aTEyMjQiLCJpZCI6IjY1MjQwZjRjYzUxYTlkYzI5MDk1NDc5MSIsImlhdCI6MTY5NzE4Njg5Nn0.a6kVwSoiNr-HCBeiUhnVqEA3wm6lAWKPXgTc9nVxM00'
			)
		expect(del.status).toBe(400)
	}, 15000)

	test('checking if updating on malformatted id return error', async () => {
		await api
			.put('/api/blogs/8965123548')
			.set(
				'Authorization',
				'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InBvb3J2aTEyMjQiLCJpZCI6IjY1MjQwZjRjYzUxYTlkYzI5MDk1NDc5MSIsImlhdCI6MTY5NzE4Njg5Nn0.a6kVwSoiNr-HCBeiUhnVqEA3wm6lAWKPXgTc9nVxM00'
			)

			.expect(400)
	}, 15000)

	test('updating likes', async () => {
		const updatedLikes = 10
		const put = await api
			.put(`/api/blogs/${id}`)
			.send({ likes: updatedLikes })
			.set(
				'Authorization',
				'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InBvb3J2aTEyMjQiLCJpZCI6IjY1MjQwZjRjYzUxYTlkYzI5MDk1NDc5MSIsImlhdCI6MTY5NzE4Njg5Nn0.a6kVwSoiNr-HCBeiUhnVqEA3wm6lAWKPXgTc9nVxM00'
			)
			.expect(200)

		expect(put.body.likes).toBe(updatedLikes)
	}, 15000)

	test('checking if deleteing works', async () => {
		const response = await api
			.get('/api/blogs')
			.set(
				'Authorization',
				'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InBvb3J2aTEyMjQiLCJpZCI6IjY1MjQwZjRjYzUxYTlkYzI5MDk1NDc5MSIsImlhdCI6MTY5NzE4Njg5Nn0.a6kVwSoiNr-HCBeiUhnVqEA3wm6lAWKPXgTc9nVxM00'
			)
		expect(response.status).toBe(200)
		await api
			.delete(`/api/blogs/${id}`)
			.set(
				'Authorization',
				'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InBvb3J2aTEyMjQiLCJpZCI6IjY1MjQwZjRjYzUxYTlkYzI5MDk1NDc5MSIsImlhdCI6MTY5NzE4Njg5Nn0.a6kVwSoiNr-HCBeiUhnVqEA3wm6lAWKPXgTc9nVxM00'
			)
			.expect(204)
	}, 15000)
})
describe('invalid and incomplete info /api/users', () => {
	test('invalid response for incomplete info', async () => {
		const newUser = {
			name: 'Vikram',
			password: 'dragon',
		}
		await api
			.post('/api/users')
			.send(newUser)
			.set(
				'Authorization',
				'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InBvb3J2aTEyMjQiLCJpZCI6IjY1MjQwZjRjYzUxYTlkYzI5MDk1NDc5MSIsImlhdCI6MTY5NzE4Njg5Nn0.a6kVwSoiNr-HCBeiUhnVqEA3wm6lAWKPXgTc9nVxM00'
			)
			.expect(400)
	}, 15000)

	test('invalid response for invalid info', async () => {
		const newUser = {
			name: 'Vikram',
			password: 'dragon',
			username: 'vi',
		}
		await api
			.post('/api/users')
			.send(newUser)
			.set(
				'Authorization',
				'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InBvb3J2aTEyMjQiLCJpZCI6IjY1MjQwZjRjYzUxYTlkYzI5MDk1NDc5MSIsImlhdCI6MTY5NzE4Njg5Nn0.a6kVwSoiNr-HCBeiUhnVqEA3wm6lAWKPXgTc9nVxM00'
			)
			.expect(400)
	}, 15000)
})

describe('token based authentication tests', () => {
	test('checking invalid token error', async () => {
		await api
			.delete('/api/blogs/6524f1a02797ca0f0161e2f3')
			.set(
				'Authorization',
				'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InBvb3J2aTEyMjQiLCJpZCI6IjY1MjQwZjRjYzUxYTlkYzI5MDk1NDc5MSIsImlhdCI6MTY5NzE4Njg5Nn0.a6kVwSoiNr-HCBeiUhnVqEA3wm6lAWKPXgTc9nVxM00'
			)
			.expect(401)
	})
})

afterAll(async () => {
	await mongoose.connection.close()
})
