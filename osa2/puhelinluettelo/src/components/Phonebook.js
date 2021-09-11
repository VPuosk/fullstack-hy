/* eslint-disable react/prop-types */
import React from 'react'

// yksittäisen numeron käsittelijä
const Numero = ({ numero, poistaNumero }) => {
  return (
    <div>
      {numero.name} {numero.number}
      <button onClick={poistaNumero}>Delete</button>
    </div>
  )
}

// kaikkien numeroiden käsittelijä
const Numerot = ({ numerot, poistaNumeroID }) => {
  return (
    <div>
      {numerot.map(numero =>
        <Numero
          key={numero.name}
          numero={numero}
          poistaNumero={() => poistaNumeroID(numero.id, numero.name)}
        />
      )}
    </div>
  )
}

const Phonebook = ({ persons, filter, poistaNumeroID }) => {
  return (
    <>
      <Numerot
        numerot={persons.filter(person => person.name.toUpperCase().includes(filter.toUpperCase()))}
        poistaNumeroID = {poistaNumeroID}
      />
    </>
  )
}

export default Phonebook