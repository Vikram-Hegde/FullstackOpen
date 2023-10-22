import { useEffect, useRef, useState } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/user'

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

const AddBlog = ({ setBlogs, setNotification, toggleVisibility }) => {
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
			toggleVisibility()
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
				<input type="text" id="title" name="title" required />
				<br />
				<label htmlFor="#author">Author</label>
				<input type="text" id="author" name="author" required />
				<br />
				<label htmlFor="#url">URL</label>
				<input type="url" id="url" name="url" required />
				<br />
				<button>add blog</button>
			</form>
		</>
	)
}

const Blogs = ({ setLoggedIn, setNotification }) => {
	const [blogs, setBlogs] = useState([])
	const user = JSON.parse(sessionStorage.getItem('token'))

	const addBlogRef = useRef()

	const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes)

	const handleLogout = () => {
		sessionStorage.removeItem('token')
		setLoggedIn(false)
	}

	const handleDelete = async (id) => {
		try {
			if (window.confirm('Are you sure?')) {
				await blogService.deleteBlog(id)
				setBlogs(blogs.filter((blog) => blog.id !== id))
			}
		} catch (e) {
			console.log(e)
			setNotification({
				message: 'unable to delete blog',
				type: 'danger',
			})
		}
	}

	useEffect(() => {
		blogService.getAll().then(setBlogs)
	}, [])

	return (
		<div>
			<h2>blogs</h2>
			<p>
				{user.name} has logged in <button onClick={handleLogout}>logout</button>
			</p>
			<Togglable buttonLabel="show add blog" ref={addBlogRef}>
				<AddBlog
					setBlogs={setBlogs}
					setNotification={setNotification}
					toggleVisibility={() => addBlogRef.current()}
				/>
			</Togglable>
			{sortedBlogs?.map((blog) => (
				<Blog key={blog.id} blog={blog} handleDelete={handleDelete} />
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
