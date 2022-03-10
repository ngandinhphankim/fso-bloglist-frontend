import propTypes from 'prop-types'
import React from 'react'

function Notification({ message, isError }) {
    return (
        <div className={isError ? 'error' : 'noti'}>{message}</div>
    )
}

export default Notification

Notification.propTypes = {
    message: propTypes.string,
    isError: propTypes.bool
}