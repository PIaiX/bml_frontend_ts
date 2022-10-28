import {configureStore} from '@reduxjs/toolkit'
import {newsApi} from '../services/RTK/newsApi'

const store = configureStore({
    reducer: {
        [newsApi.reducerPath]: newsApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(newsApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
