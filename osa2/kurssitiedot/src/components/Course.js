import React from 'react'

const Part = ({ part }) => {
    return (
      <>
        <p>
          {part.name} {part.exercises}
        </p>
      </>
    )
  }
  
const Header = ({ name }) => {
  return (
    <>
      <h2>{name}</h2>
    </>
  )
}
  
const Content = ({ parts }) => {
  return (
    <div>
      {parts.map(part => 
        <Part key={part.id} part={part} />
      )}
    </div>
  )
}
  
const Total = ({ parts }) => {
  
  //console.log(parts)
  
  let nro = parts.reduce(function(sum, part) {
    return sum + part.exercises
  }, 0)
  
  //console.log(nro)
  
  return (
    <>
      <p>
        <b>Total of {nro} exercises</b>
      </p>
    </>
  )
}
  
const Course = ({ course }) => {
  //const course = props.course
  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )  
}

export default Course