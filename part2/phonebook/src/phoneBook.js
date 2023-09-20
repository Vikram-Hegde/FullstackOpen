const baseURL = 'http://localhost:3000/persons'

const getAll = async () => {
	const request = await fetch(baseURL)
	if (!request.ok) throw new Error('couldnt connect to server')
	const response = await request.json()
	return response
}

const create = async (newData) => {
	const request = await fetch(baseURL, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(newData),
	})
	if (!request.ok) throw new Error('couldnt create a new entry')
	const response = await request.json()
	return response
}

const deleteNumber = async (id) => {
	const request = await fetch(`${baseURL}/${id}`, {
		method: 'DELETE',
	})
	if (!request.ok) throw new Error()
	return request
}

const update = async (id, data) => {
	const request = await fetch(`${baseURL}/${id}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	})
	if (!request.ok) throw new Error()
	const response = await request.json()
	return response
}

export default { getAll, create, deleteNumber, update }
