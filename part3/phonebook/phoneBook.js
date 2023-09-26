import { Schema, model, connect } from 'mongoose'

connect(process.env.MONGO_URI)
	.then(() => {
		console.log('connected to mongodb')
	})
	.catch((e) => {
		console.log(`could not connect to database: ${e}`)
	})

const phoneSchema = new Schema({
	name: String,
	number: String,
})

// to remove _id and __v fields from output
phoneSchema.set('toJSON', {
	transform: (doc, obj) => {
		obj.id = obj._id.toString()
		delete obj._id
		delete obj.__v
	},
})

export default model('Person', phoneSchema)
