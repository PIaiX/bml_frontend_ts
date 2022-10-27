import React, {FC} from 'react'
import Header from './Header'
import Footer from './Footer'
import {Outlet, ScrollRestoration} from 'react-router-dom'

const Layout: FC = () => {
    return (
        <div className="root-wrapper">
            <ScrollRestoration />
            <Header />
            <div className="content-wrapper">
                <Outlet />
            </div>
            <Footer />
        </div>
    )
}

export default Layout
