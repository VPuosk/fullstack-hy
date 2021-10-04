
import { useLazyQuery } from '@apollo/client'
import React, { useState, useEffect } from 'react'
import { ALL_GENRES } from '../queries'
import Select from 'react-select'

const Books = ({ books, genre, setGenre }) => {
  //const [books, setBooks] = useState([])
  const [genres, setGenres] = useState([])
  const [getGenres, genreResult] = useLazyQuery(ALL_GENRES)

  useEffect(() => {
    getGenres()    
  }, []) // eslint-disable-line

  useEffect(() => {
    if (genreResult.data) {

      const genreArrays = genreResult.data.allBooks.map(value => value.genres)
      const list = [...new Set(genreArrays.flat())]
      const options = list.map(value => {
        return ({ value: value, label: value})
      })
      const blank = {value: '', label: 'all'}
      setGenres([ ...options, blank ])
    }
  }, [genreResult.data])

  if (!books) {
    return <div>
      ...fetching library data...
    </div>
  }

  const GenreSelect = () => {
    if (genreResult.loading) {
      return (
        null
      )
    }
    return (
      <Select
        defaultValue={genre}
        onChange={setGenre()}
        options={genres}
      />
    )
  }

  return (
    <div>
      <h2>books</h2>

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
      {GenreSelect()}
    </div>
  )
}

export default Books