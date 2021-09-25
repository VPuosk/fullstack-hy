const initialState = null

const notificationReducer = (state = initialState, action) => {
  switch(action.type) {
  case 'NEW_NOTIFICATION':
    return action.data
  case 'CLEAR_NOTIFICATION':
    return null
  case 'RESET_NOTIFICATION':
    if (state !== null ) {
      clearTimeout(state.timeoutID)
    }
    return state
  default:
    return state
  }
}

export const setRedNotification = (content, time) => {
  return async dispatch => {
    const timeout_id = setTimeout(() => {
      dispatch(clearNotification())
    }, time * 1000)
    dispatch(resetNotification())
    dispatch({
      type: 'NEW_NOTIFICATION',
      data: {
        type: 'error',
        content: content,
        timeoutID: timeout_id
      }
    })
  }
}

export const setGreenNotification = (content, time) => {
  return async dispatch => {
    const timeout_id = setTimeout(() => {
      dispatch(clearNotification())
    }, time * 1000)
    dispatch(resetNotification())
    dispatch({
      type: 'NEW_NOTIFICATION',
      data: {
        type: 'note',
        content: content,
        timeoutID: timeout_id
      }
    })
  }
}

export const resetNotification = () => {
  return {
    type: 'RESET_NOTIFICATION'
  }
}

export const clearNotification = () => {
  return {
    type: 'CLEAR_NOTIFICATION'
  }
}

export default notificationReducer