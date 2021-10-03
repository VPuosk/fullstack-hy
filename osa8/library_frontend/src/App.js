import { useApolloClient } from '@apollo/client'
import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import Login from './components/Login'
import NewBook from './components/NewBook'


const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const client = useApolloClient()

  const logout = () => {
    setToken(null)
    localStorage.removeItem('library-app-user-token')
    client.resetStore()
  }

  const showOptionalContent = () => {
    if (token) {
      return (
        <>
          <button onClick={() => setPage('add')}>add book</button>
          <button onClick={() => logout()}>logout</button>
        </>
      )
    } else {
      return (
        <button onClick={() => setPage('login')}>login</button>
      )
    }
  }

  const showContent = () => {
    switch (page) {
      case 'authors':
        return ( <Authors /> )
      case 'books':
        return ( <Books /> )
      case 'add':
        return ( <NewBook /> )
      case 'login':
        return ( <Login
          setToken={setToken}
          setPage={setPage}
        />)
      default:
        return null;
    }
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {showOptionalContent()}
      </div>

      {showContent()}

    </div>
  )
}

export default App