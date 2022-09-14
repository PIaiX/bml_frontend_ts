import React from 'react';
import Header from './Header'
import Footer from './Footer'
import { Outlet } from 'react-router-dom'

const Layout = () => {
    return (
        <div className='root-wrapper'>
            <Header />
            <div className='content-wrapper'>
                <Outlet />
            </div>
            <Footer />
        </div>
    )
}

export default Layout