import React, { useState } from 'react'
import { AUTHOR_EDIT_YEAR, ALL_AUTHORS } from '../queries'
import { useMutation } from '@apollo/client'
import Select from 'react-select'

const AuthorEdit = ({ authors }) => {
  const [year, setYear] = useState('')
  const [selected, setSelected] = useState(null)
  
  const [ changeYear ] = useMutation(AUTHOR_EDIT_YEAR, {
    refetchQueries: [ { query: ALL_AUTHORS } ]
  })
  

  const changeAuthorYear = async (event) => {
    event.preventDefault()

    console.log(selected,year)

    await changeYear({
      variables: {
        name: selected.name,
        born: Number(year)
      }
    })

    setSelected(null)
    setYear('')
  }

  return (
    <div>
      <h3>
        Set birthyear
      </h3>
      
      <form onSubmit={changeAuthorYear}>
        <Select
          defaultValue={selected}
          onChange={setSelected}
          options={authors}
          getOptionLabel={(author)=>author.name}
          getOptionValue={(author)=>author.name}
        />
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