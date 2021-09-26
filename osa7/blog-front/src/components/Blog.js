import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { likeBlog, removeBlog, postCommentToBlog } from '../reducers/blogReducer'
import { useRouteMatch } from 'react-router'

const Blog = ( ) => {
  const dispatch = useDispatch()
  const match = useRouteMatch('/blogs/:id')
  const blog = useSelector(state => state.blogs.find(blog => blog.id === match.params.id))
  const user = useSelector(state => state.login)
  const [comment, setComment] = useState('')

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
    //console.log('user', user)
    //console.log('blog.user', blog.user)
    if (user === null) {
      return ( null )
    }
    if (user.username === blog.user.username) {
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
  const handleCommentChange = (event) => {
    setComment(event.target.value)
  }

  const postNewComment = (event) => {
    event.preventDefault()
    const tempBlog = { ...blog, user: blog.user.id }
    const newComment = {
      blog: tempBlog,
      comment: comment
    }
    dispatch(postCommentToBlog(blog.id, newComment))
  }

  const addNewComment = () => {
    return (
      <div>
        <form onSubmit={postNewComment}>
          <input
            type="text"
            value={comment}
            name="comment"
            id='comment'
            onChange={handleCommentChange}
          />
          <button type="submit" id='new_comment'>New comment</button>
        </form>
      </div>
    )
  }

  const maybeRenderComments = () => {
    if (!blog.comments) {
      return (
        null
      )
    }

    return (
      <ul>
        {blog.comments.map(comment =>
          <li key={comment}>
            {comment}
          </li>
        )}
      </ul>
    )
  }

  return (
    <div>
      <h3>{blog.title} by {blog.author}</h3>
      <div>Url: {blog.url}</div>
      <div>Likes: {blog.likes} <button onClick={like}>Like this blog</button></div>
      <div>Added by: {blog.user.name}</div>
      {maybeRenderRemove()}
      <h5>Comments</h5>
      {addNewComment()}
      {maybeRenderComments()}
    </div>
  )
}

export default Blog