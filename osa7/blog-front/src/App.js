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
import Blog from './components/Blog'
import LoggedOn from './components/LoggedOn'
//
import { userSet } from './reducers/loginReducer'
import { initBlogs } from './reducers/blogReducer'

import { useDispatch, useSelector } from 'react-redux'

import { Switch, Route } from 'react-router-dom'
import Users from './components/Users'
import User from './components/User'
import { getUsers } from './reducers/usersReducer'
import { NavigationBar, MainView, StyledLink } from './components/Styles'

const App = () => {
  const currentUser = useSelector(state => state.login)

  const blogFormRef = useRef()

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initBlogs())
  }, [])

  useEffect(() => {
    dispatch(getUsers())
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

  const padding = {
    padding: 5
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

  //const userMatch = useRouteMatch('/user/:id')

  return (
    <MainView>
      <Notification />
      <NavigationBar>
        <StyledLink style={padding} to="/">blogs</StyledLink>
        <StyledLink style={padding} to="/users">users</StyledLink>
        <LoggedOn />
      </NavigationBar>
      <Switch>
        <Route path="/blogs/:id">
          <Blog />
        </Route>
        <Route path="/users/:id">
          <User />
        </Route>
        <Route path="/users">
          <Users />
        </Route>
        <Route path="/">
          <h2>Blogs</h2>
          <Blogs />
          <h3>Post a new blog</h3>
          {blogForm()}
        </Route>
      </Switch>
    </MainView>
  )
}

export default App