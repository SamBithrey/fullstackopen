import axios from 'axios'

const getData = () => {
    const request = axios.get('http://localhost:3001/persons')
    return (
        request.then(res => res.data)
    )
}

const saveContact = newContact => {
   const request = axios.post('http://localhost:3001/persons', newContact)
   return (
        request.then(res => res.data)
   )
}

const removeContact = (url) => {
    return (axios.delete(url))
}

const updateContact = (url, change) => {
    return (axios.put(url, change))
}

export default { getData, saveContact, removeContact, updateContact }