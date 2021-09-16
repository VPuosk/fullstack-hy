import React from 'react'

const BlogForm = ({
  handleBlogCreate,
  handleBlogFormVisibility,
  handleBlogTitleChange,
  handleBlogAuthorChange,
  handleBlogURLChange,
  blogTitle,
  blogAuthor,
  blogURL
}) => {
  return (
    <div>
      <form onSubmit={handleBlogCreate}>
        <div>
          Title: 
          <input
            type="text"
            value={blogTitle}
            name="Title"
            onChange={handleBlogTitleChange}
          />
        </div>
        <div>
          Author: 
          <input
            type="text"
            value={blogAuthor}
            name="Author"
            onChange={handleBlogAuthorChange}
          />
        </div>
        <div>
          URL: 
          <input
            type="text"
            value={blogURL}
            name="URL"
            onChange={handleBlogURLChange}
          />
        </div>
        <button type="submit" onClick={handleBlogFormVisibility}>Post the BLOG!</button>
      </form>
    </div>
  )
}

export default BlogForm