import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

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

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const createdAnecdote = await anecdoteService.createAnecdote(content)
    dispatch(newAnecdote(createdAnecdote))
  }
}

export const voteForAnecdote = (anecdote) => {
  return async dispatch => {
    const votedForAnecdote = await anecdoteService.voteFor(anecdote)
    dispatch(voteFor(votedForAnecdote.id))
  }
}

export default anecdoteSlice.reducer
