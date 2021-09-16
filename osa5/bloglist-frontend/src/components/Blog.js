import React, { useState } from 'react'
const Blog = ({blog}) => {

  const [thisBlogVisibility, setThisBlogVisibility] = useState(false)

  const hideWhenVisible  = { display: thisBlogVisibility ? 'none' : '' }
  const showWhenVisible = { display: thisBlogVisibility ? '' : 'none' }

  const toggleShownStatus = () => {
    setThisBlogVisibility(!thisBlogVisibility)
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
        <div>Likes: {blog.likes}</div>
        <div>Added by: {blog.user.name}</div>
      </div>  
    </div>
  )
}

export default Blog