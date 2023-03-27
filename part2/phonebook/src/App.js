import { useState, useEffect } from 'react'
import Numbers from './Components/Numbers'
import Filter from './Components/Filter'
import NewPerson from './Components/NewPerson'
import operations from './Services/services'

const App = () => {
  document.title = `Phonebook`;
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [showFilter, setShowFilter] = useState(false)

  const hook = () => {
    //console.log('effect')
    operations
      .getData()
      .then(data => {
        //console.log('promise fulfilled')
        setPersons(data)
      })
  }

  useEffect(hook, [])

  const setToPersons = (event) => {
    event.preventDefault()
    if (newNumber === '') {
      return (
        alert('Please add telephone number')
      )
    }
    const newPerson = {
      name: newName,
      number: newNumber,
    }
    if (persons.find(e => e.name === newPerson.name)) {
      if (window.confirm(`${newPerson.name} is already in the phonebook. Would you like to update their number?`)){
        const contact = persons.find(e => e.name === newPerson.name)
        const url = `http://localhost:3001/persons/${contact.id}`
        const changedContact = { ...contact, number: newNumber }
        operations
          .updateContact(url, changedContact)
          .then(res => {
            setPersons(persons.map(e => e.id !== contact.id ? e : res.data))
          })
          setNewName('')
        return(
          setNewNumber(''))
      } else {
        setNewName('')
        return(
          setNewNumber(''))
      }
      
    }
    operations
      .saveContact(newPerson)
      .then(savedContact => {
        setPersons(persons.concat(savedContact))
        setNewName('')   
        setNewNumber('')  
      })
  }

  const setToShowFilter = (event) => {
    event.preventDefault()
    setShowFilter(true)
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const handleFilterChange = (event) => {
    setShowFilter(false)
    setNewFilter(event.target.value)
  }
  const deleteContact = (id) => {
    const url = `http://localhost:3001/persons/${id}`
    if(window.confirm('Are you sure you want to delete this contact?')){ 
      operations
        .removeContact(url)
        .then(res => hook())     
    }
  }

  const people = showFilter
    ? persons.filter(person => person.name.includes(newFilter))
    : persons;

  return (
    <div>
      <h2>Phonebook</h2>
      <h3>Search Bar</h3>
        <Filter submit={setToShowFilter} filterName={newFilter} filterChange={handleFilterChange}/>
      <h3>New Person</h3>
        <NewPerson submit={setToPersons} name={newName} number={newNumber} nameChange={handleNameChange} numberChange={handleNumberChange}/>
      <h3>Numbers</h3>
        <Numbers people={people} deleteContact={deleteContact}/>
    </div>
  )
}



export default App