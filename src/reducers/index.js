function notificationReducer(state = null, action) {
    switch (action.type) {
      case 'noti/reset':
        return null
      case 'noti/set':
        return action.payload
      default:
        return state
    }
  }

export default notificationReducer 