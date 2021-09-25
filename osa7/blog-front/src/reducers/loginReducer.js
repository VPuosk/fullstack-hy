import blogService from '../services/blogs'
import loginService from '../services/login'

const userReducer = ( state = null, action ) => {
  switch(action.type) {

  case 'LOG_IN':
    return action.data
  case 'LOG_OUT':
    return null
  case 'SET_USER':
    return action.data
  default:
    return state
  }
}

export const userSet = (user) => {
  return dispatch => {
    blogService.setToken(user.token)
    dispatch({
      type: 'LOG_IN',
      data: user
    })
  }
}

export const userLogIn = (user) => {
  return async dispatch => {
    const loggedUser = await loginService.login(user)
    window.localStorage.setItem(
      'loggedBlogger', JSON.stringify(loggedUser)
    )
    blogService.setToken(loggedUser.token)
    dispatch({
      type: 'LOG_IN',
      data: loggedUser
    })
  }
}

export const userLogOut = () => {
  return async dispatch => {
    window.localStorage.removeItem('loggedBlogger')
    blogService.setToken(null)
    dispatch({
      type: 'LOG_OUT'
    })
  }
}

export default userReducer