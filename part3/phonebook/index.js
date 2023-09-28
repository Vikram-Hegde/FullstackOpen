import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import phoneBook from './phoneBook.js'
import errorHandler from './errorHandler.js'

morgan.token('response', (req, res) =>
	req.body ? JSON.stringify(req.body) : ''
)

const app = express()
app.use(cors())
app.use(express.static('dist'))
app.use(express.json())
app.use(
	morgan(
		':method :url :status :res[content-length] - :response-time ms :response'
	)
)

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`)
})

app.get('/api/persons', (request, response) => {
	phoneBook
		.find({})
		.then((result) => {
			response.json(result)
		})
		.catch((e) => {
			console.error(e)
			response.sendStatus(500)
		})
})

app.get('/info', (request, response) => {
	phoneBook
		.countDocuments({})
		.then((count) => {
			response.status(200).send(`
			<p>Phonebook has info for ${count} people</p>	
			<p>${new Date()}</p>
	`)
		})
		.catch((e) => {
			console.error(e)
			response.sendStatus(500)
		})
})

app.get('/api/persons/:id', (request, response, next) => {
	phoneBook
		.findById(request.params.id)
		.then((result) => {
			if (!result) response.sendStatus(404)
			response.json(result)
		})
		.catch((e) => {
			next(e)
		})
})

app.delete('/api/persons/:id', (request, response, next) => {
	phoneBook
		.findByIdAndDelete(request.params.id)
		.then((result) => {
			if (!result) response.sendStatus(404)
			response.sendStatus(204)
		})
		.catch((e) => {
			next(e)
		})
})

app.post('/api/persons', (request, response, next) => {
	const { body } = request

	if (!body || !body.name || !body.number) {
		return response.status(400).json({
			error: 'content missing',
		})
	}

	const newEntry = new phoneBook(body)
	newEntry
		.save()
		.then((result) => response.json(result))
		.catch((e) => next(e))
})

app.put('/api/persons/:id', (request, response, next) => {
	const { body } = request

	if (!body || !body.name || !body.number) {
		return response.status(400).json({
			error: 'content missing',
		})
	}

	phoneBook
		.findByIdAndUpdate(request.params.id, body, {
			new: true,
			runValidators: true,
			context: 'query',
		})
		.then((result) => {
			if (!result) {
				response.status(404).json({
					error:
						'Requested resource was not found, or was already removed from server',
				})
			} else response.json(result)
		})
		.catch((e) => next(e))
})

app.use((request, response) => {
	response.sendStatus(404)
})

app.use(errorHandler)
