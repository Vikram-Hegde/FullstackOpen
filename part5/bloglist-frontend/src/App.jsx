import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/user'

const LoginForm = ({ setLoggedIn }) => {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')

	const handleSubmit = async (e) => {
		e.preventDefault()
		const response = await loginService.loginUser({
			username,
			password,
		})
		if (response?.token) {
			setLoggedIn(true)
			sessionStorage.setItem('token', JSON.stringify(response))
		}
	}

	return (
		<>
			<h1>Login Form</h1>
			<form onSubmit={handleSubmit}>
				<label htmlFor="#username">Username</label>
				<input
					type="text"
					name="username"
					id="username"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
				/>
				<br />
				<label htmlFor="#password">Password</label>
				<input
					type="text"
					name="password"
					id="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				<br />
				<button>login</button>
			</form>{' '}
		</>
	)
}

const NewBlogForm = ({ setBlogs }) => {
	const handleSubmit = async (e) => {
		e.preventDefault()
		const formData = new FormData(e.target)
		const newBlog = {
			title: formData.get('title'),
			author: formData.get('author'),
			url: formData.get('url'),
		}
		const response = await blogService.addBlog(newBlog)
		if (response?.id) {
			setBlogs((prevBlogs) => [...prevBlogs, response])
		}
		e.target.reset()
	}
	return (
		<>
			<h1>Add new blog</h1>
			<form onSubmit={handleSubmit}>
				<label htmlFor="#title">Title</label>
				<input type="text" id="title" name="title" />
				<br />
				<label htmlFor="#author">Author</label>
				<input type="text" id="author" name="author" />
				<br />
				<label htmlFor="#url">URL</label>
				<input type="url" id="url" name="url" />
				<br />
				<button>add blog</button>
			</form>
		</>
	)
}

const Blogs = ({ setLoggedIn }) => {
	const [blogs, setBlogs] = useState([])
	const user = JSON.parse(sessionStorage.getItem('token'))

	const handleLogout = () => {
		sessionStorage.removeItem('token')
		setLoggedIn(false)
	}

	useEffect(() => {
		blogService.getAll().then((blogs) => setBlogs(blogs))
	}, [])

	return (
		<div>
			<h2>blogs</h2>
			<p>
				{user.name} has logged in <button onClick={handleLogout}>logout</button>
			</p>
			<NewBlogForm setBlogs={setBlogs} />
			{blogs.map((blog) => (
				<Blog key={blog.id} blog={blog} />
			))}
		</div>
	)
}

const App = () => {
	const [isLoggedIn, setLoggedIn] = useState(
		sessionStorage.getItem('token') !== null
	)
	return (
		<main>
			{isLoggedIn ? (
				<Blogs setLoggedIn={setLoggedIn} />
			) : (
				<LoginForm setLoggedIn={setLoggedIn} />
			)}
		</main>
	)
}

export default App
