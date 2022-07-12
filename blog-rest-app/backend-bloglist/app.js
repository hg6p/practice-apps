const cors = require('cors')
const express = require('express')
require('express-async-errors')
const mongoose = require('mongoose')

const blogsRouter = require('./controllers/blogs')
const loginRouter = require('./controllers/login')
const usersRouter = require('./controllers/users')
const config = require('./utils/config')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')

const app = express()
// added this so users can await the creation of the connection (good for tests).
app.connectToDatabase = async () => {
  try {
    await mongoose.connect(config.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    logger.info('connected to MongoDB')
  } catch (error) {
    logger.error('error connecting to MongoDB:', error.message)
  }
}

app.use(cors())
app.use(express.json())

app.use('/api/blogs', blogsRouter)
app.use('/api/login', loginRouter)
app.use('/api/users', usersRouter)
console.log('blogs.oruter', blogsRouter)
app.use(middleware.userExtractor)
app.use(middleware.errorHandler)

module.exports = app
