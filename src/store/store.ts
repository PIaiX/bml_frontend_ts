import {configureStore} from '@reduxjs/toolkit'
import {newsApi} from '../services/RTK/newsApi'
import {bannerApi} from '../services/RTK/bannerApi'
import {userSlice} from './reducers/userSlice'
import {alertSlice} from './reducers/alertSlice'
import {offersApi} from '../services/RTK/offersApi'
import {citySlice} from './reducers/citySlice'

const store = configureStore({
    reducer: {
        [newsApi.reducerPath]: newsApi.reducer,
        [bannerApi.reducerPath]: bannerApi.reducer,
        [offersApi.reducerPath]: offersApi.reducer,
        user: userSlice.reducer,
        alert: alertSlice.reducer,
        cities: citySlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(newsApi.middleware).concat(bannerApi.middleware).concat(offersApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
