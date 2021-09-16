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
      <div style={hideWhenVisible}>
        <button onClick={toggleShownStatus}>{props.buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button onClick={toggleShownStatus}>Cancel</button>
      </div>
    </div>
  )
})

Toggleable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}

export default Toggleable