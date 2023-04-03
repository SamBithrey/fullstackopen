import { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const setToGood = (g) => {setGood(g)}
  const setToBad = (b) => {setBad(b)}
  const setToNeutral = (n) => {setNeutral(n)}

  const total = good + neutral + bad
  const average = ((good-bad)/total*100).toFixed(2) + '%'
  const positive = (good/total*100).toFixed(2) + '%'

  return (
    <div>
      <h1>Give Feedback</h1>
      <Button text='good' handleClick={() => setToGood(good+1)}/>
      <Button text='bad' handleClick={() => setToBad(bad+1)}/>
      <Button text='neutral' handleClick={() => setToNeutral(neutral+1)}/>
      <h1>Statistics</h1>
      <Statistics good={good} bad={bad} neutral={neutral} total={total} average={average} positive={positive}/>
    </div>
  )
}

const Button = ({ text, handleClick}) => {
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )
}

const Statistics = ({good, bad, neutral, total, average, positive}) => {
  if(!total) {
    return(
      <p>No feedback Given</p>
    )
  }
  return (
    <table>
      <tbody>
        <StatisticsLine text='Good' number={good}/>
        <StatisticsLine text='Bad' number={bad}/>
        <StatisticsLine text='Neutral' number={neutral}/>
        <StatisticsLine text='Total' number={total}/>
        <StatisticsLine text='Average' number={average}/>
        <StatisticsLine text='Positive' number={positive}/>
      </tbody>
    </table>
  )
}

const StatisticsLine = ({text, number}) => {
  return (
    <tr>
      <td>{text} Feedback</td>
      <td/>
      <td>{number}</td>
    </tr>
  )
}

export default App