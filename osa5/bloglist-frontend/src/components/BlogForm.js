import React, {useState} from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ createBlogPost }) => {

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
    createBlogPost({
      title: blogTitle,
      author: blogAuthor,
      url: blogURL,
      likes: 0
    })

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
        <button type="submit">Post the BLOG!</button>
      </form>
    </div>
  )
}

BlogForm.propTypes = {
  createBlogPost: PropTypes.func.isRequired
}


export default BlogForm