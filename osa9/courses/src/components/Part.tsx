import React from "react";
import { CoursePart } from "../types";

const renderCoursePart = ( course : CoursePart ) => {
  switch (course.type) {
    case 'normal': 
      return (
        <div>
          <h4>{course.name} {course.exerciseCount}</h4>
          <div>{course.description}</div>
        </div>
      );
    case 'submission':
      return (
        <div>
          <h4>{course.name} {course.exerciseCount}</h4>
          <div>{course.description}</div>
          <div>{course.exerciseSubmissionLink}</div>
        </div>
      );
    case 'groupProject':
      return (
        <div>
          <h4>{course.name} {course.exerciseCount}</h4>
          <div>Project exercises {course.groupProjectCount}</div>
        </div>
      );
    case 'special':
      return (
        <div>
          <h4>{course.name} {course.exerciseCount}</h4>
          <div>{course.description}</div>
          <div>required skills: {course.requirements.join(', ')}</div>
        </div>
      );
    default:
      break;
  }
}

const Part = ( {course} : {course: CoursePart}) => {
  return (
    <>
      {renderCoursePart(course)}
    </>
  )
}

export default Part;