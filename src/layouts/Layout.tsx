import React, { FC, useEffect, useMemo } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Outlet, ScrollRestoration } from 'react-router-dom'
import Alert from '../components/utils/Alert'
import { useAppDispatch, useAppSelector } from '../hooks/store'
import { resetAlert } from '../store/reducers/alertSlice'

const Layout: FC = () => {
    const alertState = useAppSelector((state) => state.alert)
    const user = useAppSelector((state) => state.user.user)
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (alertState?.isShow) {
            setTimeout(() => {
                dispatch(resetAlert())
            }, 2000)
        }
    }, [alertState?.isShow])
    useEffect(() => {
        if (user) {
            // alert('begin')
        }
        return () => {
            if (user) {
                // alert('end')
            }
        }

    }, [user])

    return (
        <div className="root-wrapper">
            {/* <ScrollRestoration /> */}
            <Header />
            <div className="content-wrapper">
                <Outlet />
            </div>
            <Alert />
            <Footer />
        </div>
    )
}

export default Layout
