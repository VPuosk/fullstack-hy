const dummy = (blogs) => {
  // ...
  const nBlogs = blogs.length
  return 1 + nBlogs - nBlogs
}

const totalLikes = (blogs) => {
  if (blogs.length === 0) {
    return 0
  }

  const likes = blogs.map(blog => blog.likes)

  const reducer = (sum, item) => {
    return sum + item
  }
  return likes.reduce(reducer, 0)
}

module.exports = {
  dummy,
  totalLikes
}