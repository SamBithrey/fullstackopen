import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { created, creationError } from '../reducers/notificationReducer'


const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const createNew = async (event) => {
        event.preventDefault()
        if (!event.target.anecdote.value) {
            return dispatch(creationError(5))
        }
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        dispatch(createAnecdote(content))
        dispatch(created(5))
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
