import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Phonebook from './components/Phonebook'
import Lisääjä from './components/Lisääjä'

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
      axios
        .post(`http://localhost:3001/persons`, personObj)
        .then(response => {
          console.log(response)
          setPersons(persons.concat(response.data))
          setNewName('')
          setNewNumber('')
        })
      //setPersons(persons.concat(personObj))
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
      <Lisääjä
        handler={tapahtumanKäsittelijä}
        nimi={newName}
        numero={newNumber}
        nimihandler={muutoksenKäsittelijäNimi}
        numerohandler={muutoksenKäsittelijäNumero}
      />
      <h2>Numbers</h2>
      <Phonebook
        persons={persons}
        filter={filterer}
      />
    </div>
  )
}

export default App