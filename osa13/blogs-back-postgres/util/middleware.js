const { Blog } = require('../models')

const blogFinder = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id)
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
  errorHandler,
}