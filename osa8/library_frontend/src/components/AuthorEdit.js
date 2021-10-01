import React, { useState } from 'react'
import { AUTHOR_EDIT_YEAR, ALL_AUTHORS } from '../queries'
import { useMutation } from '@apollo/client'

const AuthorEdit = () => {
  const [author, setAuthor] = useState('')
  const [year, setYear] = useState('')

  
  const [ changeYear ] = useMutation(AUTHOR_EDIT_YEAR, {
    refetchQueries: [ { query: ALL_AUTHORS } ]
  })
  

  const changeAuthorYear = async (event) => {
    event.preventDefault()

    await changeYear({
      variables: {
        name: author,
        born: Number(year)
      }
    })

    setAuthor('')
    setYear('')
  }

  return (
    <div>
      <h3>
        Set birthyear
      </h3>
      <form onSubmit={changeAuthorYear}>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          year
          <input
            type='number'
            value={year}
            onChange={({ target }) => setYear(target.value)}
          />
        </div>
        <button type='submit'>change year</button>
      </form>
    </div>
  )

}

export default AuthorEdit