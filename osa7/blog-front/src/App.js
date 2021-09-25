import React, { useState, useEffect, useRef } from 'react'

import blogService from './services/blogs'
import loginService from './services/login'
import './index.css'
//components...
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Toggleable from './components/Toggleable'
import Blogs from './components/Blogs'
//
import { setRedNotification } from './reducers/notificationReducer'
import { setGreenNotification } from './reducers/notificationReducer'
import { initBlogs } from './reducers/blogReducer'

import { useDispatch } from 'react-redux'


const App = () => {
  const [user, setUser] = useState(null)

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
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogout = async (event) => {
    event.preventDefault()

    window.localStorage.removeItem('loggedBlogger')
    blogService.setToken(null)
    setUser(null)
  }

  const handleLogin = async (userObj) => {

    try {
      const user = await loginService.login(userObj)

      window.localStorage.setItem(
        'loggedBlogger', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      dispatch(setGreenNotification( 'Note: Logging in successful', 3 ))
    } catch (exception) {
      console.log('Bad credentials')
      dispatch(setRedNotification( 'Error: Wrong credentials', 3 ))
    }
  }

  const loginForm = () => {
    return (
      <div>
        <LoginForm
          handleLogin={handleLogin}
        />
      </div>
    )
  }

  const blogForm = () => {
    return (
      <div>
        <Toggleable buttonLabel='Create a new blog' ref={blogFormRef}>
          <BlogForm />
        </Toggleable>
      </div>
    )
  }

  if (user === null) {
    return (
      <div>
        <Notification />
        <h2>Login</h2>
        {loginForm()}
      </div>
    )
  }

  return (
    <div>
      <Notification />
      <h4>Logged in user: {user.name}</h4>
      <form onClick={handleLogout}>
        <button type="submit">Logout</button>
      </form>
      <h2>Blogs</h2>
      <Blogs
        user={user}
      />
      <h3>Post a new blog</h3>
      {blogForm()}
    </div>
  )
}

export default App