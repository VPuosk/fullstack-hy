import React from "react";
import { CourseProps } from "../types";

const Total = ( props : CourseProps ) => {
  return (
    <p>
      Number of exercises{" "}
      {props.courses.reduce((carry, part) => carry + part.exerciseCount, 0)}
    </p>
  );
};

export default Total;