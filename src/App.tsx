import React, { useEffect } from 'react'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import './assets/styles/common.css'
import './assets/styles/style.css'

import AppRouter from './routes/AppRouter'
import useInitialization from './hooks/initialization'

import { setNotification, setUnreadCount } from './store/reducers/notificationSlice'
import { useSelector } from 'react-redux'
import { io } from 'socket.io-client'
import { BASE_URL_SOCKET } from './config/api'

function App() {

    // Global notification listener
    const user = useSelector((state: any) => state?.user?.user)
    const isLoadingRefresh = useInitialization()

    useEffect(() => {

        if (!user) return

        let socketNotification = io(`${BASE_URL_SOCKET}`, {
            // auth: { token: `Bearer ${localStorage.getItem('token')}` },
            query: user.id
        })

        if (user && socketNotification) {
            console.log('Start listen to notification')
            socketNotification.on('message:create', (newMessage) => {
                if (newMessage.userId != user.id) {
                    console.log(newMessage)
                    dispatch(setNotification(newMessage))
                }
            })
            // socketNotification.on('conversation:unreadCount', (count) => {
            //     dispatch(setUnreadCount(count))
            // })
        }

        return () => {
            console.log('Stop listen to notification')
            socketNotification?.off('message:create')
            socketNotification?.off('conversation:unreadCount')
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoadingRefresh])


    return isLoadingRefresh ? <></> : <AppRouter />
}

export default App

function dispatch(arg0: any) {
    throw new Error('Function not implemented.')
}

