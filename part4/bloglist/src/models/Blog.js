import { Schema, model } from 'mongoose'

const blogSchema = new Schema({
	author: {
		type: String,
		required: true,
	},
	title: {
		type: String,
		required: true,
	},
	url: {
		type: String,
		required: true,
	},
	likes: {
		type: Number,
		required: true,
	},
})

blogSchema.set('toJSON', {
	transform: (doc, obj) => {
		obj.id = obj._id.toString()
		delete obj._id
		delete obj.__v
	},
})

export const Blog = model('Blog', blogSchema)
