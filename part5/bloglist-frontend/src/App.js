/* eslint-disable linebreak-style */
/* eslint-disable react/no-unescaped-entities */
import { useState, useEffect, useRef } from 'react'
import Login from './components/Login'
import Blog from './components/Blog'
import NewBlog from './components/NewBlog'
import Notification from './components/notification'
import NewBlogToggle from './components/NewBlogToggle'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [notification, setNotification] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const hook = () => {
    blogService.getAll().then(blogs => {
      setAndSortBlogs(blogs)
    })
  }

  useEffect(hook, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBloglistUser', JSON.stringify(user)
      )
      setUser(user)
      blogService.setToken(user.token)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setNotification('Wrong credentials')
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    setUser(null)
    blogService.setToken(null)
    window.localStorage.clear()
  }

  const setAndSortBlogs = (bloglist) => {
    bloglist.sort((a, b) => b.likes - a.likes)
    setBlogs(bloglist)
  }

  const createNewBlog = async (blogObject) => {
    try {
      await blogService.create(blogObject)
      blogObject = {
        title: blogObject.title,
        author: blogObject.author,
        url: blogObject.url,
        user: {
          username: user.username
        }
      }
      setAndSortBlogs(blogs.concat(blogObject))
      blogFormRef.current.toggleVisibility()
      setNotification('New Blog Added!')
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    } catch (exception) {
      setNotification('Please input all information')
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  }

  const likeBlog = async (blogObject) => {
    const likedBlog = await blogService.like(blogObject)
    setAndSortBlogs(
      blogs.map(blog =>
        blog.id === likedBlog.id
          ? { ...blog, likes: likedBlog.likes }
          : blog
      )
    )
  }

  const deleteBlog = async (blogObject) => {
    await blogService.deleteBlog(blogObject)
    hook()
    setNotification('Blog deleted!')
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  const blogRef = useRef()
  const blogFormRef = useRef()

  if ( user === null ) {
    return (
      <div className="loginbox">
        <Login handleLogin={handleLogin} username={username} password={password} setUsername={setUsername} setPassword={setPassword}/>
        <Notification notification={notification} />
      </div>
    )
  }

  return (
    <div>
      <h2>
        {user.name}'s blogs<br/>
        <button className='logout' onClick={handleLogout}>Log Out?</button>
      </h2>
      <NewBlogToggle ref={blogFormRef}>
        <NewBlog createNewBlog={createNewBlog} />
      </NewBlogToggle>
      <Notification notification={notification} />
      {blogs.map((blog, i) => (
        <Blog blog={blog} handleLike={likeBlog} handleDelete={deleteBlog} user={user} ref={blogRef} key={blog.id || i}/>
      ))}
    </div>
  )
}

export default App