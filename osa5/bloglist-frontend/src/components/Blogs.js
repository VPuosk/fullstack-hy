import React from 'react'
import Blog from './Blog'
import PropTypes from 'prop-types'


const Blogs = ({ blogs, likeABlog, removeABlog, user }) => {

  blogs.sort((firstBlog, secondBlog) => secondBlog.likes - firstBlog.likes)

  return (
    <div id='blogs_element'>
      {blogs.map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          likeABlog={likeABlog}
          removeABlog={removeABlog}
          user={user}
        />
      )}
    </div>
  )
}

Blogs.propTypes = {
  blogs: PropTypes.array.isRequired,
  likeABlog: PropTypes.func.isRequired,
  removeABlog: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
}

export default Blogs