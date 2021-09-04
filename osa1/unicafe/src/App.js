import React, { useState } from 'react'

const Button = ({handle, text}) => {
  return (
    <button onClick={handle}>
      {text}
    </button>
  )
}

const StatisticLine = ({text, value, type}) => {
  return (
    <>
      {text} {value} {type}<br />
    </>
  )
}

const Statistics = ({good, neutral, bad}) => {

  if ((good + neutral + bad) === 0) {
    return (
      <div>
        No feedback given
      </div>
    )
  }

  const sum = good + neutral + bad
  const difference = good - bad

  return (
    <div>
      <StatisticLine text="good" value={good} type="" />
      <StatisticLine text="neutral" value={neutral} type="" />
      <StatisticLine text="bad" value={bad} type="" />
      <StatisticLine text="all" value={sum} type="" />
      <StatisticLine text="average" value={difference / sum} type="" />
      <StatisticLine text="positive" value={100 * good / sum} type="%" />
    </div>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <div>
        <Button handle={() => setGood(good + 1)} text="good" />
        <Button handle={() => setNeutral(neutral + 1)} text="neutral" />
        <Button handle={() => setBad(bad + 1)} text="bad" />
      </div>
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App