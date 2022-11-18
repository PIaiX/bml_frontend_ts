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
import {setInitialCount} from './store/reducers/favoriteCountSlice'

function App() {
    const dispatch = useAppDispatch()
    const isLoadingRefresh = useAppSelector((state) => state?.user?.isLoading)

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
        if (localStorage.getItem('token')) {
            dispatch(checkAuth())
        } else {
            dispatch(checkAuth())
        }
    }, [])

    return isLoadingRefresh ? <></> : <AppRouter />
}

export default App
