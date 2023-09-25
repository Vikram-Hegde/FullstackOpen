const baseURL = 'http://localhost:3000/api/persons'

const getAll = async () => {
	const request = await fetch(baseURL)
	if (!request.ok) throw new Error('could not connect to server')
	return request.json()
}

const create = async (newData) => {
	const request = await fetch(baseURL, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(newData),
	})
	if (!request.ok) throw new Error('could not create a new entry')
	return request.json()
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
	return request.json()
}

export default { getAll, create, deleteNumber, update }
