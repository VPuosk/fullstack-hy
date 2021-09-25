import React from 'react'
import { connect } from 'react-redux'

const Notification = ( props ) => {

  const notificationToShow = () => {
    if (props.notification === null) {
      return null
    }

    if (props.notification.type === 'note') {
      return (
        <div className="success">
          {props.notification.content}
        </div>
      )
    } else {
      return (
        <div className="error">
          {props.notification.content}
        </div>
      )
    }
  }
  /*
  if (notification === null) {
    return (
      <div className="noNotifications"></div>
    )
  }

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
  */
  return (
    notificationToShow()
  )
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification
  }
}

const ConnectedNotification = connect(mapStateToProps)(Notification)

export default ConnectedNotification