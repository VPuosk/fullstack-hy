import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { userLogOut } from '../reducers/userReducer'

const LoggedOn = ( ) => {
  const dispatch = useDispatch()
  const currentUser = useSelector(state => state.user)

  const handleLogout = async (event) => {
    event.preventDefault()
    dispatch(userLogOut())
  }

  return (
    <div>
      <h4>Logged in user: {currentUser.name}</h4>
      <form onClick={handleLogout}>
        <button type="submit">Logout</button>
      </form>
    </div>
  )
}

export default LoggedOn