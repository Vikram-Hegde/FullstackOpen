const errorHandler = (error, request, response, next) => {
	console.error(error)

	if (error.name === 'CastError')
		return response.status(400).send({ error: 'malformatted id' })

	next(error)
}

export default errorHandler
