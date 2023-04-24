import { CoursePart } from "../Types"

interface PartProps {
    part: CoursePart,
}

const Part = (props: PartProps) => {
    switch(props.part.kind) {
        case ('background'):
            return (
                <div>
                    <h2><strong>{props.part.name} {props.part.exerciseCount}</strong></h2>
                    <p>{props.part.description}</p>
                    <p>{props.part.backgroundMaterial}</p>
                </div>
            )
        case ('group'):
            return (
                <div>
                    <h2><strong>{props.part.name} {props.part.exerciseCount}</strong></h2>
                    <p>Group Exercises: {props.part.groupProjectCount}</p>
                </div>
            )
        case ('basic'):
            return (
                <div>
                    <h2><strong>{props.part.name} {props.part.exerciseCount}</strong></h2>
                    <p>{props.part.description}</p>
                </div>
            )
        case ('special'):
            return (
                <div>
                    <h2><strong>{props.part.name} {props.part.exerciseCount}</strong></h2>
                    <p>{props.part.description}</p>
                    <p>Required Skills: {props.part.requirements.join(', ')}</p>
                </div>
            )
        default: return null
    }
}

export default Part