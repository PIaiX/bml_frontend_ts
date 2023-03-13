import React, { FC, useEffect, useMemo } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import {Outlet, ScrollRestoration, useLocation} from 'react-router-dom'
import Alert from '../components/utils/Alert'
import { useAppDispatch, useAppSelector } from '../hooks/store'
import { resetAlert } from '../store/reducers/alertSlice'
import ActionNotification from '../components/utils/ActionNitification'

const Layout: FC = () => {
    const alertState = useAppSelector((state) => state.alert)
    const dispatch = useAppDispatch()
    const {pathname} = useLocation()
    useEffect(() => {
        if (alertState?.isShow) {
            setTimeout(() => {
                dispatch(resetAlert())
            }, 2000)
        }
    }, [alertState?.isShow])

    useEffect(()=>{
        const timer = setTimeout(() => {
            window.scrollTo(0,0)
        }, 500);
        return () => clearTimeout(timer);
    },[pathname])

    return (
        <div className="root-wrapper">
            <ScrollRestoration />
            <Header />
            <div className="content-wrapper">
                <Outlet />
            </div>
            <Alert />
            <ActionNotification delay={5000} />
            <Footer />
        </div>
    )
}

export default Layout
