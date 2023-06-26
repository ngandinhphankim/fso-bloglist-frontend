import propTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'

function Notification({ message, isError }) {
    return (
        <div className={isError ? 'error' : 'noti'}>{message}</div>
    )
}

const mapStateToProps = state => {
    const { message, isError } = state.notification
    return { message, isError }
}

export default connect(mapStateToProps)(Notification)

Notification.propTypes = {
    message: propTypes.string,
    isError: propTypes.bool
}