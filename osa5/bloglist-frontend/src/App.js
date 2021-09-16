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


const App = () => {
  const [blogs, setBlogs] = useState([])
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

  const handleLogin = async (userObj) => {

    try {
      const user = await loginService.login(userObj)

      window.localStorage.setItem(
        'loggedBlogger', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
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

  const handleAddBlogLike = async (id) => {
    const blog = blogs.find(blog => blog.id === id)
    const writer = blog.user
    const newBlog = { ...blog, likes: blog.likes + 1 }

    const response = await blogService.updateExisting(id, newBlog)
    response.user = writer
    setBlogs(blogs.map(blog => blog.id !== id ? blog : response))
    setErrorMessage( `Note: Liked a blog:\n${response.title} by ${response.author}` )
    setTimeout(() => {
      setErrorMessage(null)
    }, 2500)
  }

  const handleRemoveBlog = async (id) => {
    //const blog = blogs.find(blog => blog.id === id)
    await blogService.removeBlog(id)
    setBlogs(blogs.filter(blog => blog.id !== id))
    setErrorMessage( 'Note: Blog removed' )
    setTimeout(() => {
      setErrorMessage(null)
    }, 2500)
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
      <Blogs
        blogs={blogs}
        likeABlog={handleAddBlogLike}
        removeABlog={handleRemoveBlog}
        user={user}
      />
      <h3>Post a new blog</h3>
      {blogForm()}
    </div>
  )
}

export default App