const logger = require('./logger')
const jwt = require('jsonwebtoken')

const User = require('../models/Users')

const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method)
  logger.info('Path:  ', request.path)
  logger.info('Body:  ', request.body)
  logger.info('---')
  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else if (error.name ===  'JsonWebTokenError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    const token = authorization.replace('Bearer ', '')
    request.token = token
  } else {
    request.token = null
  }
  next()
}

const userExtractor = async (req, res, next) => {
  if (!req.token) {
    req.user = null
  } else {
    const decodedToken = jwt.verify(req.token, process.env.SECRET)
    if (!decodedToken.id) {
      requestLogger.user = null
    } else {
      req.user = await User.findById(decodedToken.id)
    }
  }
  next()
}


module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor
}