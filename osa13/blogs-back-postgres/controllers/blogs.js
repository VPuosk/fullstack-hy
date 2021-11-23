const router = require('express').Router()
const { Op } = require('sequelize')
const { blogFinder, tokenExtractor } = require('../util/middleware')

const { Blog, User } = require('../models')

router.get('/', async (req, res) => {
  const where = {}

  if (req.query.search) {
    console.log('search string: ', `${req.query.search}`)
    where.title = {
      [Op.iLike]: `%${req.query.search}%`
    }
  }

  const blogs = await Blog.findAll({
    attributes: { exclude: ['userId'] },
    include: {
      model: User,
      attributes: ['name']
    },
    where
  })
  res.json(blogs)
})

router.post('/', tokenExtractor, async (req, res, next) => {
  const body = req.body
  try {
    const user = await User.findByPk(req.decodedToken.id)
    const newBlog = Blog.build(body)
    newBlog.userId = user.id
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

router.delete('/:id', blogFinder, tokenExtractor, async (req, res) => {
  if (req.blog) {
    if (req.blog.userId === req.decodedToken.id) {
      await req.blog.destroy()
    } else {
      res.status(401).json({
        error: 'invalid user id trying to delete blog'
      })
    }
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