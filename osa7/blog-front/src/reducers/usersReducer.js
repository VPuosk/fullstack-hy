import usersService from '../services/users'

const usersReducer = (state = [], action) => {
  switch (action.type) {
  case 'GET_USERS':
    return action.data
  default:
    return state
  }
}

export const getUsers = () => {
  return async dispatch => {
    const results = await usersService.getAll()
    dispatch({
      type: 'GET_USERS',
      data: results
    })
  }
}

export default usersReducer