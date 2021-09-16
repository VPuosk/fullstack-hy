import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, likeABlog, removeABlog, user }) => {

  const [thisBlogVisibility, setThisBlogVisibility] = useState(false)

  const hideWhenVisible  = { display: thisBlogVisibility ? 'none' : '' }
  const showWhenVisible = { display: thisBlogVisibility ? '' : 'none' }

  const toggleShownStatus = () => {
    setThisBlogVisibility(!thisBlogVisibility)
  }

  const likeThisBlog = (event) => {
    event.preventDefault()
    likeABlog(blog.id)
  }

  const removeThisBlog = (event) => {
    event.preventDefault()
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      removeABlog(blog.id)
    }
  }

  const maybeRenderRemove = () => {
    if (user.name === blog.user.name) {
      return (
        <>
          <button onClick={removeThisBlog}>Remove</button>
        </>
      )
    }
    return (
      <>
      </>
    )
  }

  const blogStyle = {
    width: 400,
    border: 'solid',
    borderWidth: 1,
  }

  return (
    <div style={blogStyle}>
      <div style={hideWhenVisible}>
        {blog.title} by {blog.author}
        <button onClick={toggleShownStatus}>Show</button>
      </div>
      <div style={showWhenVisible}>
        <div>Title: {blog.title}<button onClick={toggleShownStatus}>Hide</button></div>
        <div>Author: {blog.author}</div>
        <div>Url: {blog.url}</div>
        <div>Likes: {blog.likes} <button onClick={likeThisBlog}>Like this blog</button></div>
        <div>Added by: {blog.user.name}</div>
        {maybeRenderRemove()}
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  likeABlog: PropTypes.func.isRequired,
  removeABlog: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
}

export default Blog