import React from 'react'

const Part = (props) => {
  return (
    <>
      <p>
        {props.part} {props.num}
      </p>
    </>
  )
}

const Header = (props) => {
  return (
    <>
      <h1>{props.course}</h1>
    </>
  )
}

const Content = (props) => {
  return (
    <div>
      <Part part={props.part1} num={props.num1} />
      <Part part={props.part2} num={props.num2} />
      <Part part={props.part3} num={props.num3} />
    </div>
  )
}

const Total = (props) => {
  return (
    <>
      <p>
        Number of exercises {props.number}
      </p>
    </>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header course={course} />
      <Content part1={part1} part2={part2} part3={part3} num1={exercises1} num2={exercises2} num3={exercises3} />
      <Total number={exercises1 + exercises2 + exercises3} />
    </div>
  )
}

export default App