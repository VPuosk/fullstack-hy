import React, { useState, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

const Toggleable = React.forwardRef((props, ref) => {
  const [shownStatus, setShownStatus] = useState(false)

  const hideWhenVisible  = { display: shownStatus ? 'none' : '' }
  const showWhenVisible = { display: shownStatus ? '' : 'none' }

  const toggleShownStatus = () => {
    setShownStatus(!shownStatus)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleShownStatus
    }
  })

  return (
    <div>
      <div style={hideWhenVisible} className="defaultContent">
        <button onClick={toggleShownStatus} id='toggle'>{props.buttonLabel}</button>
      </div>
      <div style={showWhenVisible} className="togglableContent">
        {props.children}
        <button onClick={toggleShownStatus}>Cancel</button>
      </div>
    </div>
  )
})

Toggleable.propTypes = {
  children: PropTypes.node.isRequired,
  buttonLabel: PropTypes.string.isRequired
}

Toggleable.displayName = 'Toggleable'

export default Toggleable