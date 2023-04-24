import Part from "./Part"

import { CoursePart } from "../Types"
interface ContentProps {
    courses: CoursePart[]
}

const Content = (props: ContentProps) => {
    console.log(props)
    return (
        <div>
            {props.courses.map((course, i) => 
                <Part key={i} part={course}/>
            )}
        </div>
    )
}

export default Content