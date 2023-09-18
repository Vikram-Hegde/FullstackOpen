const baseURL = 'http://localhost:3000/persons'

const getAll = async () => {
	const data = await fetch(baseURL)
	return data.json()
}

const create = async (newData) => {
	const response = await fetch(baseURL, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(newData),
	})
	return response.json()
}

const deleteNumber = async (id) => {
	await fetch(`${baseURL}/${id}`, {
		method: 'DELETE',
	})
}

const update = async (id, data) => {
	const response = await fetch(`${baseURL}/${id}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	})
	return response.json()
}

export default { getAll, create, deleteNumber, update }
