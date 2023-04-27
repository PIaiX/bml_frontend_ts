import React, {FC, Suspense} from 'react'
import NotFound from '../pages/NotFound'
import PersonalAccountLayout from '../components/PersonalAccountLayout'
import UserProfile from '../pages/profile/UserProfile'
import ViewProfile from '../pages/profile/ViewProfile'
import Instructions from '../pages/profile/Instructions'
import ProfileSettings from '../pages/profile/ProfileSettings'
import UserAds from '../pages/profile/UserAds'
import NewAd from '../pages/profile/NewAd'
import Premium from '../pages/profile/Premium'
import Favorites from '../pages/profile/Favorites'
import Chat from '../pages/profile/Chat'
import ChatWindow from '../pages/profile/ChatWindow'
import MyWallet from '../pages/profile/MyWallet'
import AdvertisingSection from '../pages/profile/AdvertisingSection'
import AccountMenu from '../pages/profile/AccountMenu'
import {useRoutes} from 'react-router-dom'
import Partners from '../pages/profile/Partners'
import ChatWindowEmpty from "../pages/profile/ChatWindowEmpty";
import Banners from "../pages/profile/Banners";
import PayHistory from "../pages/PayHistory";
import {IUser} from "../types/user";
import {useAppSelector} from "../hooks/store";

type Props = {
    isMobile: boolean
}

const PersonalAccountRouter: FC<Props> = ({isMobile}) => {
    const user = useAppSelector((state) => state?.user?.user)

    const isVerify = (component:any)=> user?.isFormCompleted?<Suspense>{component}</Suspense>:<ProfileSettings />

    const routes = [
        {
            path: '/',
            element: <PersonalAccountLayout isMobile={isMobile} />,
            children: [
                {index: true, element: isMobile ? <AccountMenu /> : <UserProfile />},
                {path: 'profile/user/:id', element: <ViewProfile />},
                {path: 'profile/:id', element: <UserProfile />},
                {path: 'instructions', element: <Instructions />},
                {path: 'settings', element: <ProfileSettings />},

                {path: 'profile/partners', element:isVerify(<Partners />)},
                {path: 'my-ads', element:isVerify(isVerify(<UserAds />))},
                {path: 'my-ads/new-ad', element:isVerify(<NewAd />)},
                {path: 'my-ads/new-ad/:id', element:isVerify(<NewAd />)},
                {path: 'my-ads/premium', element:isVerify(<Premium />)},
                {path: 'pay-history', element:isVerify(<PayHistory />)},
                {path: 'favorites', element:isVerify(<Favorites />)},
                {path: 'chat', element:isVerify(<Chat />)},
                {path: 'chat/window/:id', element:isVerify(<ChatWindow/>)},
                {path: 'chat/window/new', element:isVerify(<ChatWindowEmpty />)},
                {path: 'wallet', element:isVerify(<MyWallet />)},
                {path: 'banners', element:isVerify(<Banners />)},
                {path: 'advertising-section', element:isVerify(<AdvertisingSection />)},

                {path: '*', element: <NotFound />},
            ],
        },
    ]

    const element = useRoutes(routes)

    return <>{element}</>
}

export default PersonalAccountRouter
