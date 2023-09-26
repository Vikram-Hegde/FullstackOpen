import { Schema, model } from 'mongoose'

const phoneSchema = new Schema({
	name: String,
	number: String,
})

const phoneBookModel = model('People', phoneSchema)

export default phoneBookModel
