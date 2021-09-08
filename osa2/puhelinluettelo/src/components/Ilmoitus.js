import React from 'react'

const Ilmoitus = ({ message }) => {
    //console.log(`ilmoitus: `,message)
    if (message === null) {
      return (
          <div className="noerror"></div>
      )
    }

    if (message.includes("Success") ) {
        return (
            <div className="success">
                {message}
            </div>
        )
    }
  
    return (
      <div className="error">
        {message}
      </div>
    )
  }

export default Ilmoitus