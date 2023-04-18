import { useDispatch } from 'react-redux'
import { newAnecdote } from '../reducers/anecdoteReducer'
import { newNotification, clearNotification, errorNotification } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'


const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const createNew = async (event) => {
        event.preventDefault()
        if (!event.target.anecdote.value) {
            dispatch(errorNotification())
            return setTimeout(() => {dispatch(clearNotification())}, 5000)
        }
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        const createdAnecdote = await anecdoteService.createAnecdote(content)
        dispatch(newAnecdote(createdAnecdote))
        dispatch(newNotification())
        setTimeout(() => {dispatch(clearNotification())}, 5000)
    }

    return (
        <div>
            <h2>Create New</h2>
            <form onSubmit={createNew}>
                <input name="anecdote" /> 
                <button type="submit">Create!</button>
            </form>
        </div>
    )
}

export default AnecdoteForm
