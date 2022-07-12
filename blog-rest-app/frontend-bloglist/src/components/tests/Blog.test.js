/* eslint-disable testing-library/no-container */
/* eslint-disable testing-library/no-node-access */
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from '../Blog'
import BlogForm from '../BlogForm'
test('renders blog', () => {
  const blog = {
    author: 'yasuo',
    title: 'wind',
    like: 5,
    url: 'www.asdasdasdada.com',
  }
  const { container } = render(
    <Blog
      blog={blog}
      user={{ user: 'undefined' }}
      like={() => {}}
      deleteBlog={() => {}}
    />
  )
  const getButton = screen.getByText('View')
  expect(getButton).toBeDefined()
  const likes = screen.queryByText('5')
  expect(likes).toBeNull()
})

test('renders blog with extra elements', async () => {
  const blog = {
    author: 'yasuo',
    title: 'wind',
    likes: 5,
    url: 'www.asdasdasdada.com',
  }
  render(
    <Blog
      blog={blog}
      user={{ user: 'undefined' }}
      like={() => {}}
      deleteBlog={() => {}}
    />
  )
  const button = screen.getByText('View')
  expect(button).toBeDefined()
  expect(screen.queryByText('5')).toBeNull()
  await userEvent.click(button)
  expect(screen.getByText('Like')).toBeDefined()
})

test('render calls twice if cliked twice like button', async () => {
  const blog = {
    author: 'yasuo',
    title: 'wind',
    likes: 5,
    url: 'www.asdasdasdada.com',
  }
  const mockHandler = jest.fn()

  render(
    <Blog
      blog={blog}
      user={{ user: 'undefined' }}
      like={mockHandler}
      deleteBlog={() => {}}
    />
  )
  const user = userEvent.setup()

  const button = screen.getByText('View')
  await userEvent.click(button)
  const likeButton = screen.getByText('Like')
  expect(likeButton).toBeDefined()
  await user.click(likeButton)
  await user.click(likeButton)

  expect(mockHandler.mock.calls).toHaveLength(2)
})
test('<BlogForm /> updates parent state and calls onSubmit', async () => {
  const createBlog = jest.fn()
  const user = userEvent.setup()

  const { container } = render(<BlogForm createBlog={createBlog} />)

  const titleInput = container.querySelector("input[name='title']")
  const authorInput = container.querySelector("input[name='author']")
  const urlInput = container.querySelector("input[name='url']")
  const sendButton = screen.getByText('Create Blog')

  await user.type(titleInput, 'title')
  await user.type(authorInput, 'author')
  await user.type(urlInput, 'https://www.test.com')
  await user.click(sendButton)
  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('title')
  expect(createBlog.mock.calls[0][0].author).toBe('author')
  expect(createBlog.mock.calls[0][0].url).toBe('https://www.test.com')
})
