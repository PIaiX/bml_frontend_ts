import React from 'react'
import ReactDOM, {Root} from 'react-dom/client'
import App from './App'
import {Provider} from 'react-redux'
import store from './store/store'
import {QueryClient, QueryClientProvider} from 'react-query'

const root: Root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
const queryClient = new QueryClient()
root.render(
    <Provider store={store}>
        <QueryClientProvider client={queryClient}>
            <App />
        </QueryClientProvider>
    </Provider>
)
