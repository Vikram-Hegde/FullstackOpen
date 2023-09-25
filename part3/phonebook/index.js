import express from 'express'
import crypto from 'crypto'
import { notStrictEqual } from 'assert'
import { log } from 'console'

let phoneBook = [
	{
		id: 1,
		name: 'Arto Hellas',
		number: '040-123456',
	},
	{
		id: 2,
		name: 'Ada Lovelace',
		number: '39-44-5323523',
	},
	{
		id: 3,
		name: 'Dan Abramov',
		number: '12-43-234345',
	},
	{
		id: 4,
		name: 'Mary Poppendieck',
		number: '39-23-6423122',
	},
]

const generateID = () => {
	const maxID = Math.max(...phoneBook.map((person) => person.id))
	return maxID + 1
}

const app = express()

app.use(express.json())

app.get('/api/persons', (request, response) => {
	response.json(phoneBook)
})

app.get('/info', (request, response) => {
	response.send(`
	<p>Phonebook has info for ${phoneBook.length} people</p>	
	<p>${new Date()}</p>
	`)
})

app.get('/api/persons/:id', (request, response) => {
	const id = Number(request.params.id)
	const note = phoneBook.find((person) => person.id === id)

	if (!note) {
		response.sendStatus(404)
	}

	response.json(note)
})

app.delete('/api/persons/:id', (request, response) => {
	const id = Number(request.params.id)
	const note = phoneBook.find((person) => person.id === id)
	if (!note) return response.sendStatus(404)
	phoneBook = phoneBook.filter((person) => person.id !== id)
	response.sendStatus(204)
})

app.post('/api/persons', (request, response) => {
	const { body } = request

	if (!body || !body.name || !body.number) {
		return response.status(400).json({
			error: 'content missing',
		})
	}

	const alreadyExists = phoneBook.find((person) => person.name === body.name)
	if (alreadyExists) {
		return response.status(409).json({
			error: 'name must be unique',
		})
	}

	const newEntry = {
		...body,
		id: generateID(),
	}
	phoneBook.push(newEntry)

	response.json(newEntry)
})

app.listen(3000, () => {
	console.log('Server is running on port 3000')
})
