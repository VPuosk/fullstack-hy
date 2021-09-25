import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { userLogOut } from '../reducers/loginReducer'

const LoggedOn = ( ) => {
  const dispatch = useDispatch()
  const currentUser = useSelector(state => state.login)

  const handleLogout = async (event) => {
    event.preventDefault()
    dispatch(userLogOut())
  }

  return (
    <>Logged in user: {currentUser.name}
      <button onClick={handleLogout}>Logout</button>
    </>
  )
}

export default LoggedOn