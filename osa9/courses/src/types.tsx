export interface CourseData {
  name: string;
  exerciseCount: number;
}

export interface CourseProps {
  courses: CoursePart[];
}

export interface HeaderProps {
  name: string;
}

interface CoursePartBase {
  name: string;
  exerciseCount: number;
  type: string;
}

interface CourseDescriptivePart extends CoursePartBase {
  description: string;
}

interface CourseNormalPart extends CourseDescriptivePart {
  type: "normal";
}

interface CourseProjectPart extends CoursePartBase {
  type: "groupProject";
  groupProjectCount: number;
}

interface CourseSubmissionPart extends CourseDescriptivePart {
  type: "submission";
  exerciseSubmissionLink: string;
}

interface CourseSpecialPart extends CourseDescriptivePart {
  type: "special";
  requirements: string[];
}

export type CoursePart =
  CourseNormalPart |
  CourseProjectPart |
  CourseSubmissionPart |
  CourseSpecialPart;