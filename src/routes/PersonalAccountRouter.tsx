import React, {FC, useEffect, useState} from 'react'
import NotFound from '../pages/NotFound'
import PersonalAccountLayout from '../components/PersonalAccountLayout'
import UserProfile from '../pages/profile/UserProfile'
import ViewProfile from '../pages/profile/ViewProfile'
import PartnersSite from '../components/PartnersSite'
import Instructions from '../pages/profile/Instructions'
import ProfileSettings from '../pages/profile/ProfileSettings'
import UserAds from '../pages/profile/UserAds'
import NewAd from '../pages/profile/NewAd'
import Premium from '../pages/profile/Premium'
import Favorites from '../pages/profile/Favorites'
import Chat from '../pages/profile/Chat'
import ChatWindow from '../pages/profile/ChatWindow'
import MyWallet from '../pages/profile/MyWallet'
import ShoppingCart from '../pages/profile/ShoppingCart'
import AdvertisingSection from '../pages/profile/AdvertisingSection'
import AccountMenu from '../pages/profile/AccountMenu'
import {useRoutes} from 'react-router-dom'
import Partners from '../pages/profile/Partners'

type Props = {
    isMobile: boolean
}

const PersonalAccountRouter: FC<Props> = ({isMobile}) => {
    const routes = [
        {
            path: '/',
            element: <PersonalAccountLayout isMobile={isMobile} />,
            children: [
                {index: true, element: isMobile ? <AccountMenu /> : <UserProfile />},
                {path: 'profile/user/:id', element: <ViewProfile />},
                {path: 'profile/:id', element: <UserProfile />},
                {path: 'profile/partners', element: <Partners />},
                {path: 'instructions', element: <Instructions />},
                {path: 'settings', element: <ProfileSettings />},
                {path: 'my-ads', element: <UserAds />},
                {path: 'my-ads/new-ad', element: <NewAd />},
                {path: 'my-ads/new-ad/:id', element: <NewAd />},
                {path: 'my-ads/premium', element: <Premium />},
                {path: 'favorites', element: <Favorites />},
                {path: 'chat', element: <Chat />},
                {path: 'chat/window', element: <ChatWindow />},
                {path: 'wallet', element: <MyWallet />},
                {path: 'cart', element: <ShoppingCart />},
                {path: 'advertising-section', element: <AdvertisingSection />},
                {path: '*', element: <NotFound />},
            ],
        },
    ]

    const element = useRoutes(routes)

    return <>{element}</>
}

export default PersonalAccountRouter
