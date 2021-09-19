const initialState = 'Message'

const notificationReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'NEW_NOTIFICATION':
      return [...state, action.data]
    case 'CLEAR_NOTIFICATION':
      return []
    default:
      return state
  }
}

export const setNotification = (content) => {
  return {
    type: 'NEW_NOTIFICATION',
    data: content
  }
}

export const clearNotification = () => {
  return {
    type: 'CLEAR_NOTIFICATION'
  }
}

export default notificationReducer