import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'

import blogService from './services/blogs'
import loginService from './services/login'
import './index.css'
//components...
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [blogTitle, setBlogTitle] = useState('')
  const [blogAuthor, setBlogAuthor] = useState('')
  const [blogURL, setBlogURL] = useState('')
  const [blogFormVisible, setBlogFormVisible] = useState(false)

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
    setBlogTitle('')
    setBlogAuthor('')
    setBlogURL('')
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

  const handleBlogCreate = async (event) => {
    event.preventDefault()

    const blogObj = {
      title: blogTitle,
      author: blogAuthor,
      url: blogURL,
      likes: 0
    }

    const response = await blogService.createNew(blogObj)

    setBlogs(blogs.concat(response))
    setBlogTitle('')
    setBlogAuthor('')
    setBlogURL('')
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
    const hideBlogForm = { display: blogFormVisible ? 'none' : ''}
    const showBlogForm = { display: blogFormVisible ? '' : 'none'}
    return (
      <div>
        <div style={hideBlogForm}>
          <button onClick={() => setBlogFormVisible(true)}>Create new blog</button>
        </div>      
        <div style={showBlogForm}>
          <BlogForm
            handleBlogCreate={handleBlogCreate}
            handleBlogFormVisibility={() => setBlogFormVisible(false)}
            handleBlogTitleChange={({ target }) => setBlogTitle(target.value)}
            handleBlogAuthorChange={({ target }) => setBlogAuthor(target.value)}
            handleBlogURLChange={({ target }) => setBlogURL(target.value)}
            blogTitle={blogTitle}
            blogAuthor={blogAuthor}
            blogURL={blogURL}
          />
          <button onClick={() => setBlogFormVisible(false)}>Cancel</button>
        </div>
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