import React, { FC, useEffect, useMemo } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import {Outlet, ScrollRestoration, useLocation} from 'react-router-dom'
import Alert from '../components/utils/Alert'
import { useAppDispatch, useAppSelector } from '../hooks/store'
import { resetAlert } from '../store/reducers/alertSlice'
import ActionNotification from '../components/utils/ActionNitification'

const Layout = () => {
    const alertState = useAppSelector((state) => state.alert)
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (alertState?.isShow) {
            setTimeout(() => {
                dispatch(resetAlert())
            }, 2000)
        }
    }, [alertState?.isShow])

    return (
        <div className="root-wrapper">
            {/*<div ref={myRef}></div>*/}
            <ScrollRestoration />
            <Header />
            <div className="content-wrapper">
                <Outlet />
            </div>
            <Alert />
            <ActionNotification delay={5000} />
            <Footer />
            {/*{executeScroll()}*/}
        </div>
    )
}

export default Layout
