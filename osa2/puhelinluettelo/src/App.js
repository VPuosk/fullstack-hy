import React, { useState, useEffect } from 'react'
//import axios from 'axios'
import Phonebook from './components/Phonebook'
import Lisääjä from './components/Lisääjä'
import Ilmoitus from './components/Ilmoitus'
import phonebookService from './services/puhelin'
import './index.css'

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
  const [ virheIlmoitus, asetaVirheIlmoitus] = useState(null)

  useEffect(() => {
    //console.log('effect')
    phonebookService
      .getAll()
      .then(response => {
        //console.log('done')
        //console.log(response.data)
        setPersons(response)
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
      //alert(`${newName} is already added to phonebook`)
      //console.log('tuplaus')
      if (window.confirm(`${newName} is already added to phonebook, replace the old number?`)) {
        const personObj = persons.find(person => person.name === newName)
        const personObjAlt = {...personObj, number: newNumber}

        phonebookService
          .update(personObj.id, personObjAlt)
          .then(response => {
            setPersons(persons.map(person => person.id !== personObj.id ? person : response))
            asetaVirheIlmoitus(
              `Success: Number of ${response.name} has been changed`
            )
            setTimeout(() => {
              asetaVirheIlmoitus(null)
            }, 3000)
          })
          .catch(error => {
            asetaVirheIlmoitus(
              `Error: ${newName} had already been removed`
            )
            setTimeout(() => {
              asetaVirheIlmoitus(null)
            }, 3000)
            setPersons(persons.filter(person => person.name !== newName))
          })
      }
    } else {
      // tehdään uusi henkilö/numero 'olio'
      const personObj = {
        name : newName,
        number : newNumber,
      }
      phonebookService
        .create(personObj)
        .then(response => {
          //console.log(response)
          setPersons(persons.concat(response))
          setNewName('')
          setNewNumber('')
          asetaVirheIlmoitus(
            `Success: ${personObj.name} has been added`
          )
          
          setTimeout(() => {
            asetaVirheIlmoitus(null)
          }, 3000)
        })
        .catch(error => {
          asetaVirheIlmoitus(
            `Error: ${personObj.name} has not been added`
          )
          setTimeout(() => {
            asetaVirheIlmoitus(null)
          }, 3000)
        })
      //setPersons(persons.concat(personObj))
    }
  }

  const numeronPoistaja = (id, nimi) => {
    //console.log(`POISTAJA: ${id}`)
    if (window.confirm(`Delete ${nimi}?`)) {
      phonebookService
        .removeNumber(id)
      //console.log(persons)
      //console.log(persons.filter(person => person.id !== id))
      setPersons(persons.filter(person => person.id !== id))
      asetaVirheIlmoitus(
        `Success: ${nimi} has been removed`
      )
      setTimeout(() => {
        asetaVirheIlmoitus(null)
      }, 3000)
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
      <h1>Phonebook</h1>
      <Ilmoitus message={virheIlmoitus} />
      <h2>Search by name</h2>
      <HakuPäivitin
        name='Contains: '
        value={filterer}
        function={muutoksenKäsittelijäHaku}
      />
      <h2>Add or update information</h2>
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
        poistaNumeroID = {numeronPoistaja}
      />
    </div>
  )
}

export default App