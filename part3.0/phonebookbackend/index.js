require('dotenv').config()
const express = require('express')
const app = express()
const Contact = require('./models/contact')
const morgan = require('morgan')
const cors = require('cors')

app.use(express.json())
app.use(express.static('build'))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
app.use(cors())

morgan.token('body', (req) =>
  req.method === 'POST' && req.body.name
    ? JSON.stringify(req.body)
    : null
)

// let persons = [
//     {
//       "id": 1,
//       "name": "Arto Hellas",
//       "number": "040-123456"
//     },
//     {
//       "id": 2,
//       "name": "Ada Lovelace",
//       "number": "39-44-5323523"
//     },
//     {
//       "id": 3,
//       "name": "Dan Abramov",
//       "number": "12-43-234345"
//     },
//     {
//       "id": 4,
//       "name": "Mary Poppendieck",
//       "number": "39-23-6423122"
//     }
// ]

app.get('/api/persons', (req, res) => {
  Contact.find({}).then(contacts => {
    res.json(contacts)
  })
})

app.get('/info', (req, res) => {
  const date = new Date()
  Contact.find({})
    .then(contacts => {
      res.send(`
        <div>
            <h1>Phonebook has info for ${contacts.length} people</h1>
            <h1>${date}</h1>
        </div>
    `)
    })
})

app.get('/api/persons/:id', (req, res, next) => {
  Contact.findById(req.params.id)
    .then(contact => {
      if(contact) {res.json(contact)}
      else {res.status(404).end()}
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (req, res, next) => {
  const id = req.params.id
  Contact
    .findByIdAndDelete(id)
    .then(() => res.status(204).end())
    .catch(error => next(error))
})

// const generateId = () => {
//     return Math.floor(Math.random() * 10000)
// }

app.post('/api/persons', (req, res, next) => {
  const body = req.body
  if(!body.name || !body.number) {
    return res.status(400).json({
      error: 'content missing'
    })
  }
  const contact = new Contact({
    name: body.name,
    number: body.number,
  })

  contact
    .save()
    .then(savedContact => {
      res.json(savedContact)
    })
    .catch(error => next(error))
})

app.put('/api/persons/:id', (req, res, next) => {
  const id = req.params.id
  const contact = {
    name: req.body.name,
    number: req.body.number
  }

  Contact
    .findByIdAndUpdate(id, contact, { new: true, runValidators: true })
    .then(updatedPerson => res.json(updatedPerson))
    .catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)

const errorHandler = (error, req, res, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message })
  }
  next(error)
}
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})