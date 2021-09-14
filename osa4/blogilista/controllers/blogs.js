const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({})
    .populate('user', { username: 1, name: 1 })
  //response.json(blogs) <-- miksi tuokin toimii?
  response.json(blogs.map(blog => blog.toJSON()))
})

blogRouter.post('/', async (request, response) => {
  const dummyUsers = await User.find({})
  const dummyUser = dummyUsers[0]
  //console.log(dummyUser[0])
  const blog = new Blog({
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    user: dummyUser._id,
    likes: request.body.likes === undefined ? 0 : request.body.likes
  })

  if ((blog.title) && (blog.url)) {
    const newBlog = await blog.save()
    dummyUser.blogs = dummyUser.blogs.concat(newBlog._id)
    await dummyUser.save()
    response.status(201).json(newBlog.toJSON())
  } else {
    response.status(400).end()
  }
})

blogRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

blogRouter.put('/:id', async (request, response) => {
  const blog = {
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes === undefined ? 0 : request.body.likes
  }
  if ((blog.title) && (blog.url)) {
    const result = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    response.status(200).json(result.toJSON())
  } else {
    response.status(400).end()
  }
})

module.exports = blogRouter