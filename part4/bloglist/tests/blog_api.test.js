const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper.js')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/Blogs')

beforeEach(async () => {
  await Blog.deleteMany({})

  for (let blog of helper.initialBlogs) {
    let blogObject = new Blog(blog)
    await blogObject.save()
  }
})

describe('HTTP GET Requests', () => {
  test('all blogs are returned', async () => {
    const res = await api.get('/api/blogs')
    expect(res.body).toHaveLength(helper.initialBlogs.length)
  })
  test('Returned format is JSON', async () => {
    await api.get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
  test('unique identifier property of the blog posts is named id', async () => {
    const res = await api.get('/api/blogs')
    expect(res.body[0].id).toBeDefined()
  })
  test('viewing a specific blog succeeds with valid id', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToView = blogsAtStart[0]

    const res = await api
      .get(`/api/blogs/${blogToView.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(res.body).toEqual(blogToView)
  })
  test('viewing a specific blog fails with non-existent note err code 404', async () => {
    const validNonexistingId = await helper.nonExistingId()

    await api
      .get(`/api/blogs/${validNonexistingId}`)
      .expect(404)
  })
  test('viewing a specific blog fails with invalid id err code 400', async () => {
    const invalidId = 'elephant'

    await api
      .get(`/api/blogs/${invalidId}`)
      .expect(400)
  })
})

describe('HTTP POST Requests', () => {
  test('request to the /api/blogs URL successfully creates a new blog post', async () => {
    const newBlog = ({
      title: 'New POST request',
      author: 'Sam Bithrey',
      url: 'www.google.com',
      likes: 0
    })
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const res = await helper.blogsInDb()
    expect(res).toHaveLength(helper.initialBlogs.length + 1)
    const content = res.map(e => e.title)
    expect(content).toContain('New POST request')
  })
  test('if the likes property is missing from the request, it will default to the value 0', async () => {
    const newBlog = ({
      title: 'New POST request',
      author: 'Sam Bithrey',
      url: 'www.google.com',
    })
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const res = await helper.blogsInDb()
    const lastBlog = res[(helper.initialBlogs.length)]
    expect(lastBlog.likes).toBeDefined()
    expect(lastBlog.likes).toEqual(0)
  })
  test('if the title is missing from the request, response status code 400 Bad Request', async () => {
    const newBlog = ({
      author: 'Sam Bithrey',
      url: 'www.google.com',
      likes: 0
    })
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)

    const res = await helper.blogsInDb()
    expect(res).toHaveLength(helper.initialBlogs.length)
  })
  test('if the url is missing from the request, response status code 400 Bad Request', async () => {
    const newBlog = ({
      title: 'New POST request',
      author: 'Sam Bithrey',
      likes: 0
    })
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)

    const res = await helper.blogsInDb()
    expect(res).toHaveLength(helper.initialBlogs.length)
  })
})

describe('HTTP DELETE Requests', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToBeDeleted = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToBeDeleted.id}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length-1)
  })
  test('deleting Non-Existent Blog suceeds with status code 204', async () => {
    const validNonexistingId = await helper.nonExistingId()

    await api
      .delete(`/api/blogs/${validNonexistingId}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })
})
describe('HTTP PUT Requests', () => {
  test('updating succeeds, responding with the new blog information', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToBeUpdated = blogsAtStart[0]
    blogToBeUpdated.likes = 12345
    blogToBeUpdated.author = 'Sam Bithrey'

    await api
      .put(`/api/blogs/${blogToBeUpdated.id}`)
      .send(blogToBeUpdated)
      .expect(200)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
    const likes = blogsAtEnd.map(b => b.likes)
    expect(likes).toContain(12345)
    const authors = blogsAtEnd.map(b => b.author)
    expect(authors).toContain('Sam Bithrey')
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})