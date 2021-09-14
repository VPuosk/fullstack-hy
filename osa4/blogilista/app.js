const config = require('./utils/config')
require('dotenv').config()
const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const blogRouter = require('./controllers/blogs')
const userRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const middleware = require('./utils/middleware')
const mongoose = require('mongoose')
const logger = require('./utils/logger')

const mongoUrl = config.MONGODB_URI

logger.info('connecting to MONGODB')

mongoose.connect(mongoUrl, { useNewUrlParser: true })
  .then(() => {
    logger.info('connected')
  })
  .catch((error) => {
    logger.error('not connected', error.message)
  })

app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)
app.use(middleware.tokenExtractor)

app.use('/api/blogs', blogRouter)
app.use('/api/users', userRouter)
app.use('/api/login', loginRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app