import React from 'react'
import ReactDOM, {Root} from 'react-dom/client'
import App from './App'
import {Provider} from 'react-redux'
import store from './store/store'

const root: Root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>
)
