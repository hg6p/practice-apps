import { useEffect, useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import LoginForm from './components/LoginForm'
import NewBook from './components/NewBook'
import { useApolloClient } from '@apollo/client'
const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const client = useApolloClient()
  useEffect(() => {
    setToken(localStorage.getItem('user-token'))
  }, [])
  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }
  const handleLogin = (token) => {
    setToken(token)
    setPage('authors')
  }
  return (
    <div style={{ backgroundColor: 'black', height: '100vh', color: 'white' }}>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
        {!token && <button onClick={() => setPage('login')}>Login</button>}
        {token && <button onClick={logout}>Logout</button>}
      </div>

      <Authors show={page === 'authors'} />

      <Books show={page === 'books'} />

      <NewBook show={page === 'add'} />
      <LoginForm show={page === 'login'} handleLogin={handleLogin} />
    </div>
  )
}

export default App
