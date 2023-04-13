import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent, waitFor } from '@testing-library/react'
import NewBlog from '../NewBlog'

test('that the form calls the event handler it received as props with the right details when a new blog is created', async () => {

  const mockHandler = jest.fn()
  const component = render(<NewBlog createNewBlog={mockHandler}/>)

  const form = component.container.querySelector('#newBlogForm')
  const title = component.container.querySelector('#title')
  const author = component.container.querySelector('#author')
  const url = component.container.querySelector('#url')


  fireEvent.change(title, {
    target: { value: 'blog title' }
  })
  fireEvent.change(author, {
    target: { value: 'blog author' }
  })
  fireEvent.change(url, {
    target: { value: 'blog url' }
  })

  fireEvent.submit(form)

  await waitFor(() => {
    expect(mockHandler.mock.calls).toHaveLength(1)
    expect(mockHandler.mock.calls[0][0].title).toBe('blog title')
    expect(mockHandler.mock.calls[0][0].author).toBe('blog author')
    expect(mockHandler.mock.calls[0][0].url).toBe('blog url')
  })
})