import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import morgan from 'morgan'
import { MONGO_URI, PORT } from './utils/config.js'
import blogsRouter from './controllers/blogsRouter.js'
import { errorHandler, unknownEndPoint } from './utils/middleware.js'
import usersRouter from './controllers/usersRouter.js'

export const app = express()

app.use(cors())
app.use(express.json())
app.use(morgan('dev'))
app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use(unknownEndPoint)
app.use(errorHandler)

mongoose
	.connect(MONGO_URI)
	.then(() => {
		console.log('connected to DB sucessfully')
	})
	.catch((e) => {
		console.error(e)
	})

app.listen(PORT, () => {
	console.log(`Server started on port ${PORT}`)
})
