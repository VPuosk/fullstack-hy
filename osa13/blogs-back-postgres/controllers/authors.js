const router = require('express').Router()
const { Op } = require('sequelize')
const { fn : sequelizeFn, col : sequelizeCol} = require('sequelize')

const { Blog } = require('../models')

router.get('/', async (req, res) => {

  const blogs = await Blog.findAll({
    attributes: [
      'author',
      [sequelizeFn('COUNT', sequelizeCol('title')), 'articles'],
      [sequelizeFn('SUM', sequelizeCol('likes')), 'likes'],
    ],
    order: [
      [sequelizeFn('SUM', sequelizeCol('likes')), 'DESC']
    ],
    group: [
      ['author']
    ]
  })
  res.json(blogs)
})

module.exports = router