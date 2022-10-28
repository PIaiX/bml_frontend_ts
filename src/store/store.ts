import {configureStore} from '@reduxjs/toolkit'
import {newsApi} from '../services/RTK/newsApi'
import {bannerApi} from '../services/RTK/bannerApi'

const store = configureStore({
    reducer: {
        [newsApi.reducerPath]: newsApi.reducer,
        [bannerApi.reducerPath]: bannerApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(newsApi.middleware).concat(bannerApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
