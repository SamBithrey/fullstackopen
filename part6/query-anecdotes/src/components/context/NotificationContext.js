import { createContext, useReducer, useContext } from 'react'

const initialState = null
const notificationReducer = (state, action) => {
    switch (action.type) {
        case 'VOTE':
            return `You have voted for ${action.payload}`
        case 'CREATE':
            return 'You have create a new anecdote'
        case 'ERROR':
            return `Error: ${action.payload}`
        case 'CLEAR':
            return initialState
        default:
            return state
    }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
    const [notification, notificationDispatch] = useReducer(notificationReducer, initialState)
  
    return (
      <NotificationContext.Provider value={[notification, notificationDispatch] }>
        {props.children}
      </NotificationContext.Provider>
    )
}

export const useNotification = () => {
    const notificatonAndDispatch = useContext(NotificationContext)
    return notificatonAndDispatch[0]
}

export const useDispatch = () => {
    const notificatonAndDispatch = useContext(NotificationContext)
    return notificatonAndDispatch[1]
}

export default NotificationContext