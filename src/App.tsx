import React, {useEffect} from 'react'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import './assets/styles/common.css'
import './assets/styles/style.css'

import fingerprint from '@fingerprintjs/fingerprintjs'

import AppRouter from './routes/AppRouter'
import {useAppDispatch} from './hooks/store'
import {checkAuth} from './store/reducers/userSlice'

function App() {
    const dispatch = useAppDispatch()

    useEffect(() => {
        fingerprint
            .load()
            .then((fp) => fp.get())
            .then((result) => {
                localStorage.setItem('fingerprint', result.visitorId)
            })
    }, [])

    useEffect(() => {
        if (localStorage.getItem('token')) {
            dispatch(checkAuth())
        }
    }, [])

    return <AppRouter />
}

export default App
