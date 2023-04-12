/* eslint-disable linebreak-style */
import { useState, forwardRef, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

const Blog = forwardRef((props, refs) => {
  const { blog , handleLike, user, handleDelete } = props
  Blog.displayName = 'Blog'

  const [visibility, setVisibility] = useState(false)
  const [deleteOption, setDeleteOption] = useState('none')
  const hideWhenVisible = { display: visibility ? 'none' : '' }
  const showWhenVisible = { display: visibility ? '' : 'none' }

  if(blog.user.username === user.username) {
    if(deleteOption === 'none') {
      setDeleteOption('')
    }
  }

  const toggleVisibility = () => {
    setVisibility(!visibility)
  }

  useImperativeHandle(refs, () => {
    return {
      toggleVisibility
    }
  })

  const like = async () => {
    await handleLike(blog)
  }

  const deleteBlog = async () => {
    if (window.confirm('Are you suer you want to delete this blog?')){
      await handleDelete(blog)
    }
  }


  return (
    <div key={blog.id} className="blogpost">
        Title: {blog.title}<br/>
        Author: {blog.author}<br/>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>Show More Info!</button>
      </div>
      <div style={showWhenVisible}>
          Likes: {blog.likes} <button onClick={like}><i className="fa fa-thumbs-o-up"></i></button><br/>
          URL: {blog.url}<br/>
          Posted by: {blog.user.username}<br/>
        <button style={{ display: deleteOption }} onClick={deleteBlog}>Delete?</button>
        <button onClick={toggleVisibility}>Hide</button>
      </div>
    </div>
  )
})

Blog.propTypes = {
  blog:  PropTypes.object.isRequired,
  handleLike: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  handleDelete: PropTypes.func.isRequired
}

export default Blog