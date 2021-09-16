import React from 'react'

const Notification = ({ notification }) => {
  if (notification === null) {
    return (
      <div className="noNotifications"></div>
    )
  }

  console.log(notification.substring(0,5))

  if ( notification.substring(0,5) === 'Note:' ) {
    return (
      <div className="success">
        {notification.substring(6)}
      </div>
    )
  } else {
    return (
      <div className="error">
        {notification.substring(7)}
      </div>
    )
  }
}

export default Notification