const router = require('express').Router()
const { Op } = require('sequelize')
const { userFinder, userFinderID } = require('../util/middleware')

const { User, Blog, UserBlog } = require('../models')

router.get('/', async (req, res) => {
  const users = await User.findAll({
    include: {
      model: Blog
    }
  })
  res.json(users)
})

router.post('/', async (req, res, next) => {
  const body = req.body
  try {
    const newUser = User.build(body)
    const user = await newUser.save()
    res.json(user)
  } catch (error) {
    next( error )
  }
})

router.get('/:id', async (req, res) => {
  // where section...
  let where = {}

  if (req.query.read) {
    const read = req.query.read
    let search = {}
    if (read === 'true') {
      search = {
        read: {
              [Op.is]: true
        }
      } 
    } else if (read === 'false') {
      search = {
        read: {
              [Op.is]: false
        }
      }
    }

    where = {...where, ...search}
  }

  // done section
  const user = await User.findByPk(req.params.id, {
    include:[
      {
        model: Blog,
        attributes: { exclude: ['userId'] }
      },
      {
        model: Blog,
        as: 'readingList',
        attributes: { exclude: ['userId']},
        through: {
          attributes: []
        },
        include: {
          model: UserBlog,
          attributes: [
            'id',
            'read'
          ],
          where,
        }
      }
    ] 
  })

  if (user) {
    res.json(user)
  } else {
    res.status(404).end()
  }
})

router.put('/:username', userFinder, async (req,res,next) => {
  try {
    if (req.user) {
      req.user.name = req.body.name
      await req.user.save()
      res.json(req.user)
    } else {
      res.status(404).end()
    }
  } catch (error) {
    next(error)
  }
})

module.exports = router