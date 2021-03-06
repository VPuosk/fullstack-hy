import React, { useState } from 'react'

const Button = ({handle, text}) => {
  return (
    <button onClick={handle}>
      {text}
    </button>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))
  const [mostVoted, setMostVoted] = useState(0)

  const newRND = () => {
    let temp = Math.floor(Math.random() * anecdotes.length)
    //console.log(temp)
    return temp
  }

  //console.log(votes)

  const updatedVotes = () => {
    const newVotes = [...votes]
    newVotes[selected] += 1
    if (newVotes[selected] > newVotes[mostVoted]) {
      setMostVoted(selected)
    }
    return newVotes
  }

  //const arry = Array(anecdotes.length).fill(0)

  //console.log(arry)

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]}<br />
      has {votes[selected]} votes
      <div>
        <Button handle={() => setVotes(updatedVotes())} text="Vote" />
        <Button handle={() => setSelected(newRND())} text="Next anecdote" />
      </div>
      
      <h1>Anecdote with most votes</h1>
      {anecdotes[mostVoted]}<br />
      has {votes[mostVoted]} votes
    </div>
  )
}

export default App
