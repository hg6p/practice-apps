import { useState } from 'react'
import PropTypes from 'prop-types'
const BlogForm = ({ createBlog }) => {
  const [blog, setBlog] = useState({
    title: '',
    author: '',
    url: '',
  })
  const handleChange = (e) => {
    setBlog({ ...blog, [e.target.name]: e.target.value })
  }
  const handleSubmit = (event) => {
    event.preventDefault()
    createBlog(blog)
    setBlog({
      title: '',
      author: '',
      url: '',
    })
  }
  return (
    <form onSubmit={handleSubmit}>
      <div>
        title
        <input
          type="text"
          id="title"
          value={blog.title}
          name="title"
          onChange={(e) => handleChange(e)}
        />
      </div>
      <div>
        author
        <input
          type="text"
          id="author"
          value={blog.author}
          name="author"
          onChange={(e) => handleChange(e)}
        />
      </div>
      <div>
        url
        <input
          type="text"
          id="url"
          value={blog.url}
          name="url"
          onChange={(e) => handleChange(e)}
        />
      </div>
      <button type="submit">Create Blog</button>
    </form>
  )
}
BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
}
export default BlogForm
