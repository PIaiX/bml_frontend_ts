import React, { useEffect } from 'react'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import './assets/styles/common.css'
import './assets/styles/style.css'

import AppRouter from './routes/AppRouter'
import useInitialization from './hooks/initialization'
import { useAppSelector } from './hooks/store'

function App() {

    // Global notification listener
    const user = useAppSelector((state: any) => state?.user?.user)
    const isLoadingRefresh = useInitialization()

    return isLoadingRefresh ? <></> : <AppRouter />
}

export default App

function dispatch(arg0: any) {
    throw new Error('Function not implemented.')
}

