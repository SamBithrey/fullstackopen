import { createSlice } from '@reduxjs/toolkit'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    voteFor(state, action) {
      const id = action.payload
      const anecdoteToChange = state.find(n => n.id === id)
      const votedAnecdote = { 
        ...anecdoteToChange, 
        votes: anecdoteToChange.votes+1 
      }
      return state.map(anecdote =>
        anecdote.id !== id ? anecdote : votedAnecdote 
      )
    },
    newAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})


export const { voteFor, newAnecdote, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer
