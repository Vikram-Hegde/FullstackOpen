import { useState } from 'react'
import blogs from '../services/blogs'

const blogStyle = {
	paddingTop: 10,
	paddingLeft: 2,
	border: 'solid',
	borderWidth: 1,
	marginBottom: 5,
}

const Blog = (props) => {
	const [showDetails, setShowDetails] = useState(false)
	const [blog, setBlog] = useState(props.blog)

	const showWhenVisible = { display: showDetails ? '' : 'none' }
	const buttonLabel = showDetails ? 'hide' : 'show'

	const handleLike = async () => {
		const updatedBlog = await blogs.updateBlog(
			{
				...blog,
				likes: blog.likes + 1,
				user: blog.user.id,
			},
			blog.id
		)

		setBlog(updatedBlog)
	}

	return (
		<div style={blogStyle}>
			{blog.title} {blog.author}{' '}
			<button onClick={() => setShowDetails(!showDetails)}>
				{buttonLabel}
			</button>
			<div style={showWhenVisible}>
				<a href={blog.url}>{blog.url}</a>
				<div>
					likes {blog.likes} <button onClick={handleLike}>like</button>
				</div>
				<div>{blog.user?.name}</div>
			</div>
		</div>
	)
}

export default Blog
