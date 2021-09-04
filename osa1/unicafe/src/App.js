import React, { useState } from 'react'

const Statistics = ({good, neutral, bad}) => {
  return (
    <div>
      good {good}<br />
      neutral {neutral}<br />
      bad {bad} <br />
      all {good + neutral + bad} <br />
      average {(good - bad) / (good + neutral + bad)} <br />
      positive {100 * good / (good + neutral + bad)} %
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
        <button onClick={() => setGood(good + 1)}>
          good
        </button>
        <button onClick={() => setNeutral(neutral + 1)}>
          neutral
        </button>
        <button onClick={() => setBad(bad + 1)}>
          bad
        </button>
      </div>
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App