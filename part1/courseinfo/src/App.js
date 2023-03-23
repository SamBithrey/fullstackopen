const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {name: 'Fundamentals of React', exercises: 10},
      {name: 'Using props to pass data', exercises: 7},
      {name: 'State of a component', exercises:14},
    ]
  }

  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts}/>
      <Total parts={course.parts}/>
    </div>
  )
};

const Header = (props) => {
  // console.log({props})
  return (
    <h1>{props.name}</h1>
  );
}

function Content(props) {
  // console.log(props)
  return (
    <div>
      <Part part={props.parts[0]} />
      <Part part={props.parts[1]} />
      <Part part={props.parts[2]} />
    </div>
  );
}

const Part = (props) => {
  // console.log(props)
  return (
    <>
      <h2>{props.part.name}</h2>
      <p>There are {props.part.exercises} exercises in this part</p>
    </>
  )
}

const Total = (props) => {
  // console.log(props)
  let total = props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises;
  return (
    <p>Number of exercises {total}</p>
  );
};

export default App