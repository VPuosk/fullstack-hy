import React, { useState, useEffect } from 'react'
import axios from 'axios'

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

const MaaUsea = ({ maa, suodatin }) => {
  return (
    <div>
      {maa.name}
      <button onClick={() => suodatin(maa.name)}>Show</button>
    </div>
  )
}

const Kieli = ({ kieli }) => {
  return (
    <div>
      {kieli.name}
    </div>
  )
}

const Sää = ({ maa }) => {

  const [ tila, setTila ] = useState({
    "current": {
      "temperature": 0,
      "wind_speed": 0,
      "wind_dir": "?",
      "weather_icons": [
        "https://assets.weatherstack.com/images/wsymbols01_png_64/wsymbol_0001_sunny.png"
      ]
    }
  })

  const api_key = process.env.REACT_APP_API_KEY
  const paikka = maa.capital
  const alue = maa.name

  useEffect(() => {
    //console.log('effect')
    
    axios
      .get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${paikka},${alue}&units=m`)
      .then(response => {
        //console.log('done')
        //console.log(response.data)
        if (response.data.hasOwnProperty('success')) {
          // virheilmoituksen etsimiseen...
          console.log(response.data)
        } else {
          setTila(response.data)
        }
      })
  }, [alue, api_key, paikka] )
  
  return (
    <div>
      <h3>Weather in {maa.capital}</h3>
      <div><b>Temperature:</b> {tila.current.temperature}</div>
      <img src={tila.current.weather_icons[0]} alt="sää" height="40" border="2px solid"/>
      <div><b>Wind:</b> {tila.current.wind_speed} from {tila.current.wind_dir}</div>
    </div>
  )
}

const MaaYksi = ({ tila, maa }) => {
  return (
    <div>
      <h2>{maa.name}</h2>
      <div>Capital: {maa.capital}</div>
      <div>Population: {maa.population}</div>
      <h3>Languages:</h3>
      {maa.languages.map(kieli =>
        <Kieli key={kieli.name} kieli={kieli} />
      )}
      <img src={maa.flag} alt="flag" height="120" border="2px solid"/>
      <Sää maa={maa} />
    </div>
  )
}

const MaaLista = ({ maat, suodatin }) => {
  if (maat.length > 10) {
    return (
      <div>
        Too many matches...
      </div>
    )
  }

  if (maat.length > 1) {
    return (
      <div>
        {maat.map(maa => 
          <MaaUsea key={maa.name} maa={maa} suodatin={suodatin} />
        )}
      </div>
    )
  }

  if (maat.length === 1) {
    return (
      <div>
        <MaaYksi maa={maat[0]} />
      </div>
    )
  }

  return (
    <div>
        No countries found!
    </div>
  )
}

const App = () => {
  const [ countries, setCountries] = useState([])
  const [ filterer, setFilterer ] = useState('')

  useEffect(() => {
    //console.log('effect')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        //console.log('done')
        //console.log(response.data)
        setCountries(response.data)
      })
  }, [] )
  //console.log('render', countries.length, 'persons')

  const muutoksenKäsittelijäHaku = (muutos) => {
    setFilterer(muutos.target.value)
  }

  return (
    <div>
      <HakuPäivitin
        name='Find countries: '
        value={filterer}
        function={muutoksenKäsittelijäHaku}
      />
      <MaaLista
        suodatin={setFilterer}
        maat={countries
          .filter(country => country
                                  .name
                                  .toUpperCase()
                                  .includes(filterer.toUpperCase()))} />
    </div>
  )

}

export default App