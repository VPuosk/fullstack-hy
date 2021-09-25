import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { likeBlog, removeBlog } from '../reducers/blogReducer'
import { useRouteMatch } from 'react-router'

const Blog = ( ) => {
  const dispatch = useDispatch()
  const match = useRouteMatch('/blogs/:id')
  const blog = useSelector(state => state.blogs.find(blog => blog.id === match.params.id))
  const user = useSelector(state => state.login)

  if (!blog) {
    return null
  }

  const like = (event) => {
    event.preventDefault()
    dispatch(likeBlog(blog))
  }

  const remove = (event) => {
    event.preventDefault()
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      dispatch(removeBlog(blog.id))
    }
  }

  const maybeRenderRemove = () => {
    if (user === null) {
      return ( null )
    }
    if (user.name === blog.user.name) {
      return (
        <>
          <button onClick={remove}>Remove</button>
        </>
      )
    }
    return (
      null
    )
  }

  /*const blogStyle = {
    width: 400,
    border: 'solid',
    borderWidth: 1,
  }
  */

  return (
    <div>
      <h3>{blog.title} by {blog.author}</h3>
      <div>Url: {blog.url}</div>
      <div>Likes: {blog.likes} <button onClick={like}>Like this blog</button></div>
      <div>Added by: {blog.user.name}</div>
      {maybeRenderRemove()}
    </div>
  )
}

export default Blog