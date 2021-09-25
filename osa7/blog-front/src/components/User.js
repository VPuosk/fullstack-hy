import React from 'react'
import { useRouteMatch } from 'react-router'
import { useSelector } from 'react-redux'

const User = () => {
  const match = useRouteMatch('/users/:id')
  const user = useSelector(state => state.users.find(user => user.id === match.params.id))
  //const user
  if (!user) {
    return null
  }

  return(
    <div>
      <h3>{user.name}</h3>
      <h4>Added blogs:</h4>
      <ul>
        {user.blogs.map(blog =>
          <li key={blog.id}>
            {blog.title}
          </li>
        )}
      </ul>
    </div>
  )
}

export default User