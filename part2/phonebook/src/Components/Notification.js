const Notification = ({notification, error}) => {
    if(notification != ""){
        return (
            <div className="notification">
                {notification}
            </div>
        )
    }
    if(error != ""){
        return (
            <div className="error">
                {error}   
            </div>
        )  
    }
    return null
}

export default Notification