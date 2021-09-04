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
      <Part part={props.parts[0].name} num={props.parts[0].exercises} />
      <Part part={props.parts[1].name} num={props.parts[1].exercises} />
      <Part part={props.parts[2].name} num={props.parts[2].exercises} />
    </div>
  )
}

const Total = (props) => {
  let num = 0

  props.parts.forEach(part => {
    num = num + part.exercises
  });

  return (
    <>
      <p>
        Number of exercises {num}
      </p>
    </>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]

  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  )
}

export default App