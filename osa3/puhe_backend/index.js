const express = require('express')
const app = express()

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

app.get('/', (req, res) => {
  res.send('<h3>Phonebook backend</h3>')
})

app.get('/api/persons', (req, res) => {
  res.json(persons)
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

app.delete('/api/persons/:id', (pyynto, vastaus) => {
  const id = Number(pyynto.params.id)
  console.log(id)
  persons = persons.filter(person => person.id !== id)

  vastaus.status(204).end()
})

const port = 3001
app.listen(port)
console.log(`Server running on port ${port}`)