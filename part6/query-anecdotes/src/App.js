import { useQuery, useMutation, useQueryClient } from 'react-query'
import { getAnecdotes, voteFor } from './requests'
import { useDispatch } from './components/context/NotificationContext'


import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'

const App = () => {
  const dispatch = useDispatch()
  const queryClient = useQueryClient()
  const voteForMutation = useMutation( voteFor, {
    onSuccess: (newAnecdote) => {
      const id = newAnecdote.id
      const anecdotes = queryClient.getQueryData('anecdotes')
      queryClient.setQueryData('anecdotes', anecdotes.map(anecdote => id === anecdote.id ? newAnecdote : anecdote))
      dispatch({type: 'VOTE', payload: `${newAnecdote.content}`})
      setTimeout(() => {dispatch({type: 'CLEAR'})}, 5000)
    }
  })

  const handleVote = (anecdote) => {
    voteForMutation.mutate({...anecdote, votes: anecdote.votes+1})
  }

  const result = useQuery('anecdotes', getAnecdotes, { retry: 1 }, { refetchOnWindowFocus: false })

  if ( result.isLoading ) {
    return <div>loading data...</div>
  }

  if ( result.isError ) {
    return <div>Anecdote Service is unavailable due to error with the server</div>
  }

  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
