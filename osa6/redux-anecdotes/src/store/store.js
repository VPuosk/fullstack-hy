import { createStore } from 'redux'
import anecdoteReducer from '../reducers/anecdoteReducer'
import notificationReducer from '../reducers/notificationReducer'
import { composeWithDevTools } from 'redux-devtools-extension'
import { combineReducers } from 'redux'

const reducer = combineReducers({
  anecdotes: anecdoteReducer,
  notifications: notificationReducer
})

const store = createStore(
  reducer,
  composeWithDevTools()
)

export default store