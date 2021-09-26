const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const { userExtractor } = require('../utils/middleware')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({})
    .populate('user', { username: 1, name: 1 })
  //response.json(blogs) <-- miksi tuokin toimii?
  response.json(blogs.map(blog => blog.toJSON()))
})

blogRouter.post('/', userExtractor, async (request, response) => {
  const body = request.body
  const user = request.user

  if (request.token === null) {
    return response.status(401).json({ error: 'trying to add blog without authorization (token)' })
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    user: user._id,
    likes: body.likes === undefined ? 0 : body.likes,
    comments: []
  })

  if ((blog.title) && (blog.url)) {
    const newBlog = await blog.save()
    user.blogs = user.blogs.concat(newBlog._id)
    await user.save()
    response.status(201).json(newBlog.toJSON())
  } else {
    response.status(400).end()
  }
})

blogRouter.delete('/:id', userExtractor, async (request, response) => {
  // token fetch
  const user = request.user
  const blog = await Blog.findById(request.params.id)

  if (blog === null) {
    return response.status(400).json({ error: 'unknown blog entry' })
  }

  if (blog.user.toString() === user._id.toString()) {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } else {
    return response.status(401).json({ error: 'trying to remove blog by another user' })
  }
})

blogRouter.put('/:id', userExtractor, async (request, response) => {
  //const user = request.user
  const oldBlog = await Blog.findById(request.params.id)

  if (oldBlog === null) {
    return response.status(400).json({ error: 'unknown blog entry' })
  }

  /*
  if (oldBlog.user.toString() !== user._id.toString()) {
    return response.status(401).json({ error: 'trying to edit blog by another user' })
  }
  */

  /*
  const blog = {
    title: request.body.title,
    author: request.body.author,
    user: oldBlog.user,
    url: request.body.url,
    likes: request.body.likes === undefined ? 0 : request.body.likes
  }
  */
  const blog = request.body

  if ((blog.title) && (blog.url)) {
    const result = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    response.status(200).json(result.toJSON())
  } else {
    response.status(400).end()
  }
})

blogRouter.post('/:id/comments', userExtractor, async (request, response) => {
  //const blog = await Blog.findById(request.params.id)
  //const comments = blog.comments
  const comment = request.body.comment
  const blog = request.body.blog

  const newComments = [...blog.comments, comment]
  const newBlog = { ...blog, comments: newComments }

  const result = await Blog.findByIdAndUpdate(request.params.id, newBlog, { new: true })
  response.status(200).json(result.toJSON())
})

module.exports = blogRouter