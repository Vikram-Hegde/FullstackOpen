import { Schema, model, connect } from 'mongoose'

connect(process.env.MONGO_URI)
	.then(() => {
		console.log('connected to mongodb')
	})
	.catch((e) => {
		console.log(`could not connect to database: ${e}`)
	})

const phoneSchema = new Schema({
	name: {
		type: String,
		minLength: 3,
		required: true,
	},
	number: {
		type: String,
		minLength: 8,
		validate: {
			validator: function (v) {
				return /\d{2,3}-\d+/.test(v)
			},
			message: (prop) => `${prop.value} is not a valid phone number`,
		},
		required: true,
	},
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
