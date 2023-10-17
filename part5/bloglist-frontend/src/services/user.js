import axios from 'axios'
const baseUrl = '/api/login'

const loginUser = async (userData) => {
	const request = await axios.post(baseUrl, userData)
	return request.data
}

export default { loginUser }
