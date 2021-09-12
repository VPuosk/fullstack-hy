const Blog = require('../models/blog')

const defaultBlogs = [
  {
    title: 'Tarinoita A:sta',
    author: 'Esa',
    url: 'http://www.google.com',
    likes: 5
  },
  {
    title: 'Tarinoita B:stä',
    author: 'Pekka',
    url: '127.0.0.1',
    likes: 10
  },
  {
    title: 'Tarinoita C:stä',
    author: 'Esa',
    url: '0.0.0.0',
    likes: 1
  },
  {
    title: 'Tarinoita D:stä',
    author: 'Arto',
    url: 'dev/null',
    likes: 0
  },
]

const blogsInDB = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  defaultBlogs,
  blogsInDB,
}