const anecdoteReducer = (state = [], action) => {
  //console.log('state now: ', state)
  //console.log('action', action)

  switch(action.type) {
    case 'VOTE':
      const voteID = action.data.id
      const anecdoteToVote = state.find(state => state.id === voteID)
      const anecdoteVoted = {
        ...anecdoteToVote,
        votes: anecdoteToVote.votes + 1
      }
      return state.map(anec =>
        anec.id !== voteID ? anec : anecdoteVoted
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

export const initializeAnecdotes = (content) => {
  return {
    type: 'INIT_ANECDOTES',
    data: content,
  }
}

export const createAnecdote = (data) => {
  return {
    type: 'NEW_ANECDOTE',
    data,
  }
}

export const voteAnecdote = (id) => {
  return {
    type: 'VOTE',
    data: { id }
  }
}

export default anecdoteReducer