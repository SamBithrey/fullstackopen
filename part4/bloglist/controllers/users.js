const bcrypt = require('bcryptjs')
const usersRouter = require('express').Router()
const User = require('../models/Users')

usersRouter.post('/', async (req, res) => {
  const { username, name, password } = req.body

  if(password.length < 3){
    console.log('User validation failed: Password too short')
    return res
      .status(400)
      .send({ error: 'User validation failed: Password too short' })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash,
  })

  const savedUser = await user.save()

  res.status(201).json(savedUser)
})

usersRouter.get('/', async (req, res) => {
  const users = await User.find({}).populate('blogs', { title: 1, author: 1 })
  res.json(users)
})

module.exports = usersRouter