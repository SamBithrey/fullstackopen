import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        voteNotification(state, action) {
            const anecdote = action.payload
            return `You voted for '${anecdote}'`
        },
        newNotification(state, action) {
            return 'New anecdote created!'
        },
        clearNotification(state, action) {
            return initialState
        }
    }
})

export const { voteNotification, newNotification, clearNotification } = notificationSlice.actions
export default notificationSlice.reducer
