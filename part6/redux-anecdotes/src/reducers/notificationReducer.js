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
        errorNotification(state, action) {
            return 'Please input data!'
        },
        clearNotification(state, action) {
            return initialState
        }
    }
})

export const { voteNotification, newNotification, clearNotification, errorNotification } = notificationSlice.actions

export const voted = (anecdote, delay) => {
    return async dispatch => {
        dispatch(voteNotification(anecdote.content))
        setTimeout(() => {dispatch(clearNotification())}, delay*1000)
    }
}
export const created = (delay) => {
    return dispatch => {
        dispatch(newNotification())
        setTimeout(() => {dispatch(clearNotification())}, delay*1000)
    }
}
export const creationError = (delay) => {
    return dispatch => {
        dispatch(errorNotification())
        setTimeout(() => {dispatch(clearNotification())}, delay*1000)
    }
}
export default notificationSlice.reducer
