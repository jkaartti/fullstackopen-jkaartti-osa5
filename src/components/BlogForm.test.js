import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

describe('<BlogForm />', () => {
  test('calls the correct function with correct data when a new blog is created', async () => {
    const user = userEvent.setup()
    const createBlog = jest.fn()
    const { container } = render(<BlogForm createBlog={createBlog} />)

    const title = container.querySelector('input[name="Title"]')
    const author = container.querySelector('input[name="Author"]')
    const url = container.querySelector('input[name="Url"]')

    await user.type(title, 'Test Title')
    await user.type(author, 'Test Author')
    await user.type(url, 'www.testurl.com')

    const createButton = screen.getByText('create')
    await user.click(createButton)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].title).toBe('Test Title')
    expect(createBlog.mock.calls[0][0].author).toBe('Test Author')
    expect(createBlog.mock.calls[0][0].url).toBe('www.testurl.com')
  })
})