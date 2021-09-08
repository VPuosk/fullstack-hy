import React from 'react'

// yksittäisen numeron käsittelijä
const Numero = ({ numero }) => {
    return (
        <div>
            {numero.name} {numero.number}
        </div>
    )
}
  
// kaikkien numeroiden käsittelijä
const Numerot = ({ numerot }) => {
    return (
        <div>
            {numerot.map(numero => 
                <Numero key={numero.name} numero={numero} />
            )}
        </div>
    )
}

const Phonebook = ({ persons, filter }) => {
    return (
        <>
            <Numerot numerot={persons.filter(person => person.name.toUpperCase().includes(filter.toUpperCase()))} />
        </>
    )
}

export default Phonebook