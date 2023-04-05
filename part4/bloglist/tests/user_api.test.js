const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper.js')
const app = require('../app')
const api = supertest(app)
const bcrypt = require('bcryptjs')

const User = require('../models/Users')

beforeEach(async () => {
  await User.deleteMany({})

  for (let user of helper.initialUsers) {
    const passwordHash = await bcrypt.hash(user.password, 10)
    const newUser = new User({ username: user.username, name: user.name, passwordHash })
    await newUser.save()
  }
})

describe('HTTP POST Requests', () => {
  test('request to the /api/users URL successfully creates a new user', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = ({
      username: 'Biffers',
      name: 'Sam Bithrey',
      password: 'Secret'
    })
    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length+1)
    const users = usersAtEnd.map(user => user.username)
    expect(users).toContain(newUser.username)
  })
  test('if the password is too short, response status code 400 Bad Request', async () => {
    const newUser = ({
      username: 'Biffers',
      name: 'Sam Bithrey',
      password: 'aa'
    })
    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(helper.initialUsers.length)
  })
  test('if the username is already taken, response status code 400 Bad Request', async () => {
    const newUser = ({
      username: 'root',
      name: 'Sam Bithrey',
      password: 'Secret'
    })
    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(helper.initialUsers.length)
  })
})

describe('HTTP GET Requests', () => {
  test('All users are returned', async () => {
    const users = await api.get('/api/users')
    expect(users.body).toHaveLength(helper.initialUsers.length)
  })
  test('Returned format is JSON', async () => {
    await api.get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})
