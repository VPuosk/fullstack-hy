const bcrypt = require('bcrypt')
const userRouter = require('express').Router()
const User = require('../models/user')

userRouter.post('/', async (request, response) => {
  const body = request.body
  // salasanan validointi...
  if (body.password.length < 3) {
    return response.status(400).json({ error: 'password is too short' })
  }
  // koodi jatkuu
  const saltRnds = 10
  const passwdHash = await bcrypt.hash(body.password, saltRnds)
  const user = new User({
    username: body.username,
    name: body.name,
    blogs: [],
    passwordHash: passwdHash
  })
  const newUser = await user.save()
  response.status(201).json(newUser.toJSON())
})

userRouter.get('/', async (request, response) => {
  const users = await User
    .find({})
    .populate('blogs', { title: 1, url: 1,  likes: 1, author: 1 })
  response.json(users.map(user => user.toJSON()))
})

module.exports = userRouter