import blogService from '../services/blogs'
import { setGreenNotification } from './notificationReducer'

const blogReducer = (state = [], action) => {
  switch(action.type) {
  case 'LIKE':
    return state.map(blog => blog.id !== action.data.id ? blog : action.data)
  case 'ADD_BLOG':
    return [...state, action.data]
  case 'REMOVE_BLOG':
    return state.filter(blog => blog.id !== action.data)
  case 'INIT_BLOGS':
    return action.data
  default:
    return state
  }
}

export const initBlogs = () => {
  //console.log('blog init A')
  return async dispatch => {
    //console.log('blog init B')
    const result = await blogService.getAll()
    //console.log(result)
    dispatch({
      type: 'INIT_BLOGS',
      data: result
    })
  }
}

export const createBlog = (blog) => {
  return async dispatch => {
    const result  = await blogService.createNew(blog)
    dispatch({
      type: 'ADD_BLOG',
      data: result
    })
  }
}

export const removeBlog = (id) => {
  return async dispatch => {
    await blogService.removeBlog(id)
    dispatch(setGreenNotification( 'Note: Blog removed', 3 ))
    dispatch({
      type: 'REMOVE_BLOG',
      data: id
    })
  }
}

export const likeBlog = (blog) => {
  const newBlog = { ...blog, likes: blog.likes + 1 }
  const writer = newBlog.user
  return async dispatch => {
    const result = await blogService.updateExisting(blog.id, newBlog)
    result.user = writer
    dispatch(setGreenNotification( `Note: Liked a blog:\n${result.title} by ${result.author}`, 3 ))
    dispatch({
      type: 'LIKE',
      data: result
    })
  }
}

export default blogReducer