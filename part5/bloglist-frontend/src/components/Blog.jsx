import { useState } from 'react'

const blogStyle = {
	paddingTop: 10,
	paddingLeft: 2,
	border: 'solid',
	borderWidth: 1,
	marginBottom: 5,
}

const Blog = ({ blog }) => {
	const [showDetails, setShowDetails] = useState(false)

	const showWhenVisible = { display: showDetails ? '' : 'none' }
	const buttonLabel = showDetails ? 'hide' : 'show'

	return (
		<div style={blogStyle}>
			{blog.title} {blog.author}{' '}
			<button onClick={() => setShowDetails(!showDetails)}>
				{buttonLabel}
			</button>
			<div style={showWhenVisible}>
				<a href={blog.url}>{blog.url}</a>
				<div>
					likes {blog.likes} <button>like</button>
				</div>
				<div>{blog.user.name}</div>
			</div>
		</div>
	)
}

export default Blog
