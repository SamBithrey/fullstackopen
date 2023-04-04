const blogsRouter = require('express').Router()
const Blog = require('../models/Blogs')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.post('/', async (req, res) => {
  const blog = await new Blog(req.body)

  const savedBlog = await blog.save()
  res.status(201).json(savedBlog)
})

module.exports = blogsRouter