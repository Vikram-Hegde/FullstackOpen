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

export default { getAll, create, deleteNumber }
