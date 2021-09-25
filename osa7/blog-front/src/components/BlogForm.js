import React, { useState } from 'react'
import { createBlog } from '../reducers/blogReducer'
import { useDispatch } from 'react-redux'

const BlogForm = (  ) => {

  const dispatch = useDispatch()

  const [blogTitle, setBlogTitle] = useState('')
  const [blogAuthor, setBlogAuthor] = useState('')
  const [blogURL, setBlogURL] = useState('')

  const handleBlogTitleChange = (event) => {
    setBlogTitle(event.target.value)
  }

  const handleBlogAuthorChange = (event) => {
    setBlogAuthor(event.target.value)
  }

  const handleBlogURLChange = (event) => {
    setBlogURL(event.target.value)
  }

  const addBlogPost = (event) => {
    event.preventDefault()
    /*
    createBlogPost({
      title: blogTitle,
      author: blogAuthor,
      url: blogURL,
      likes: 0
    })
    */
    dispatch(createBlog({
      title: blogTitle,
      author: blogAuthor,
      url: blogURL,
      likes: 0
    }))

    setBlogAuthor('')
    setBlogTitle('')
    setBlogURL('')
  }

  return (
    <div>
      <form onSubmit={addBlogPost}>
        <div>
          Title:
          <input
            type="text"
            value={blogTitle}
            name="Title"
            id="title_input"
            onChange={handleBlogTitleChange}
          />
          <label htmlFor="title_input">Title</label>
        </div>
        <div>
          Author:
          <input
            type="text"
            value={blogAuthor}
            name="Author"
            id="author_input"
            onChange={handleBlogAuthorChange}
          />
          <label htmlFor="author_input">Author</label>
        </div>
        <div>
          URL:
          <input
            type="text"
            value={blogURL}
            name="URL"
            id="url_input"
            onChange={handleBlogURLChange}
          />
          <label htmlFor="url_input">URL</label>
        </div>
        <button type="submit" id='PostBlog'>Post the BLOG!</button>
      </form>
    </div>
  )
}

export default BlogForm