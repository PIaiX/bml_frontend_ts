import React, {useEffect, useState} from 'react'
import {Outlet, useLocation, useMatch, useMatches, useOutletContext} from 'react-router-dom'
import AccountMenu from '../pages/profile/AccountMenu'
import {emitCloseConversation} from '../services/sockets/conversations'
import {useAppSelector} from "../hooks/store";

interface Props {
    isMobile: boolean
}

export type OutletState = {
    id: string | null
    pathname: string | null
}

const PersonalAccountLayout: React.FC<Props> = ({isMobile}) => {
    const {pathname} = useLocation()
    const ll = useMatch(pathname)
    const [info, setInfo] = useState<OutletState>({
        id: null,
        pathname: null,
    })

    useEffect(() => {
        if (ll?.pathname && info?.pathname && info?.id) {
            if (info?.pathname !== ll?.pathname) {
                emitCloseConversation(info?.id)
            }
        }
    }, [info, ll])
    return (
        <>
            {!isMobile ? (
                <div className="row">
                    <div className="col-md-4 col-lg-3">
                         <AccountMenu />
                    </div>
                    <div className="col-md-8 col-lg-9">
                        <Outlet context={[info, setInfo]} />
                    </div>
                </div>
            ) : (
                <Outlet context={[info, setInfo]} />
            )}
        </>
    )
}

export default PersonalAccountLayout
