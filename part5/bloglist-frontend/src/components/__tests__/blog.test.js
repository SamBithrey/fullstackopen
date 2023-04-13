import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from '../Blog'

test('Blog renders the blog\'s title and author, but does not render its url or number of likes by default.', () => {
  const blog = {
    title: 'Blog title',
    author: 'Blog Author',
    url: 'google.com',
    likes: 3
  }
  const loggedUser = {
    name: '',
    token: '',
    username: ''
  }

  const handleBlogDelete = () => null
  const handleLike = () => null

  const component = render(
    <Blog
      blog={blog}
      user={loggedUser}
      handleDelete={handleBlogDelete}
      handleLike={handleLike}
    />
  )

  expect(component.container).toHaveTextContent(
    'Blog title'
  )
  expect(component.container).toHaveTextContent(
    'Blog Author'
  )
  expect(component.container).not.toHaveTextContent(
    'google.com'
  )
  expect(component.container).not.toHaveTextContent(
    3
  )
})

test('Blog renders the everything after the show button is clicked', () => {
  const blog = {
    title: 'Blog title',
    author: 'Blog Author',
    url: 'google.com',
    likes: 3,
    user: 'BlogUser'
  }
  const loggedUser = {
    name: '',
    token: '',
    username: ''
  }

  const handleBlogDelete = () => null
  const handleLike = () => null

  const component = render(
    <Blog
      blog={blog}
      user={loggedUser}
      handleDelete={handleBlogDelete}
      handleLike={handleLike}
    />
  )
  const showButton = component.getByText('Show More Info!')
  fireEvent.click(showButton)

  expect(component.container).toHaveTextContent(
    'Blog title'
  )
  expect(component.container).toHaveTextContent(
    'Blog Author'
  )
  expect(component.container).toHaveTextContent(
    'google.com'
  )
  expect(component.container).toHaveTextContent(
    3
  )
})

test('Like button clicks twice', () => {
  const blog = {
    title: 'Blog title',
    author: 'Blog Author',
    url: 'google.com',
    likes: 3,
    user: 'BlogUser'
  }
  const loggedUser = {
    name: '',
    token: '',
    username: ''
  }
  const handleBlogDelete = () => null
  const mockHandler = jest.fn()

  const component = render(
    <Blog
      blog={blog}
      user={loggedUser}
      handleDelete={handleBlogDelete}
      handleLike={mockHandler}
    />
  )
  const showButton = component.getByText('Show More Info!')
  fireEvent.click(showButton)

  const likeButton = component.container.querySelector('.likeButton')
  fireEvent.click(likeButton)
  fireEvent.click(likeButton)

  expect(mockHandler.mock.calls).toHaveLength(2)
})