
import { useQuery, useLazyQuery } from '@apollo/client'
import React, { useState, useEffect } from 'react'
import { ALL_BOOKS, ALL_GENRES, ALL_GENRE_BOOKS } from '../queries'
import Select from 'react-select'

const Books = (props) => {
  const [books, setBooks] = useState([])
  const [genres, setGenres] = useState([])
  const [selected, setSelected] = useState('')

  const result = useQuery(ALL_BOOKS)
  const [getGenres, genreResult] = useLazyQuery(ALL_GENRES)
  const [getGenreBooks, genreBookResult] = useLazyQuery(ALL_GENRE_BOOKS)

  useEffect(() => {
    if (result.data) {
      setBooks(result.data.allBooks)
    }
  }, [result.data]) // eslint-disable-line

  useEffect(() => {
    if (selected !== '') {
      getGenreBooks({ variables: { genreName: selected.value } })
    }
  }, [selected]) // eslint-disable-line

  useEffect(() => {
    if (genreBookResult.data) {
      setBooks(genreBookResult.data.allBooks)
    }
  }, [genreBookResult.data]) // eslint-disable-line

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

  if (result.loading) {
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
        defaultValue={selected}
        onChange={setSelected}
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