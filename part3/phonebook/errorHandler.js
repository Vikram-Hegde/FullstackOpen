const errorHandler = (err, request, response, next) => {
	console.error(err)

	if (err.name === 'CastError') return response.status(400).send({ error: 'malformatted id' })

	if (err.name === 'ValidationError') {
		return response.status(400).send({ error: `${err.message}` })
	}

	return next(err)
}

export default errorHandler
