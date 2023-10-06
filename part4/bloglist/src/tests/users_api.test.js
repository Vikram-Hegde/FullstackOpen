import { api } from './supertest.js'
import mongoose from 'mongoose'

test('invalid response for incomplete info', async () => {
	const newUser = {
		name: 'Vikram',
		password: 'dragon',
	}
	await api.post('/api/users').send(newUser).expect(400)
}, 15000)

test('invalid response for incomplete info', async () => {
	const newUser = {
		name: 'Vi',
		password: 'dragon',
		username: 'vikram1440',
	}
	await api.post('/api/users').send(newUser).expect(400)
}, 15000)

afterAll(async () => {
	await mongoose.connection.close()
})
