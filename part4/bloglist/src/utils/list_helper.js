export const dummy = () => 1

export const totalLikes = (blogs) =>
	blogs.reduce((acc, blog) => acc + blog.likes, 0)

export const favoriteBlog = (blogs) => {
	const { title, author, likes } = blogs.reduce(
		(fav, blog) => (blog.likes > fav.likes ? blog : fav),
		{ likes: 0 }
	)
	return {
		title,
		author,
		likes,
	}
}

export const mostBlogs = (blogs) => {
	const blogCounts = blogs.reduce((counts, { author }) => {
		counts[author] = (counts[author] || 0) + 1
		return counts
	}, {})

	let topAuthor = ''
	let maxBlogs = 0

	for (const [author, count] of Object.entries(blogCounts)) {
		if (count > maxBlogs) {
			topAuthor = author
			maxBlogs = count
		}
	}

	return { author: topAuthor, blogs: maxBlogs }
}

export const mostLikes = (blogs) => {
	const mostLiked = blogs.reduce((likesAcc, { author, likes }) => {
		likesAcc[author] = (likesAcc[author] || 0) + likes
		return likesAcc
	}, {})

	let topAuthor = ''
	let maxLikes = 0

	for (let [author, likes] of Object.entries(mostLiked))
		if (likes > maxLikes) {
			topAuthor = author
			maxLikes = likes
		}

	return { author: topAuthor, likes: maxLikes }
}
