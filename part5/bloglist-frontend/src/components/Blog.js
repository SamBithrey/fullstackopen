/* eslint-disable linebreak-style */
import { useState, forwardRef, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

const Blog = forwardRef((props, refs) => {
  const { blog , handleLike, user, handleDelete } = props
  Blog.displayName = 'Blog'

  const [visibility, setVisibility] = useState(false)

  const deleteButton = () => {
    if (blog.user.username === user.username) {
      return (
        <button onClick={deleteBlog}>Delete?</button>
      )
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

  if (!visibility) {
    return (
      <div key={blog.id} className="blogpost">
        <p className='blog-title'>Title: {blog.title}</p>
        <p className='blog-author'>Author: {blog.author}</p>
        <button onClick={toggleVisibility} className='show-more'>Show More Info!</button>
      </div>
    )
  }

  return (
    <div key={blog.id} className="blogpost">
      <p className='blog-title'>Title: {blog.title}</p>
      <p className='blog-author'>Author: {blog.author}</p>
      <p className='blog-likes'>Likes: {blog.likes}<button onClick={like} className='likeButton'><i className="fa fa-thumbs-o-up"></i></button></p>
      <p className='blog-url'>URL: {blog.url}</p>
      <p className='blog-poster'>Posted by: {blog.user.username}</p>
      <div>{deleteButton()}</div>
      <button onClick={toggleVisibility} className='hide'>Hide</button>
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