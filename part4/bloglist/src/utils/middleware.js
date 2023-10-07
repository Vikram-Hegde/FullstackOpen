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

	if (err.name === 'DuplicateKeyError')
		return res.status(409).json({ error: 'username already exists' })

	return next(err)
}
