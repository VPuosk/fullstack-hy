import React, { useState } from 'react'

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

const App = () => {
  const [ persons, setPersons] = useState([
    { 
      name: 'Arto Hellas',
      number: '040-1231244'
    }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filterer, setFilterer ] = useState('')

  // mikä käsittelee 'onSubmit' tapahtumaa
  const tapahtumanKäsittelijä = (tapahtuma) => {
    tapahtuma.preventDefault()
    // console.log('Jottai tapahtusi', tapahtuma.target)
    
    // tuplausta varten tarvitaan nimilista
    const nimilista = persons.map(person => person.name)
    
    // estetään tuplaus
    if (nimilista.includes(newName)) {
      alert(`${newName} is already added to phonebook`)
      //console.log('tuplaus')
    } else {
      // tehdään uusi henkilö/numero 'olio'
      const personObj = {
        name : newName,
        number : newNumber,
      }
      setPersons(persons.concat(personObj))
    }
  }

  // mikä käsittelee 'onChange' muutosta
  const muutoksenKäsittelijäNimi = (muutos) => {
    //console.log(tapahtuma.target.value)
    setNewName(muutos.target.value)
  }

  const muutoksenKäsittelijäNumero = (muutos) => {
    //console.log(tapahtuma.target.value)
    setNewNumber(muutos.target.value)
  }

  const muutoksenKäsittelijäHaku = (muutos) => {
    setFilterer(muutos.target.value)
  }

  return (
    <div>
      <h2>Search by name</h2>
      <form>
        <div>
          Contains: <input
                  value = {filterer}
                  onChange = {muutoksenKäsittelijäHaku}
                />
        </div>
      </form>
      <h2>Phonebook</h2>
      <form onSubmit={tapahtumanKäsittelijä}>
        <div>
          Name: <input
                  value = {newName}
                  onChange = {muutoksenKäsittelijäNimi}
                />
        </div>
        <div>
          Number: <input
                  value = {newNumber}
                  onChange = {muutoksenKäsittelijäNumero}
                />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <Numerot numerot={persons.filter(person => person.name.toUpperCase().includes(filterer.toUpperCase()))} />
    </div>
  )

}

export default App