const router = require('express').Router()
const { userFinder } = require('../util/middleware')

const { User, Blog } = require('../models')

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