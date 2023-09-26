import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import phoneBook from './phoneBook.js'

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

app.get('/api/persons', (request, response) => {
	phoneBook
		.find({})
		.then((result) => {
			response.json(result)
		})
		.catch((e) => {
			console.error(e)
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
		})
})

app.get('/api/persons/:id', (request, response) => {
	phoneBook
		.findById(request.params.id)
		.then((result) => {
			if (!result) throw new Error('Not Found')
			response.json(result)
		})
		.catch((e) => {
			console.error(e)
			response.sendStatus(404)
		})
})

app.delete('/api/persons/:id', (request, response) => {
	phoneBook
		.findByIdAndDelete(request.params.id)
		.then((result) => {
			if (!result) throw new Error('Resource not found')
			response.sendStatus(204)
		})
		.catch((e) => {
			console.error(e)
			response.sendStatus(404)
		})
})

app.post('/api/persons', (request, response) => {
	const { body } = request

	if (!body || !body.name || !body.number) {
		return response.status(400).json({
			error: 'content missing',
		})
	}

	phoneBook.find({ name: body.name }).then((result) => {
		// implementing this in the later excersise
		// if (result.length) {
		// 	return response.status(409).json({
		// 		error: 'name must be unique',
		// 	})
		// } else {
		// 	const newEntry = new phoneBook(body)
		// 	newEntry.save().then((result) => response.json(result))
		// }

		const newEntry = new phoneBook(body)
		newEntry.save().then((result) => response.json(result))
	})
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`)
})
