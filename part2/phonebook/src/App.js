import { useState, useEffect } from 'react'
import Numbers from './Components/Numbers'
import Filter from './Components/Filter'
import NewPerson from './Components/NewPerson'
import axios from 'axios'

const App = () => {
  document.title = `Phonebook`;
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [showFilter, setShowFilter] = useState(false)

  const hook = () => {
    //console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(res => {
        //console.log('promise fulfilled')
        setPersons(res.data)
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
    const newID = (persons.length)+1
    const newPerson = {
      name: newName,
      number: newNumber,
      id: newID
    }
    if (persons.find(e => e.name === newPerson.name)) {
      return (
        setNewName(''),
        setNewNumber(''),
        alert(`Phonebook already contains ${newPerson.name}`)
      )
    }
    setPersons(persons.concat(newPerson))
    setNewName('')   
    setNewNumber('')  
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
        <Numbers people={people}/>
    </div>
  )
}



export default App