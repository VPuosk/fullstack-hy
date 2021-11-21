const router = require('express').Router()
const { blogFinder } = require('../util/middleware')

const { Blog } = require('../models')

router.get('/', async (req, res) => {
  const blogs = await Blog.findAll()
  res.json(blogs)
})

router.post('/', async (req, res, next) => {
  const body = req.body
  try {
    const newBlog = Blog.build(body)
    const blog = await newBlog.save()
    res.json(blog)
  } catch (error) {
    next( error )
  }
})

router.get('/:id', blogFinder, async (req, res) => {
  if (req.blog) {
    res.json(req.blog)
  } else {
    res.status(404).end()
  }
})

router.delete('/:id', blogFinder, async (req, res) => {
  if (req.blog) {
    await req.blog.destroy()
  } 
  res.status(204).end()
})

router.put('/:id', blogFinder, async (req,res,next) => {
  try {
    if (req.blog) {
      req.blog.likes = req.body.likes
      await req.blog.save()
      res.json(req.blog)
    } else {
      res.status(404).end()
    }
  } catch (error) {
    next(error)
  }
})

module.exports = router