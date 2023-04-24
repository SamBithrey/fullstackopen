export interface HeaderProps {
    name: string;
}

export interface CoursePartBase {
    name: string;
    exerciseCount: number;
}

export interface CoursePartDescription extends CoursePartBase {
    name: string;
    exerciseCount: number;
    description?: string;
}

export interface CoursePartBasic extends CoursePartDescription {
    description?: string;
    kind: "basic"
}
  
export interface CoursePartGroup extends CoursePartBase {
    groupProjectCount: number;
    kind: "group"
}
  
export interface CoursePartBackground extends CoursePartDescription {
    description?: string;
    backgroundMaterial: string;
    kind: "background"
}

export interface CoursePartSpecial extends CoursePartDescription {
    description?: string;
    requirements: string[];
    kind: "special"
}
  
export type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground | CoursePartSpecial;

export type Courses = CoursePart[];