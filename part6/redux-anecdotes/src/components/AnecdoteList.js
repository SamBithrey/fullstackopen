import { useDispatch, useSelector } from 'react-redux'
import { voteFor } from '../reducers/anecdoteReducer'

const Anecdote = ({ anecdote, handleClick}) => {
    return (
        <div>
            <div>
            {anecdote.content}
            </div>
            <div>
            has {anecdote.votes}
            <button onClick={handleClick}>vote</button>
            </div>
        </div>
  )
}

const AnecdoteList = () => {
    let anecdotes = useSelector(state => state)
    anecdotes = anecdotes.sort((a, b) => b.votes - a.votes)
    const dispatch = useDispatch()
  
    const vote = (id) => {
      dispatch(voteFor(id))
    }
    
    return (
        <div>
            {anecdotes.map(anecdote => 
                <Anecdote
                    key={anecdote.id}
                    anecdote={anecdote}
                    handleClick={() => vote(anecdote.id)}
                />
            )}
        </div>
    )
}

export default AnecdoteList
