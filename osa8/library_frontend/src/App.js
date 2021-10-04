import { useApolloClient, useQuery, useLazyQuery } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import Login from './components/Login'
import NewBook from './components/NewBook'
import Recommended from './components/Recommended'
import { ALL_GENRE_BOOKS, BOOK_ADDED, GET_CURRENT_USER } from './queries'

import { useSubscription } from '@apollo/client'

const App = () => {
  const [page, setPage] = useState('authors')
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)
  const [selectedGenre, setSelectedGenre] = useState({value: '', label: 'all'})
  const result = useQuery(ALL_GENRE_BOOKS, {variables: { genreName: selectedGenre.value}})
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

  const updateCacheWith = (addedBook) => {
    const includedIn = (set, object) => {
      return set.map(item => item.title).includes(object.title)
    }
    
    let booksInStore = client.readQuery({ query: ALL_GENRE_BOOKS })

    if (!booksInStore) {
      console.log('client book data not ready before subscription')
      booksInStore = result.data
    }

    console.log(booksInStore)

    if (!includedIn(booksInStore.allBooks, addedBook)) {
      client.writeQuery({
        query: ALL_GENRE_BOOKS,
        variables: { genreName: '' },
        data: { allBooks : booksInStore.allBooks.concat(addedBook) }
      })
    }
  }

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const newBook = subscriptionData.data.bookAdded
      updateCacheWith(newBook)
      window.alert(`New book added`)
    }
  })

  const changeGenre = (value) => {
    console.log(value)
    setSelectedGenre(value)
    
  }

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
        if (result.loading) {
          return (
            <div>
              Page loading.. be patient
            </div>
          )
        }
        //console.log(result)
        return ( <Books
          books={result.data.allBooks}
          genre={selectedGenre}
          setGenre={() => changeGenre}
        /> )
      case 'add':
        return ( <NewBook
          setPage={setPage}
        /> )
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