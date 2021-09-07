import React, { useState, useEffect } from 'react'
import axios from 'axios'

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

const HakuPäivitin = (props) => {
  return (
    <>
      <form>
        {props.name} <input
                    value = {props.value}
                    onChange = {props.function}
                  />
      </form>
    </>
  )
}

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

const LisäysKenttä = (props) => {
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

  useEffect(() => {
    //console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        //console.log('done')
        //console.log(response.data)
        setPersons(response.data)
      })
  }, [] )
  //console.log('render', persons.length, 'persons')

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
      <HakuPäivitin
        name='Contains: '
        value={filterer}
        function={muutoksenKäsittelijäHaku}
      />
      <h2>Phonebook</h2>
      <LisäysKenttä
        handler={tapahtumanKäsittelijä}
        nimi={newName}
        numero={newNumber}
        nimihandler={muutoksenKäsittelijäNimi}
        numerohandler={muutoksenKäsittelijäNumero}
      />
      <h2>Numbers</h2>
      <Numerot numerot={persons.filter(person => person.name.toUpperCase().includes(filterer.toUpperCase()))} />
    </div>
  )

}

export default App