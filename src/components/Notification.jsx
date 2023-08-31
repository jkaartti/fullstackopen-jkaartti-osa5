const Notification = ({ message, isError }) => {
  const notificationStyle = {
    color: 'green',
    fontSize: 24,
    padding: 10,
    borderStyle: 'solid',
    borderWidth: 10,
    borderColor: 'green',
    marginBottom: 10
  }

  if (isError) {
    notificationStyle.color = 'red',
    notificationStyle.borderColor = 'red'
  }

  if (message === null) {
    return null
  }

  const className = isError
    ? 'error'
    : 'info'

  return (
    <div className={className} style={notificationStyle}>
      {message}
    </div>
  )
}

export default Notification