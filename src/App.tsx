import React from 'react'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import './assets/styles/common.css'
import './assets/styles/style.css'

import AppRouter from './routes/AppRouter'
import useInitialization from './hooks/initialization'

function App() {
    const isLoadingRefresh = useInitialization()

    return isLoadingRefresh ? <></> : <AppRouter />
}

export default App
