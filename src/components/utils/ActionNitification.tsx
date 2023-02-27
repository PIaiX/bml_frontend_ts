import React, { useEffect } from 'react'
import { resetNotification } from '../../store/reducers/notificationSlice'
import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hooks/store'
import { checkPhotoPath } from '../../helpers/photoLoader'

const ActionNotification: React.FC<{ delay: number }> = ({ delay }) => {
    const notification = useAppSelector((state) => state?.notification)
    const showClassName = `${notification?.isShow ? 'show' : ''}`
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (notification?.isShow) {
            const timeoutId = setTimeout(() => {
                dispatch(resetNotification())
            }, delay)

            return () => clearTimeout(timeoutId)
        }
    }, [notification])

    return (
        <Link
            to={`/account/chat/window/${notification?.conversation}`}
            className={`action-notification ${showClassName}`}
            onClick={() => dispatch(resetNotification())}
        >
            <img src={checkPhotoPath(notification?.avatar)} alt="avatar" />
            <span className="user">{notification?.user}</span>
            <span className="text">
                {notification?.message.length > 20
                    ? notification?.message.substring(0, 20) + '...'
                    : notification?.message}
            </span>
        </Link>
    )
}

export default ActionNotification
