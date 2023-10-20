import axios from 'axios'
const baseURL = '/api/blogs'

const headers = {
	headers: {
		Authorization: `Bearer ${
			JSON.parse(sessionStorage.getItem('token'))?.token
		}`,
	},
}

const getAll = async () => {
	const response = await axios.get(baseURL, headers)
	return response.data
}

const addBlog = async (newBlog) => {
	const response = await axios.post(baseURL, newBlog, headers)
	return response.data
}

const updateBlog = async (updatedBlog, id) => {
	const response = await axios.put(`${baseURL}/${id}`, updatedBlog, headers)
	return response.data
}

const deleteBlog = async (id) => {
	await axios.delete(`${baseURL}/${id}`, headers)
}

export default { getAll, addBlog, updateBlog, deleteBlog }
