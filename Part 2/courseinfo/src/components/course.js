const Course = ({course}) => {
  return (
    <div>
      <h2>{course.name}</h2>
      {course.parts.map((part) => (
        <Part key={part.id} part={part} />
      ))}
      <Total key={course.id} parts={course.parts}/>
    </div>
  )
}

const Part = ({part}) => {
  return (
    <ul>
      <li>{part.name}</li>
      <li>Number of exercises: {part.exercises}</li>
    </ul>
  )
}

const Total = ({parts}) => {
  const total = parts.reduce((totalExercises, part) => totalExercises + part.exercises, 0)
  return (
    <h3>There is a total of {total} exercises</h3>
  )
}

export default Course