import { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import {
  createNewBlog,
  initializeBlogs,
  voteForBlog,
  deleteBlog,
} from './reducer/blogReducer'
import { setUser, removeUser, loginUser } from './reducer/userReducer'
import blogService from './services/blogs'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import Togglable from './components/ToggableComponent'
import BlogForm from './components/BlogForm'
import User from './components/User'
import UserInfo from './components/UserInfo'
const App = () => {
  const loginFormRef = useRef()
  const blogFormRef = useRef()
  const dispatch = useDispatch()

  const blogs = useSelector((blog) => blog.blog)
  const user = useSelector((user) => user.user)
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  useEffect(() => {
    dispatch(initializeBlogs())
    getByLikes()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch])
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    console.log(loggedUserJSON)
    if (loggedUserJSON) {
      const USER = JSON.parse(loggedUserJSON)
      console.log(USER)
      dispatch(setUser(USER.username))
      blogService.setToken(USER.token)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleLogin = (event) => {
    event.preventDefault()
    try {
      dispatch(
        loginUser({
          username,
          password,
        })
      )
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const addBlog = (event) => {
    blogFormRef.current.toggleVisibility()
    const blogObject = {
      title: event.title,
      author: event.author,
      url: event.url,
    }
    dispatch(createNewBlog(blogObject))
    getByLikes()
  }
  const likeBlog = (value) => {
    const blogObject = value
    console.log(blogObject)
    dispatch(voteForBlog(blogObject))
    getByLikes()
  }
  const getByLikes = () => {
    return [...blogs].sort((a, b) => {
      return a.likes < b.likes
    })
  }
  const handleDelete = (id) => {
    dispatch(deleteBlog(id))
  }
  const UserComponent = () => {
    return getByLikes().reduce((value, blog) => {
      const author = blog.author
      if (author in value) return { ...value, [author]: value[author] + 1 }
      else return { ...value, [author]: 1 }
    }, {})
  }

  return (
    <div>
      {user !== '' && (
        <>
          <p>{user}</p>
          <button
            onClick={() => {
              window.localStorage.removeItem('loggedBlogappUser')
              dispatch(removeUser())
            }}
          >
            Logout
          </button>
        </>
      )}
      {user === '' && (
        <Togglable buttonLabel="Log in" ref={loginFormRef}>
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
        </Togglable>
      )}
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <div>
                <p className="error">{errorMessage}</p>
                <h2>blogs</h2>
                {user !== null && (
                  <Togglable buttonLabel="New blog" ref={blogFormRef}>
                    <BlogForm createBlog={addBlog} />
                  </Togglable>
                )}
                Blogs
                {getByLikes().map((blog) => (
                  <Blog
                    key={blog.id}
                    blog={blog}
                    like={likeBlog}
                    user={user || undefined}
                    handleDelete={handleDelete}
                  />
                ))}
              </div>
            }
          />

          <Route
            path="/users"
            element={<User posts={() => UserComponent()} />}
          />
          <Route path="/users/:id" element={<UserInfo blogs={[...blogs]} />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
