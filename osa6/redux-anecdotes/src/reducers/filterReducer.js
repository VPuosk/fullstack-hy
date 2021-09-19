const filterReducer = (state = '', action) => {
  switch(action.type) {
    case 'FILTER_CHANGED':
      return action.data
    default:
      return state
  }
}

export const setFilter = (content) => {
  return {
    type: 'FILTER_CHANGED',
    data: content
  }
}

export default filterReducer