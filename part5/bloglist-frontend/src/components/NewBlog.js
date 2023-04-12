import { useState } from 'react'
import PropTypes from 'prop-types'

const NewBlog = ( { createNewBlog } ) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newURL, setNewURL] = useState('')

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value)
  }

  const handleURLChange = (event) => {
    setNewURL(event.target.value)
  }

  const addNewBlog = async (event) => {
    event.preventDefault()
    await createNewBlog({
      title: newTitle,
      author: newAuthor,
      url: newURL
    })
    setNewTitle('')
    setNewAuthor('')
    setNewURL('')
  }

  return (
    <form onSubmit={addNewBlog}>
      <div>
          Title: <input value={newTitle} onChange={handleTitleChange}/>
      </div>
      <div>
          Author: <input value={newAuthor} onChange={handleAuthorChange}/>
      </div>
      <div>
          Url: <input value={newURL} onChange={handleURLChange}/>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

NewBlog.propTypes = {
  createNewBlog: PropTypes.func.isRequired
}

export default NewBlog