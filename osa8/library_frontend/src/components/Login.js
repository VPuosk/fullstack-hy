import { useMutation } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { USER_LOGIN } from '../queries'

const Login = ({ setToken, setPage }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  
  const [ userLogin, result ] = useMutation(USER_LOGIN)
  
  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value
      setToken(token)
      localStorage.setItem('library-app-user-token', token)
      setPage('books')
    }
  })

  const loginUser = async (event) => {
    event.preventDefault()

    await userLogin({
      variables: {
        username,
        password
      }
    })

    setUsername('')
    setPassword('')
  }

  return (
    <div>
      <form onSubmit={loginUser}>
        <div>
          name
          <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type='submit'>login</button>
      </form>
    </div>
  )
}

export default Login