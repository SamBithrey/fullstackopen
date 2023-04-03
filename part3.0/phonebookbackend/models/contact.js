const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI
console.log('Connecting to MongoDB')

mongoose
  .connect(url)
  .then(res => {
    console.log('Connection Successful')
  })
  .catch(err => {
    console.log('Error during connection: ', err.message)
  })

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    minLength: 3,
  },
  number: {
    type: String,
    required: true,
    validate: {
      validator: function(v) {
        return /^\d{3}-\d{5}|^\d{2}-\d{6}/.test(v)
      },
      message: props => `${props.value} is not a valid phone number!`
    }
  }
})

contactSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject.__v
    delete returnedObject._id
  }
})

module.exports = mongoose.model('Contact', contactSchema)