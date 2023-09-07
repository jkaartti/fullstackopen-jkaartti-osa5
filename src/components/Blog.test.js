import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'

describe('<Blog />', () => {
  let addLike

  const blog = {
    title: 'title',
    author: 'author',
    url: 'www.url.com',
    user: {
      name: 'Test user'
    }
  }

  beforeEach(() => {
    addLike = jest.fn()
    render(
      <Blog
        blog={blog}
        addLike={addLike}
      />
    )
  })

  test('only renders title and author by default', () => {
    let div = screen.getByText('title', { exact: false })
    expect(div).not.toHaveStyle('display: none')

    div = screen.getByText('author', { exact: false })
    expect(div).not.toHaveStyle('display: none')

    div = screen.getByText('www.url.com', { exact: false })
    expect(div).toHaveStyle('display: none')

    div = screen.getByText('likes', { exact: false })
    expect(div).toHaveStyle('display: none')

    div = screen.getByText('Test user', { exact: false })
    expect(div).toHaveStyle('display: none')
  })

  test('renders also url, likes and the user\'s name when the view button is pressed', () => {
    const viewButton = screen.getByText('view')
    fireEvent.click(viewButton)

    let div = screen.getByText('www.url.com', { exact: false })
    expect(div).not.toHaveStyle('display: none')

    div = screen.getByText('likes', { exact: false })
    expect(div).not.toHaveStyle('display: none')

    div = screen.getByText('Test user', { exact: false })
    expect(div).not.toHaveStyle('display: none')
  })

  test('calls the handler function twice, when like button is pressed twice', () => {
    const viewButton = screen.getByText('view')
    fireEvent.click(viewButton)

    const likeButton = screen.getByText('like')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)

    expect(addLike.mock.calls).toHaveLength(2)
  })
})