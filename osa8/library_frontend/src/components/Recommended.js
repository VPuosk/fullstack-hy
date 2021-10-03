import { useQuery } from '@apollo/client'
import React, { useState, useEffect } from 'react'
import { ALL_GENRE_BOOKS } from '../queries'

const Recommended = ({ favoriteGenre }) => {
  const [books, setBooks] = useState([])

  const result = useQuery(ALL_GENRE_BOOKS, {variables: { genreName: favoriteGenre }})
  
  useEffect(() => {
    if (result.data) {
      setBooks(result.data.allBooks)
    }
  }, [result.data]) // eslint-disable-line

  if (result.loading) {
    return <div>
      ...fetching library data...
    </div>
  }

  return (
    <div>
      <h2>recommendations</h2>

      <h4>books in your favorite genre: {favoriteGenre}</h4>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {books.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Recommended