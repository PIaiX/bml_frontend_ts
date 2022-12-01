import React, {useEffect} from 'react'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import './assets/styles/common.css'
import './assets/styles/style.css'

import fingerprint from '@fingerprintjs/fingerprintjs'

import AppRouter from './routes/AppRouter'
import {useAppDispatch, useAppSelector} from './hooks/store'
import {checkAuth} from './store/reducers/userSlice'
import {getCity} from './services/city'
import {setCity} from './store/reducers/citySlice'
import {IUser} from './types/user'
import {setSocketConnection, socketInstance} from './services/sockets/socketInstance'

function App() {
    const dispatch = useAppDispatch()
    const isLoadingRefresh = useAppSelector((state) => state?.user?.isLoading)
    const user: IUser | null = useAppSelector((state) => state?.user?.user)

    useEffect(() => {
        fingerprint
            .load()
            .then((fp) => fp.get())
            .then((result) => {
                localStorage.setItem('fingerprint', result.visitorId)
            })
    }, [])

    useEffect(() => {
        getCity().then((res) => res && dispatch(setCity(res)))
    }, [])

    useEffect(() => {
        user && setSocketConnection(user?.id)
    }, [user])

    useEffect(() => {
        if (localStorage.getItem('token')) {
            dispatch(checkAuth())
        } else {
            dispatch(checkAuth())
        }
    }, [])

    return isLoadingRefresh ? <></> : <AppRouter />
}

export default App
