import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'

const App = () => {
  const [page, setPage] = useState('authors')

  const showContent = () => {
    switch (page) {
      case 'authors':
        return ( <Authors /> )
      case 'books':
        return ( <Books /> )
      case 'add':
        return ( <NewBook /> )
      default:
        return null;
    }
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
      </div>

      {showContent()}

    </div>
  )
}

export default App