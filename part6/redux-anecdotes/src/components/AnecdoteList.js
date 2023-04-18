import { useDispatch, useSelector } from 'react-redux'
import { voteForAnecdote } from '../reducers/anecdoteReducer'
import { voted } from '../reducers/notificationReducer'

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
    const anecdotes = useSelector(state => {
        if(state.filter.filter === '') {
            return state.anecdotes
        }
        return state.anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(state.filter.toLowerCase()))
    }).sort((a, b) => b.votes - a.votes)
    const dispatch = useDispatch()
    
    const vote = (anecdote) => {
      dispatch(voteForAnecdote(anecdote))
      dispatch(voted(anecdote, 5))
    }
    
    return (
        <div>
            {anecdotes.map(anecdote => 
                <Anecdote
                    key={anecdote.id}
                    anecdote={anecdote}
                    handleClick={() => vote(anecdote)}
                />
            )}
        </div>
    )
}

export default AnecdoteList
