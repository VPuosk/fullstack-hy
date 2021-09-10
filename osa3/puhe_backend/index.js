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
  Person.estimatedDocumentCount()
    .then(response => {
      //console.log(response)
      vastaus.send(
        `<div>
          <p>Phonebook has info for ${response} people</p>
          <p>${aika}</p>
        </div>`
      )
    })
})

app.get('/api/persons/:id', (request, response, next) => {
  //const id = Number(request.params.id)
  //console.log('check -1: ', request.params.id)
  Person.findById(request.params.id)
    .then(person => {
      if(person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => {
      //console.log(error.name)
      next(error)
    })
  /*const person = persons.find(person => person.id === id)

  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
  */
})

app.post('/api/persons', (pyynto, vastaus, next) => {
  const runko = pyynto.body

  //console.log(pyynto)
  //console.log(runko)

  if (!runko.name) {
    throw new Error('NoName')
  }

  if (!runko.number) {
    throw new Error('NoNumber')
  }

  const person = new Person({
    name: runko.name,
    number: runko.number,
    id: getNewID(),
  })

  person.save().then(result => {
    //console.log(result)
    //mongoose.connection.close()
    vastaus.json(result)
  })

  //persons = persons.concat(person)

  //vastaus.json(person)
})

app.delete('/api/persons/:id', (pyynto, vastaus, next) => {
  Person.findByIdAndRemove(pyynto.params.id)
    .then(result => {
      vastaus.status(204).end()
    })
    .catch(error => next(error))
  /*
  const id = Number(pyynto.params.id)
  console.log(id)
  persons = persons.filter(person => person.id !== id)

  vastaus.status(204).end()
  */
})

app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body

  const person = {
    name: body.name,
    number: body.number,
  }

  Person.findByIdAndUpdate(request.params.id, person, { new: true })
    .then(updatedPerson => {
      response.json(updatedPerson)
    })
    .catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

// olemattomien osoitteiden käsittely
app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)
  //console.log(error)

  if (error.name === 'CastError') {
    return response.status(400).send( { error: 'malformatted id'})
  }

  if (error.message === 'NoName') {
    return response.status(400).send( { error: 'Name is missing'})
  }

  if (error.message === 'NoNumber') {
    return response.status(400).send( { error: 'Number is missing'})
  }

  if (error.message === 'UniqueNamesOnly') {
    return response.status(400).send( { error: 'Only unique names are allows'})
  }

  next(error)
}

app.use(errorHandler)

const port = process.env.PORT || 3001
app.listen(port)
console.log(`Server running on port ${port}`)