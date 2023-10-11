import jwt from 'jsonwebtoken'
import { User } from '../models/User.js'

export const unknownEndPoint = (req, res, next) => {
	res.sendStatus(404)
	next()
}

export const errorHandler = (err, req, res, next) => {
	console.error(err)

	if (err.name === 'CastError')
		return res.status(400).json({ error: 'malformatted id' })

	if (err.name === 'ValidationError')
		return res.status(400).json({ error: `${err.message}` })

	if (err.name === 'JsonWebTokenError') {
		return res.status(401).json({ error: `${err.message}` })
	}
	return next(err)
}

export const extractToken = (req, res, next) => {
	const getToken = (request) => {
		const authorization = request.get('authorization')
		if (!(authorization && authorization.startsWith('Bearer '))) return null

		return authorization.replace('Bearer ', '')
	}

	req.token = jwt.verify(getToken(req), process.env.SECRET)
	next()
}

export const userExtractor = async (req, res, next) => {
	try {
		const user = await User.findById(req.token.id)
		if (user) {
			req.user = user
		} else {
			req.user = null
		}
		next()
	} catch (e) {
		next(e)
	}
}
