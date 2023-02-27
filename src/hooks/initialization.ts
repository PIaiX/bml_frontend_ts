import { useAppDispatch, useAppSelector } from './store'
import { IUser } from '../types/user'
import { useEffect } from 'react'
import { getCity } from '../services/city'
import { setCity } from '../store/reducers/citySlice'
import { setSocketConnection } from '../services/sockets/socketInstance'
import { checkAuth } from '../store/reducers/userSlice'
import FingerprintJS from '@fingerprintjs/fingerprintjs'

import { io } from 'socket.io-client'
import { BASE_URL_SOCKET } from '../config/api'
import { setNotification, setUnreadCount } from '../store/reducers/notificationSlice'
import cities from '../helpers/cities'

const fpPromise = FingerprintJS.load()

const useInitialization = () => {
    const dispatch = useAppDispatch()
    const isLoadingRefresh = useAppSelector((state) => state?.user?.isLoading)
    const user: IUser | null = useAppSelector((state) => state?.user?.user)

    useEffect(() => {
        (async () => {
            const fp = await fpPromise
            const result = await fp.get()
            localStorage.setItem('fingerprint', result.visitorId)
        })()
    }, [])

    useEffect(() => {
        dispatch(setCity(cities))
    }, [])

    useEffect(() => {
        user && setSocketConnection(user?.id)
    }, [user])

    useEffect(() => {

        if (!user) return

        let socketNotification = io(`${BASE_URL_SOCKET}`, {
            auth: { token: `Bearer ${localStorage.getItem('token')}` }
        })

        if (user && socketNotification) {
            console.log('Start listen to notification')
            socketNotification.on('message:create', (newMessage) => {
                console.log(newMessage)
                if (newMessage.userId != user.id) {
                    dispatch(setNotification(newMessage))
                }
            })
            socketNotification.on('conversation:unreadCount', (count) => {
                dispatch(setUnreadCount(count))
            })
        }

        return () => {
            console.log('Stop listen to notification')
            socketNotification?.off('message:create')
            socketNotification?.off('conversation:unreadCount')
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user])

    useEffect(() => {
        if (localStorage.getItem('token')) {
            dispatch(checkAuth())
        } else {
            dispatch(checkAuth())
        }
    }, [])

    return isLoadingRefresh
}

export default useInitialization
