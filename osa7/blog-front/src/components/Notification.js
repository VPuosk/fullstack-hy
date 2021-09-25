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