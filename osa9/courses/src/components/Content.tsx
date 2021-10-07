import React from "react";
import { CourseProps } from "../types";

const Content = ( props : CourseProps ) => {
  return (
    <div>
      {props.courses.map(course => 
        <p key={course.name}>
          {course.name} {course.exerciseCount}
        </p>
      )}
    </div>
  );
};

export default Content;