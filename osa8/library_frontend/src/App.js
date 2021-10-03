import { useApolloClient, useLazyQuery } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import Login from './components/Login'
import NewBook from './components/NewBook'
import Recommended from './components/Recommended'
import { GET_CURRENT_USER } from './queries'


const App = () => {
  const [page, setPage] = useState('authors')
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)
  const [getUser, userResult] = useLazyQuery(GET_CURRENT_USER)
  const client = useApolloClient()

  useEffect(() => {
    if (token) {
      getUser()
    } else {
      setUser(null)
    }
  }, [token]) // eslint-disable-line

  useEffect(() => {
    if (userResult.data) {
      setUser(userResult.data.me)
    }
  }, [userResult.data])

  const logout = () => {
    setToken(null)
    localStorage.removeItem('library-app-user-token')
    client.resetStore()
    setPage('books')
  }

  const showOptionalContent = () => {
    if (token) {
      return (
        <>
          <button onClick={() => setPage('add')}>add book</button>
          <button onClick={() => setPage('recommended')}>recommended</button>
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
      case 'recommended':
        return ( <Recommended
          favoriteGenre={user.favoriteGenre}  
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