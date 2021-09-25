import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Users = () => {
  const users = useSelector(state => state.users)

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user =>
            <tr key={user.id}>
              <th>
                <Link to={`/users/${user.id}`} >
                  {user.name}
                </Link>
              </th>
              <th>{user.blogs.length}</th>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Users