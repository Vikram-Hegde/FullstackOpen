const baseURL = '/api/persons'

const getAll = async () => {
	const response = await fetch(baseURL)
	const data = await response.json()

	if (!response?.ok) throw new Error(data.error)

	return data
}

const create = async (newData) => {
	const response = await fetch(baseURL, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(newData),
	})
	const data = await response.json()

	if (!response?.ok) throw new Error(data.error)

	return data
}

const deleteNumber = async (id) => {
	const request = await fetch(`${baseURL}/${id}`, {
		method: 'DELETE',
	})
	if (!request.ok) throw new Error()
	return request
}

const update = async (id, newData) => {
	const response = await fetch(`${baseURL}/${id}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(newData),
	})
	const data = await response.json()
	if (!response?.ok) throw new Error(data.error)

	return data
}

export default { getAll, create, deleteNumber, update }
