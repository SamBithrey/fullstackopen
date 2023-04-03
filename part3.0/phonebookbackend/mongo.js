const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

const url = `mongodb+srv://sambithrey:${password}@fullstackopenphonebookd.radfjzm.mongodb.net/Phonebook?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  number: String
})

const Contact = mongoose.model('Contact', contactSchema)

if (process.argv.length<4) {
  return (
    Contact.find({})
      .then(res => {
        console.log('Phonebook:')
        res.forEach(contact => {
          console.log(`${contact.name} ${contact.number}`)
        })
        mongoose.connection.close()
      })
  )
}

const contact = new Contact({
  name: name,
  number: number,
})

contact.save().then(result => {
  console.log(`added ${name} number ${number} to phonebook`)
  mongoose.connection.close()
})