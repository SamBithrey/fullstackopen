import { useMutation, useQueryClient } from 'react-query'
import { createAnecdote } from '../requests'
import { useDispatch } from './context/NotificationContext'

const AnecdoteForm = () => {
  const dispatch = useDispatch()
  const queryClient = useQueryClient()

  const createAnecdoteMutation = useMutation(createAnecdote, {
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData('anecdotes')
      queryClient.setQueryData('anecdotes', anecdotes.concat(newAnecdote))
      dispatch({type: 'CREATE'})
      setTimeout(() => {dispatch({type: 'CLEAR'})}, 5000)
    },
    onError: (variables) => {
      dispatch({type: 'ERROR', payload: `${variables.response.data.error}`})
      setTimeout(() => {dispatch({type: 'CLEAR'})}, 5000)
    }
  })

  const onCreate = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    createAnecdoteMutation.mutate({ content, votes: 0})
    event.target.anecdote.value = ''
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
