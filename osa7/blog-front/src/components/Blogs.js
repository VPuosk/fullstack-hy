import React from 'react'
import Blog from './Blog'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { likeBlog, removeBlog } from '../reducers/blogReducer'

const Blogs = ( props ) => {
  const user = props.user
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)

  const like = (id) => {
    const blogToLike = blogs.find(blog => blog.id === id)
    dispatch(likeBlog(blogToLike))
  }

  const remove = (id) => {
    dispatch(removeBlog(id))
  }

  blogs.sort((firstBlog, secondBlog) => secondBlog.likes - firstBlog.likes)

  return (
    <div id='blogs_element'>
      {blogs
        .sort((firstBlog, secondBlog) => secondBlog.likes - firstBlog.likes)
        .map(blog =>
          <Blog
            key={blog.id}
            blog={blog}
            likeABlog={like}
            removeABlog={remove}
            user={user}
          />
        )}
    </div>
  )
}


Blogs.propTypes = {
//  blogs: PropTypes.array.isRequired,
//  likeABlog: PropTypes.func.isRequired,
//  removeABlog: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
}


export default Blogs