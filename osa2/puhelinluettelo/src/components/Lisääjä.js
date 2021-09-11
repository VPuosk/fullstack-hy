/* eslint-disable react/prop-types */
import React from 'react'


const KenttäPäivitin = (props) => {
  return (
    <div>
      {props.name} <input
        value = {props.value}
        onChange = {props.function}
      />
    </div>
  )
}

const Lisääjä = (props) => {
  return (
    <>
      <form onSubmit={props.handler}>
        <KenttäPäivitin
          name='Name: '
          value={props.nimi}
          function={props.nimihandler}
        />
        <KenttäPäivitin
          name='Number: '
          value={props.numero}
          function={props.numerohandler}
        />
        <div>
          <button type="submit">Add</button>
        </div>
      </form>
    </>
  )
}

export default Lisääjä