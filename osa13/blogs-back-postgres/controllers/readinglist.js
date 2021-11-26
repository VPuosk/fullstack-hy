const router = require('express').Router()

const { UserBlog } = require('../models')
const { tokenExtractor } = require('../util/middleware')

router.post('/', async (req, res, next) => {
  const body = req.body
  try {
    const newEntry = UserBlog.build(body)
    const readinglist = await newEntry.save()
    res.json(readinglist)
  } catch (error) {
    next( error )
  }
})

router.put('/:id', tokenExtractor, async (req,res,next) => {
  const userID = req.decodedToken.id
  const userBlog = await UserBlog.findByPk(req.params.id)

  //safety check...
  if (!userBlog || !userID) {
    res.status(404).end()
    return
  }

  // only own entries can be altered
  if (userBlog.userId !== userID) {
    res.status(404).end()
    return
  }

  try {
    userBlog.read = req.body.read
    await userBlog.save()
    res.json(userBlog)
  } catch (error) {
    next(error)
  }
})

module.exports = router