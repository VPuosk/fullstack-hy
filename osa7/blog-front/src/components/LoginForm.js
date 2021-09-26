import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { userLogIn } from '../reducers/loginReducer'

const LoginForm = ( ) => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()

  const handleUsernameChange = (event) => {
    setUsername(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const handleLogin = async (userObj) => {
    try {
      dispatch(userLogIn(userObj))
    } catch (exception) {
      console.log('Bad credentials')
    }
  }

  const doLogin = (event) => {
    event.preventDefault()
    handleLogin({
      username : username,
      password : password
    })

    setUsername('')
    setPassword('')
  }

  return (
    <div>
      <form onSubmit={doLogin}>
        <div>
          Username
          <input
            type="text"
            value={username}
            name="Username"
            id='username'
            onChange={handleUsernameChange}
          />
        </div>
        <div>
          Password
          <input
            type="password"
            value={password}
            name="Password"
            id='password'
            onChange={handlePasswordChange}
          />
        </div>
        <button type="submit" id='login-button'>login</button>
      </form>
    </div>
  )
}

export default LoginForm