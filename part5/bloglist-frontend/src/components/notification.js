const Notification = ({ notification }) => {
  if (notification !== null) {
    return (
      <div className="notification">
        {notification}
      </div>
    )
  } else {
    return null
  }
}

export default Notification