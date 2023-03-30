import axios from 'axios'
const baseURL = '/api/persons'

const getData = () => {
    const request = axios.get(baseURL)
    return (
        request.then(res => res.data)
    )
}

const saveContact = newContact => {
   const request = axios.post(baseURL, newContact)
   return (
        request.then(res => res.data)
   )
}

const removeContact = (id) => {
    return (axios.delete(`${baseURL}/${id}`))
}

const updateContact = (id, change) => {
    return (axios.put(`${baseURL}/${id}`, change))
}

export default { getData, saveContact, removeContact, updateContact }