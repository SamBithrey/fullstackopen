import { useState } from 'react'
import Numbers from './Components/Numbers'
import Filter from './Components/Filter'
import NewPerson from './Components/NewPerson'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [showFilter, setShowFilter] = useState(false)
  
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