const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/Blogs')
const User = require('../models/Users')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1 })
  response.json(blogs)
})

blogsRouter.get('/:id', async (req, response) => {
  const id = req.params.id
  const blog = await Blog.findById(id)
  if (blog) {
    response.json(blog)
  } else {
    response.status(404).end()
  }
})

blogsRouter.post('/', async (req, res) => {
  const body = req.body
  if(!req.token) {
    return res.status(401).json({ error: 'token invalid' })
  }
  const decodedToken = jwt.verify(req.token, process.env.SECRET)
  if (!decodedToken.id) {
    return res.status(401).json({ error: 'token invalid' })
  }
  const user = req.user
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user.id
  })
  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  res.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (req, res) => {
  const id = req.params.id
  const decodedToken = jwt.verify(req.token, process.env.SECRET)
  if (!decodedToken.id) {
    return res.status(401).json({ error: 'token invalid' })
  }
  const blogToBeDeleted = await Blog.findById(id)
  if(!blogToBeDeleted) {
    return res
      .status(204)
      .end()
  }
  if (blogToBeDeleted.user.toString() === decodedToken.id) {
    await Blog.findByIdAndRemove(id)
    res.status(204).end()
  } else {
    return res.status(401).end({ error: 'This is not your blog post to delete' })
  }
})

blogsRouter.put('/:id', async (req, res) => {
  const blog = {
    title: req.body.title,
    author: req.body.author,
    url: req.body.url,
    likes: req.body.likes || 0
  }
  const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, blog, { new: true })
  res.json(updatedBlog.toJSON())
})

module.exports = blogsRouter