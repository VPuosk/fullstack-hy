import anecdoteService from '../services/anecdotes'

const anecdoteReducer = (state = [], action) => {
  //console.log('state now: ', state)
  //console.log('action', action)

  switch(action.type) {
    case 'VOTE':
      return state.map(anec =>
        anec.id !== action.data.id ? anec : action.data
      )
    case 'NEW_ANECDOTE':
      //const anecdote = asObject(action.data.anecdote)
      //return [...state, anecdote]
      return [...state, action.data]
    case 'INIT_ANECDOTES':
      return action.data
    default:
      return state
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const content = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: content,
    })
  }
}

export const createAnecdote = (data) => {
  return async dispatch => {
    const result = await anecdoteService.createNew(data)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: result,
    })
  }
}

export const voteAnecdote = (anecdote) => {
  const newAnecdote = { ...anecdote, votes: anecdote.votes + 1 }
  return async dispatch => {
    const result = await anecdoteService.updateAnecdote(newAnecdote)
    dispatch({
      type: 'VOTE',
      data: result
    })
  }
}

export default anecdoteReducer