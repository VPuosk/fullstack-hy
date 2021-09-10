require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static('build'))
app.use(morgan(function (tokens, req, res) {
  if (tokens.method(req,res) == "POST") {
    const data = JSON.stringify(req.body)
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, 'content-length'), '-',
      tokens['response-time'](req, res), 'ms',
      data
    ].join(' ')
  }
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms'
  ].join(' ')
}))

let persons = [
  {
    "name": "Arto Hellas",
    "number": "040-123456",
    "id": 1
  },
  {
    "name": "Ada Lovelace",
    "number": "39-44-5323523",
    "id": 2
  },
  {
    "name": "Dan Abramov",
    "number": "12-43-234345",
    "id": 3
  },
  {
    "name": "Mary Poppendieck",
    "number": "39-23-6423122",
    "id": 4
  }
]

const getNewID = () => {
  const varatut = persons.map(person => Number(person.id))
  let rnd = Math.floor(Math.random()*100000) + 1
  while (varatut.includes(rnd)) {
    rnd = Math.floor(Math.random()*100000)+1
  }
  return rnd
}

app.get('/', (req, res) => {
  res.send('<h3>Phonebook backend</h3>')
})

app.get('/api/persons', (req, res) => {
  Person.find({}).then(persons => {
    res.json(persons)
  })
  //res.json(persons)
})

app.get('/info', (pyynto, vastaus) => {
  const aika = new Date()
  vastaus.send(
    `<div>
      <p>Phonebook has info for ${persons.length} people</p>
      <p>${aika}</p>
    </div>`
  )
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id)

  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

app.post('/api/persons', (pyynto, vastaus) => {
  const runko = pyynto.body

  //console.log(pyynto)
  //console.log(runko)

  if (!runko.name) {
    return vastaus.status(400).json({ 
      error: 'name missing' 
    })
  }

  if (!runko.number) {
    return vastaus.status(400).json({ 
      error: 'number missing' 
    })
  }

  if ((persons.map(person => person.name)).includes(runko.name)) {
    return vastaus.status(400).json({ 
      error: 'name must be unique' 
    })
  }

  const person = {
    name: runko.name,
    number: runko.number,
    id: getNewID(),
  }

  persons = persons.concat(person)

  vastaus.json(person)
})

app.delete('/api/persons/:id', (pyynto, vastaus) => {
  const id = Number(pyynto.params.id)
  console.log(id)
  persons = persons.filter(person => person.id !== id)

  vastaus.status(204).end()
})

const port = process.env.PORT || 3001
app.listen(port)
console.log(`Server running on port ${port}`)