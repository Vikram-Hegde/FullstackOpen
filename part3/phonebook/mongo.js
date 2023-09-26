import mongoose from 'mongoose'
import Contact from './models/Contact.js'

mongoose
	.connect(process.env.MONGO_URI)
	.then(() => {
		console.log('connected to mongodb')
	})
	.catch((e) => {
		console.log(`could not connect to database: ${e}`)
	})

console.log(Contact)
