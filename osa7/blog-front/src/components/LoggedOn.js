import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { userLogOut } from '../reducers/loginReducer'
import { StyledButton } from './Styles'

const LoggedOn = ( ) => {
  const dispatch = useDispatch()
  const currentUser = useSelector(state => state.login)

  const handleLogout = async (event) => {
    event.preventDefault()
    dispatch(userLogOut())
  }

  return (
    <>Logged in user: {currentUser.name}
      <StyledButton onClick={handleLogout}>Logout</StyledButton>
    </>
  )
}

export default LoggedOn