import React from "react";
import { CourseProps } from "../types";
import Part from "./Part";

const Content = ( props : CourseProps ) => {
  return (
    <div>
      {props.courses.map(course => 
        <Part key={course.name} course={course} />
      )}
    </div>
  );
};

export default Content;