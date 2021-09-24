const Blog = require('../models/blog')
const User = require('../models/user')

const defaultUsers = [
  {
    username: 'root 3',
    name: 'Superuser 3',
    password: 'salainen',
  },
  {
    username: 'root 2',
    name: 'Superuser 2',
    password: 'salainen',
  }
]

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

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

module.exports = {
  defaultBlogs,
  defaultUsers,
  blogsInDB,
  usersInDb
}