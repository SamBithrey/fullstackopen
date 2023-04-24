import { CoursePart } from "../Types"
interface TotalProps {
    courses: CoursePart[]
}
  
const Total = (props: TotalProps) => {
    const total = props.courses.reduce((carry, part) => carry + part.exerciseCount, 0);

    return (
        <h3>Number of exercises: {total}</h3>
    )
}
  
  export default Total