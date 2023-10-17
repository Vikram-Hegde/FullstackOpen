import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = async () => {
	const response = await axios.get(baseUrl, {
		headers: {
			Authorization: `Bearer ${
				JSON.parse(sessionStorage.getItem('token')).token
			}`,
		},
	})
	return response.data
}

const addBlog = async (newBlog) => {
	const response = await axios.post(baseUrl, newBlog, {
		headers: {
			Authorization: `Bearer ${
				JSON.parse(sessionStorage.getItem('token')).token
			}`,
		},
	})

	return response.data
}

export default { getAll, addBlog }
