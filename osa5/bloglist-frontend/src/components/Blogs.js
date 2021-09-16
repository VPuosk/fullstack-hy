import React from 'react'
import Blog from './Blog'

const Blogs = ({ blogs, likeABlog, removeABlog, user }) => {

  blogs.sort((firstBlog, secondBlog) => secondBlog.likes - firstBlog.likes)

  return (
    <div>
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

export default Blogs