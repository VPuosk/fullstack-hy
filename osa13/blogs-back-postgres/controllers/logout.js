const router = require('express').Router()
const { tokenExtractor } = require('../util/middleware')
const User = require('../models/User')

router.post('/', tokenExtractor, async (req, res) => {
  const user = await User.findByPk(req.decodedToken.id)

  if (user.logged) {
    user.logged = false
    await user.save()
    return res.status(200).send(`${user.username} logged out`)
  }
})

module.exports = router