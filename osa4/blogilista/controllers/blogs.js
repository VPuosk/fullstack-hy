const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  //response.json(blogs) <-- miksi tuokin toimii?
  response.json(blogs.map(blog => blog.toJSON()))
})

blogRouter.post('/', async (request, response) => {
  const blog = new Blog({
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes === undefined ? 0 : request.body.likes
  })

  if ((blog.title) && (blog.url)) {
    const newBlog = await blog.save()
    response.status(201).json(newBlog.toJSON())
  } else {
    response.status(400).end()
  }
})

module.exports = blogRouter