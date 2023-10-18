import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/user'
import Notification from './components/Notification'

const LoginForm = ({ setLoggedIn, setNotification }) => {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')

	const handleSubmit = async (e) => {
		e.preventDefault()
		try {
			const response = await loginService.loginUser({
				username,
				password,
			})
			if (response?.token) {
				setLoggedIn(true)
				sessionStorage.setItem('token', JSON.stringify(response))
				setNotification({
					message: `${response.username} logged in`,
					type: 'success',
				})
			}
		} catch (e) {
			setNotification({
				message: 'invalid username or password',
				type: 'danger',
			})
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

const AddBlog = ({ setBlogs, setNotification }) => {
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
			setNotification({
				message: `Added ${newBlog.title} by ${newBlog.author}`,
				type: 'success',
			})
		} else {
			setNotification({
				message: 'Unable to add new blog',
				type: 'danger',
			})
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

const Blogs = ({ setLoggedIn, setNotification }) => {
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
			<AddBlog setBlogs={setBlogs} setNotification={setNotification} />
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
	const [notification, setNotification] = useState(false)

	if (notification) {
		setTimeout(() => {
			setNotification(false)
		}, 5000)
	}

	return (
		<main>
			{notification && <Notification data={notification} />}

			{isLoggedIn ? (
				<Blogs setLoggedIn={setLoggedIn} setNotification={setNotification} />
			) : (
				<LoginForm
					setLoggedIn={setLoggedIn}
					setNotification={setNotification}
				/>
			)}
		</main>
	)
}

export default App
