import { useDispatch, useSelector } from 'react-redux'
import { voteFor } from '../reducers/anecdoteReducer'
import { voteNotification, clearNotification } from '../reducers/notificationReducer'

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
      dispatch(voteFor(anecdote.id))
      dispatch(voteNotification(anecdote.content))
      setTimeout(() => {dispatch(clearNotification())}, 5000)
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
