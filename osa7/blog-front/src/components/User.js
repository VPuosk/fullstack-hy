import React from 'react'
import PropTypes from 'prop-types'

const User = ({ name, amount }) => {
  return(
    <tr>
      <td>{name}</td>
      <td>{amount}</td>
    </tr>
  )
}

User.propTypes = {
  //  blogs: PropTypes.array.isRequired,
  //  likeABlog: PropTypes.func.isRequired,
  //  removeABlog: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  amount: PropTypes.number.isRequired
}


export default User