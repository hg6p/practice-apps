import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, like, user, handleDelete }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }
  const [status, setStatus] = useState(false)
  const addLike = () => {
    like({ ...blog, likes: blog.likes + 1 })
  }
  const onDelete = () => {
    handleDelete(blog.id)
  }
  return (
    <div style={blogStyle}>
      {blog.title}
      {blog.author}
      {status && (
        <>
          {blog.url}
          {blog.likes}
          <button
            onClick={(e) => {
              addLike()
              e.target.textContent = 'Liked'
            }}
          >
            Like
          </button>
          {blog && blog.user ? (
            blog.user.username === user ? (
              <button onClick={onDelete}>Delete</button>
            ) : (
              ' '
            )
          ) : (
            'undefined'
          )}
        </>
      )}

      <button onClick={() => setStatus(!status)}>
        {status ? 'Hide' : 'View'}
      </button>
    </div>
  )
}
Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  like: PropTypes.func.isRequired,
  user: PropTypes.string.isRequired,
  handleDelete: PropTypes.func.isRequired,
}
export default Blog
