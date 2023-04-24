import { CourseParts } from "../Types"

const Content = (props: CourseParts) => {
    return (
        <div>
            {props.content.map((content, i) => 
                <p key={i}>{content.name} {content.exerciseCount}</p>
            )}
        </div>
    )
}

export default Content