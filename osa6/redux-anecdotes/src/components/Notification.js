
import React from 'react'
import { connect } from 'react-redux'

const Notification = (props) => {

  const anecdoteToShow = () => {
    if (props.notifications === null) {
      return null
    }

    return (
      <div style={style}>
        {props.notifications.content}
      </div>
    )
  }

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  return (
    anecdoteToShow()
  )
}

const mapStateToProps = (state) => {
  return {
    notifications: state.notifications
  }
}

const ConnectedNotification = connect(mapStateToProps)(Notification)

export default ConnectedNotification