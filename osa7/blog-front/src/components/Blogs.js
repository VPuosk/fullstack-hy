import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Blogs = ( ) => {
  const blogs = useSelector(state => state.blogs)

  return (
    <table>
      <tbody>
        {blogs
          .sort((firstBlog, secondBlog) => secondBlog.likes - firstBlog.likes)
          .map(blog =>
            <tr key={blog.id}>
              <td>
                <Link to={`/blogs/${blog.id}`} >
                  {blog.title} - {blog.author}
                </Link>
              </td>
            </tr>
          )}
      </tbody>
    </table>
  )
}

export default Blogs