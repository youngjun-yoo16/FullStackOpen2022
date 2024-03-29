const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    if (blogs.length === 0) return 0

    const likes = blogs.map(blog => blog.likes)
    const total = likes.reduce((sum, number) => sum + number, 0)

    return total
}

const favoriteBlog = (blogs) => {
    if (blogs.length === 0) return undefined
    else if (blogs.length === 1) {
        return { title: blogs[0].title, author: blogs[0].author, likes: blogs[0].likes }
    } else {
        const favorite = blogs.reduce(
            (prev, current) => (prev.likes > current.likes ? prev : current),
            0
        )
        return { title: favorite.title, author: favorite.author, likes: favorite.likes }
    }
}

const mostFrequent = (hashmap) => Object.keys(hashmap).reduce((a, b) => hashmap[a] > hashmap[b] ? a : b)

const mostBlogs = (blogs) => {
	if (blogs.length === 0) return undefined
	else if (blogs.length === 1) {
		return { author: blogs[0].author, blogs: 1 }
    } else {
		const hashmap = blogs.reduce(
			(map, blog) => {
				map[blog.author] = (map[blog.author] || 0) + 1
				return map
			}, {}
		)
		const authorWithMostBlogs = mostFrequent(hashmap)
		return { author: authorWithMostBlogs, blogs: hashmap[authorWithMostBlogs] }
	}
}

const mostLikes = (blogs) => {
	if (blogs.length === 0) return undefined
	else if (blogs.length === 1) {
		return { author: blogs[0].author, likes: blogs[0].likes }
	} else {
		const hashmap = blogs.reduce(
			(map, blog) => {
				map[blog.author] = (map[blog.author] || 0) + blog.likes
				return map
			}, {}
		)
		const authorWithMostLikes = mostFrequent(hashmap)
		return { author: authorWithMostLikes, likes: hashmap[authorWithMostLikes] }
	}
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
	mostBlogs,
	mostLikes,
};