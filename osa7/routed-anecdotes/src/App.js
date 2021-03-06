import React, { useState } from 'react'
import Anecdote from './components/Anecdote'
import About from './components/About'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'
import {
  BrowserRouter as Router,
  Switch, Route, Link,
  useRouteMatch
} from 'react-router-dom'
import { useHistory } from "react-router-dom";
import { useField } from './hooks'

const Menu = () => {
  const padding = {
    paddingRight: 5
  }
  return (
    <div>
      <Link style={padding} to="/">anecdotes</Link>
      <Link style={padding} to="/create">create new</Link>
      <Link style={padding} to="/about">about</Link>
    </div>
  )
}

const Footer = () => (
  <div>
    Anecdote app for <a href='https://courses.helsinki.fi/fi/tkt21009'>Full Stack -websovelluskehitys</a>.

    See <a href='https://github.com/fullstack-hy/routed-anecdotes/blob/master/src/App.js'>https://github.com/fullstack-hy2019/routed-anecdotes/blob/master/src/App.js</a> for the source code.
  </div>
)

const CreateNew = (props) => {
  const content = useField('text')
  const author = useField('text')
  const info = useField('text')
  const history = useHistory()

  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0
    })
    history.push(`/`)
  }

  const resetFields = (e) => {
    e.preventDefault()
    content.reset()
    author.reset()
    info.reset()
  }

  const clearResetField = (data) => {
    const newData = Object.assign({}, data)
    delete newData.reset
    return newData
  }

  const modContent = clearResetField(content)
  const modAuthor = clearResetField(author)
  const modInfo = clearResetField(info)

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...modContent}/>
        </div>
        <div>
          author
          <input {...modAuthor}/>
        </div>
        <div>
          url for more info
          <input {...modInfo}/>
        </div>
        <button>create</button>
        <button onClick={resetFields}>reset</button>
      </form>
    </div>
  )

}

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: '1'
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: '2'
    }
  ])

  const [notification, setNotification] = useState(null)

  const addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    setAnecdotes(anecdotes.concat(anecdote))
    setNotification(`a new anecdote ${anecdote.content} created!`)
    setTimeout(() => {
      setNotification(null)
    },  10000)
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  const match = useRouteMatch('/anecdotes/:id')
  //console.log(match)
  //console.log(match.params)
  const anecdoteToShow = match
    ? anecdotes.find(anecdote => anecdote.id === match.params.id)
    : null

  //console.log(anecdoteToShow)

  return (
    <div>
      <h1>Software anecdotes</h1>
      <Menu />
      <Notification notification={notification}/>
      <Switch>
        <Route path="/anecdotes/:id">
          <Anecdote anecdote={anecdoteToShow} />
        </Route>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/create"> 
          <CreateNew addNew={addNew} />
        </Route>
        <Route path="/">        
          <AnecdoteList anecdotes={anecdotes} />
        </Route>  
      </Switch>
      <Footer />
    </div>
  )
}

export default App;