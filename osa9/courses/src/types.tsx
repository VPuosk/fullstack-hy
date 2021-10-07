export interface CourseData {
  name: string;
  exerciseCount: number;
}

export interface CourseProps {
  courses: CourseData[];
}

export interface HeaderProps {
  name: string;
}