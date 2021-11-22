const jwt = require('jsonwebtoken')
const router = require('express').Router()
const { SECRET } = require('../util/config')
const User = require('../models/User')

router.post('/', async (req, res) => {
  const user = await User.findOne({
    where: {
      username: req.body.username
    }
  })

  const passWordOK = req.body.password === 'salaatti'

  if (!user ) {
    return res.status(401).json({
      error: 'Invalid username'
    })
  } else if (!passWordOK) {
    return res.status(401).json({
      error: 'Invalid password'
    })
  }

  const userForToken = {
    username: user.username,
    id: user.id,
  }

  const token = jwt.sign(userForToken, SECRET)

  res.status(200).send({
    token,
    username: user.username,
    name: user.name
  })
})

module.exports = router