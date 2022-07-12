const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()

const User = require('../models/user')
const validatePassword = require('../utils/validatePassword')

usersRouter.get('/', async (request, response) => {
  console.log(request.body)
  const users = await User.find({}).populate('blogs', {
    title: 1,
    author: 1,
    url: 1,
    id: 1,
  })
  response.json(users)
})

usersRouter.post('/', async (request, response, next) => {
  const body = request.body
  console.log(body)
  if (!validatePassword(body.password))
    return next({
      name: 'PasswordValidationError',
      message: 'Invalid or Missing Password',
    })

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash: passwordHash,
  })

  const savedUser = await user.save()

  response.status(201).json(savedUser) // Created
})
usersRouter.get('/:id', async (request, response) => {
  console.log(request.body)
  const users = await User.findById(request.params.id).populate('blogs', {
    title: 1,
    author: 1,
    url: 1,
    id: 1,
  })
  response.json(users)
})
module.exports = usersRouter
