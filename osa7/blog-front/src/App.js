import React, { useEffect, useRef } from 'react'

//import blogService from './services/blogs'
//import loginService from './services/login'
import './index.css'
//components...
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Toggleable from './components/Toggleable'
import Blogs from './components/Blogs'
import LoggedOn from './components/LoggedOn'
//
import { userSet } from './reducers/userReducer'
import { initBlogs } from './reducers/blogReducer'

import { useDispatch, useSelector } from 'react-redux'

const App = () => {
  const currentUser = useSelector(state => state.user)

  const blogFormRef = useRef()

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initBlogs())
  }, [])

  useEffect(() => {
    const loggedBloggerJSON = window
      .localStorage
      .getItem('loggedBlogger')
    if (loggedBloggerJSON) {
      const user = JSON.parse(loggedBloggerJSON)
      dispatch(userSet(user))
    }
  }, [])

  const blogForm = () => {
    return (
      <div>
        <Toggleable buttonLabel='Create a new blog' ref={blogFormRef}>
          <BlogForm />
        </Toggleable>
      </div>
    )
  }

  if (currentUser === null) {
    return (
      <div>
        <Notification />
        <h2>Login</h2>
        <LoginForm />
      </div>
    )
  }

  return (
    <div>
      <Notification />
      <LoggedOn />
      <h2>Blogs</h2>
      <Blogs
        user={currentUser}
      />
      <h3>Post a new blog</h3>
      {blogForm()}
    </div>
  )
}

export default App