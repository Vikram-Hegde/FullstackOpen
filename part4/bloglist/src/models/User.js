import { Schema, model } from 'mongoose'

const userSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	username: {
		type: String,
		required: true,
		unique: true,
		minlength: 3,
	},
	password: {
		type: String,
		required: true,
		minlength: 3,
	},
	bloglist: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Blog',
		},
	],
})

userSchema.set('toJSON', {
	transform: (doc, obj) => {
		obj.id = obj._id.toString()

		delete obj._id
		delete obj.__v
		delete obj.password

		return obj
	},
})

export const User = model('User', userSchema)
