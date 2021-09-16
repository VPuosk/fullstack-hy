import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'

import blogService from './services/blogs'
import loginService from './services/login'
import './index.css'
//components...
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Toggleable from './components/Toggleable'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
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

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)

    try {
      const user = await loginService.login({
        username,
        password,
      })

      window.localStorage.setItem(
        'loggedBlogger', JSON.stringify(user)
      )
      
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      setErrorMessage( 'Note: Logging in successful' )
      setTimeout(() => {
        setErrorMessage(null)
      }, 2500)
    } catch (exception) {
      console.log('Bad credentials')
      setErrorMessage( 'Error: Wrong credentials' )
      setTimeout(() => {
        setErrorMessage(null)
      }, 2500)
    }
  }

  const handleBlogCreate = async (blogObj) => {
    blogFormRef.current.toggleShownStatus()

    const response = await blogService.createNew(blogObj)

    setBlogs(blogs.concat(response))
    setErrorMessage( `Note: Added a new blog:\n${response.title} by ${response.author}` )
    setTimeout(() => {
      setErrorMessage(null)
    }, 2500)
  }

  const loginForm = () => {
    return (
      <div>
        <LoginForm
          handleLogin={handleLogin}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          username={username}
          password={password}
        />
      </div>
    )
  }

  const blogForm = () => {
    return (
      <div>
        <Toggleable buttonLabel='Create a new blog' ref={blogFormRef}>
          <BlogForm
            createBlogPost={handleBlogCreate}
          />
        </Toggleable>
      </div>
    )
  }

  if (user === null) {
    return (
      <div>
        <Notification notification={errorMessage} />
        <h2>Login</h2>
        {loginForm()}
      </div>
    )
  }

  return (
    <div>
      <Notification notification={errorMessage} />
      <h4>Logged in user: {user.name}</h4>
      <form onClick={handleLogout}>
        <button type="submit">Logout</button>
      </form>
      <h2>Blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
      <h3>Post a new blog</h3>
      {blogForm()}
    </div>
  )
}

export default App