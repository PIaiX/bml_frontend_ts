import { useAppDispatch, useAppSelector } from './store'
import { IUser } from '../types/user'
import { useEffect } from 'react'
import { getCity } from '../services/city'
import { setCity } from '../store/reducers/citySlice'
import { setSocketConnection } from '../services/sockets/socketInstance'
import { checkAuth } from '../store/reducers/userSlice'
import FingerprintJS from '@fingerprintjs/fingerprintjs'

const fpPromise = FingerprintJS.load()

const useInitialization = () => {
    const dispatch = useAppDispatch()
    const isLoadingRefresh = useAppSelector((state) => state?.user?.isLoading)
    const user: IUser | null = useAppSelector((state) => state?.user?.user)

    useEffect(() => {
        (async () => {
            const fp = await fpPromise
            const result = await fp.get()
            localStorage.setItem('fingerprint', result.visitorId)
        })()
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

    return isLoadingRefresh
}

export default useInitialization
