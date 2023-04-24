import { CourseParts } from "../Types"
  
const Total = (props: CourseParts) => {
    return (
        <p>
        Number of exercises{" "}
        {props.content.reduce((carry, part) => carry + part.exerciseCount, 0)}
        </p>
    )
}
  
  export default Total