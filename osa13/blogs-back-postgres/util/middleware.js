const { Blog, User } = require('../models')
const jwt = require('jsonwebtoken')
const { SECRET } = require('../util/config')

const blogFinder = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id)
  next()
}

const userFinder = async (req, res, next) => {
  req.user = await User.findOne({ where: {username: req.params.username}})
  next()
}

const userFinderID = async (req, res, next) => {
  req.user = await User.findByPk(req.params.id)
  next()
}

const tokenExtractor = async (req, res, next) => {
  const vahvistus = req.get('authorization')
  if (vahvistus && vahvistus.toLowerCase().startsWith('bearer ')) {
    try {
      req.decodedToken = jwt.verify(vahvistus.substring(7), SECRET)
    } catch (error) { 
      return res.status(401).json({
        error: 'invalid token'
      })
    }
  } else {
    return res.status(401).json({
      error: 'missing token'
    })
  }
  next()
}

const errorHandler = (error, req, res, next) => {
  //console.log(error.message)

  switch (error.name) {
    case 'SequelizeValidationError':
      return res.status(400).send({ error: error.message })
    case 'SequelizeDatabaseError':
      return res.status(400).send({ error: error.message })
    default:
      break;
  }

  next(error)
}

module.exports = {
  blogFinder,
  userFinder,
  userFinderID,
  errorHandler,
  tokenExtractor,
}