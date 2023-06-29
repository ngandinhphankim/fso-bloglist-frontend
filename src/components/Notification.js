import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { resetNoti } from '../redux/actions'

function Notification() {
    const notification = useSelector(state => state.notification)
    const dispatch = useDispatch()

    useEffect(() => {
        if (notification.message) {
            const timeout = setTimeout(() => {
                dispatch(resetNoti())
            }, 5000)
            return () => {
                clearTimeout(timeout)
            }
        }
    }, [notification])

    if (notification.message) {
        const { message, isError } = notification
        return (
            <div className={isError ? 'error' : 'noti'}>{message}</div>
        )
    }
    return null
}

export default Notification