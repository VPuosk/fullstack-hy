import React, { useState } from 'react'

// yksittäisen numeron käsittelijä
const Numero = ({ numero }) => {
  return (
    <div>
      {numero.name}
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
    { name: 'Arto Hellas' }
  ]) 
  const [ newName, setNewName ] = useState('')

  // mikä käsittelee 'onSubmit' tapahtumaa
  const tapahtumankäsittelijä = (tapahtuma) => {
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
      }
      setPersons(persons.concat(personObj))
    }
  }

  // mikä käsittelee 'onChange' muutosta
  const muutoksenkäsittelijä = (muutos) => {
    //console.log(tapahtuma.target.value)
    setNewName(muutos.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={tapahtumankäsittelijä}>
        <div>
          name: <input
                  value = {newName}
                  onChange = {muutoksenkäsittelijä}
                />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <Numerot numerot={persons} />
    </div>
  )

}

export default App