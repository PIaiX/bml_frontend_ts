import React, {useCallback, useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import {MdOutlineArrowBack} from 'react-icons/md'
import PartnerCard from './PartnerCard'
import {BsPersonPlus} from 'react-icons/bs'
import {
    createFriend,
    deleteFriend,
    getCurrentFriends,
    getIncomingFriends,
    getOutgoingFriends,
} from '../../services/friends'
import {IUser} from '../../types/user'
import {useAppDispatch, useAppSelector} from '../../hooks/store'
import {IUseStateItems} from '../../types'
import {IFriendsItem, IFriendsMeta} from '../../types/friends'
import Loader from '../../components/utils/Loader'
import {checkPhotoPath} from '../../helpers/photoLoader'
import {showAlert} from '../../store/reducers/alertSlice'

const Partners = () => {
    const [tab, setTab] = useState(0)
    const user: IUser | null = useAppSelector((state) => state?.user?.user)
    const generalLimit = 100
    const [currentFriends, setCurrentFriends] = useState<IUseStateItems<IFriendsItem, IFriendsMeta>>({
        isLoaded: false,
        items: null,
        meta: null,
    })
    const [incomingFriends, setIncomingFriends] = useState<IUseStateItems<IFriendsItem, IFriendsMeta>>({
        isLoaded: false,
        items: null,
        meta: null,
    })
    const [outgoingFriends, setOutgoingFriend] = useState<IUseStateItems<IFriendsItem, IFriendsMeta>>({
        isLoaded: false,
        items: null,
        meta: null,
    })
    const [searchText, setSearchText] = useState('')
    const [isFocus, setIsFocus] = useState(false)
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (user) {
            getCurrentFriends(user?.id, 1, generalLimit, 'desc')
                .then((res) => {
                    res && setCurrentFriends({isLoaded: true, items: res?.data, meta: res?.meta})
                })
                .catch(() => {
                    setCurrentFriends({isLoaded: true, items: null, meta: null})
                })
        }
    }, [user])

    useEffect(() => {
        if (user) {
            getIncomingFriends(user?.id, 1, generalLimit, 'desc')
                .then((res) => res && setIncomingFriends({isLoaded: true, items: res?.data, meta: res?.meta}))
                .catch(() => setIncomingFriends({isLoaded: true, items: null, meta: null}))
        }
    }, [user])

    useEffect(() => {
        if (user) {
            getOutgoingFriends(user?.id, 1, generalLimit, 'desc')
                .then((res) => res && setOutgoingFriend({isLoaded: true, items: res?.data, meta: res?.meta}))
                .catch(() => setOutgoingFriend({isLoaded: true, items: null, meta: null}))
        }
    }, [user])

    const deleteFromFriend = useCallback(
        (id: number) => {
            deleteFriend({fromId: user?.id, toId: id})
                .then(() => {
                    dispatch(showAlert({message: '?????????????? ???????????? ???? ??????????????????', typeAlert: 'good'}))
                    if (tab === 0) {
                        if (user) {
                            getCurrentFriends(user?.id, 1, generalLimit, 'desc')
                                .then((res) => {
                                    res && setCurrentFriends({isLoaded: true, items: res?.data, meta: res?.meta})
                                })
                                .catch(() => {
                                    setCurrentFriends({isLoaded: true, items: null, meta: null})
                                })
                        }
                    } else if (tab === 1) {
                        if (user) {
                            getIncomingFriends(user?.id, 1, generalLimit, 'desc')
                                .then(
                                    (res) =>
                                        res && setIncomingFriends({isLoaded: true, items: res?.data, meta: res?.meta})
                                )
                                .catch(() => setIncomingFriends({isLoaded: true, items: null, meta: null}))
                        }
                    } else {
                        if (user) {
                            getOutgoingFriends(user?.id, 1, generalLimit, 'desc')
                                .then(
                                    (res) =>
                                        res && setOutgoingFriend({isLoaded: true, items: res?.data, meta: res?.meta})
                                )
                                .catch(() => setOutgoingFriend({isLoaded: true, items: null, meta: null}))
                        }
                    }
                })
                .catch(() => dispatch(showAlert({message: '?????????????????? ????????????', typeAlert: 'bad'})))
        },
        [tab]
    )

    const acceptFriend = useCallback(
        (id: number) => {
            createFriend({fromId: user?.id, toId: id})
                .then(() => {
                    dispatch(showAlert({message: '?????????????? ?????????????? ????????????????!', typeAlert: 'good'}))
                    if (tab === 1) {
                        if (user) {
                            getIncomingFriends(user?.id, 1, generalLimit, 'desc')
                                .then(
                                    (res) =>
                                        res && setIncomingFriends({isLoaded: true, items: res?.data, meta: res?.meta})
                                )
                                .catch(() => setIncomingFriends({isLoaded: true, items: null, meta: null}))
                            getCurrentFriends(user?.id, 1, generalLimit, 'desc')
                                .then((res) => {
                                    res && setCurrentFriends({isLoaded: true, items: res?.data, meta: res?.meta})
                                })
                                .catch(() => {
                                    setCurrentFriends({isLoaded: true, items: null, meta: null})
                                })
                        }
                    }
                })
                .catch(() => {
                    dispatch(showAlert({message: '?????????????????? ????????????', typeAlert: 'bad'}))
                })
        },
        [tab]
    )

    return (
        <>
            <Link to="/account/profile" className="color-1 f_11 fw_5 d-flex align-items-center d-lg-none mb-3 mb-sm-4">
                <MdOutlineArrowBack /> <span className="ms-2">??????????</span>
            </Link>
            <div className="acc-box">
                <div className="d-flex flex-column-reverse flex-md-row justify-content-between align-items-center mb-3 mb-md-4">
                    <div className="d-flex align-items-center mt-3 mt-sm-0">
                        <button type="button" className={tab === 0 ? '' : 'l-gray'} onClick={() => setTab(0)}>
                            <span>???????????? ????????????????</span>
                            <span className="l-gray ms-2">{currentFriends?.meta?.total || 0}</span>
                        </button>

                        <button type="button" className={tab === 1 ? 'ms-4' : 'l-gray ms-4'} onClick={() => setTab(1)}>
                            <span>????????????</span>
                            {incomingFriends.meta && incomingFriends?.meta?.total > 0 ? (
                                <span className="requests-count ms-2">{incomingFriends?.meta?.total}</span>
                            ) : (
                                ''
                            )}
                        </button>
                        <button type="button" className={tab === 2 ? 'ms-4' : 'l-gray ms-4'} onClick={() => setTab(2)}>
                            <span>???????? ????????????</span>
                            <span className="ms-2">
                                {outgoingFriends?.meta && outgoingFriends?.meta?.total > 0
                                    ? outgoingFriends?.meta?.total || ''
                                    : ''}
                            </span>
                        </button>
                    </div>
                    <div className="form_search mb-3 mb-md-0">
                        <input
                            type="text"
                            placeholder="??????????"
                            onFocus={() => setIsFocus(!isFocus)}
                            onBlur={() => setTimeout(() => setIsFocus(!isFocus), 100)}
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                        />
                        <button
                            type="button"
                            className={`blue px-2 ${isFocus ? 'd-block' : 'd-none'}`}
                            onClick={() => {
                                setSearchText('')
                                setIsFocus(!isFocus)
                            }}
                        >
                            ????????????????
                        </button>
                    </div>
                </div>

                {tab === 0 && (
                    <div
                        className={`${
                            currentFriends?.meta && currentFriends?.meta?.total > 0
                                ? 'mt-4 mt-xl-5'
                                : 'py-5 text-center'
                        }`}
                    >
                        {currentFriends?.isLoaded ? (
                            currentFriends?.meta && currentFriends?.meta?.total > 0 ? (
                                currentFriends?.items
                                    ?.filter((i) => {
                                        if (searchText?.length > 0) {
                                            return (
                                                i.lastName.toLowerCase().includes(searchText) ||
                                                i.firstName.toLowerCase().includes(searchText) ||
                                                i.fullName.toLowerCase().includes(searchText)
                                            )
                                        } else {
                                            return i
                                        }
                                    })
                                    .map((i) => (
                                        <PartnerCard
                                            id={i.id}
                                            deleteFriend={deleteFromFriend}
                                            key={i.id}
                                            type={tab}
                                            imgURL={checkPhotoPath(i?.avatar)}
                                            name={i?.fullName}
                                            agency={i?.companyName}
                                        />
                                    ))
                            ) : (
                                <>
                                    <BsPersonPlus className="f_50 l-gray" />
                                    <div className="f_13 fw_5 mt-3">???????????????? ????????????-??????????????????</div>
                                    <div className="l-gray mt-3">
                                        ?????????? ?????????? ???????????????????????? ????????,
                                        <br /> ?????????????? ???? ???????????????? ?? ????????????-????????????????
                                    </div>
                                </>
                            )
                        ) : (
                            <div className="p-5 w-100 d-flex justify-content-center">
                                <Loader color="#343434" />
                            </div>
                        )}
                    </div>
                )}
                {tab === 1 && (
                    <div className="mt-4 mt-xl-5">
                        {incomingFriends?.isLoaded ? (
                            incomingFriends?.meta && incomingFriends?.meta?.total > 0 ? (
                                incomingFriends?.items
                                    ?.filter((i) => {
                                        if (searchText?.length > 0) {
                                            return (
                                                i.lastName.toLowerCase().includes(searchText) ||
                                                i.firstName.toLowerCase().includes(searchText) ||
                                                i.fullName.toLowerCase().includes(searchText)
                                            )
                                        } else {
                                            return i
                                        }
                                    })
                                    ?.map((i) => (
                                        <PartnerCard
                                            id={i.id}
                                            acceptFriend={acceptFriend}
                                            deleteFriend={deleteFromFriend}
                                            key={i.id}
                                            type={tab}
                                            imgURL={checkPhotoPath(i.avatar)}
                                            name={i.fullName}
                                            agency={i.companyName}
                                        />
                                    ))
                            ) : (
                                <div className="d-flex justify-content-center">
                                    <h5>?????? ????????????</h5>
                                </div>
                            )
                        ) : (
                            <div className="p-5 w-100 d-flex justify-content-center">
                                <Loader color="#343434" />
                            </div>
                        )}
                    </div>
                )}
                {tab === 2 && (
                    <div className="mt-4 mt-xl-5">
                        {outgoingFriends?.isLoaded ? (
                            outgoingFriends?.meta && outgoingFriends?.meta?.total > 0 ? (
                                outgoingFriends?.items
                                    ?.filter((i) => {
                                        if (searchText?.length > 0) {
                                            return (
                                                i.lastName.toLowerCase().includes(searchText) ||
                                                i.firstName.toLowerCase().includes(searchText) ||
                                                i.fullName.toLowerCase().includes(searchText)
                                            )
                                        } else {
                                            return i
                                        }
                                    })
                                    .map((i) => (
                                        <PartnerCard
                                            id={i.id}
                                            deleteFriend={deleteFromFriend}
                                            key={i.id}
                                            type={tab}
                                            imgURL={checkPhotoPath(i.avatar)}
                                            name={i.fullName}
                                            agency={i.companyName}
                                        />
                                    ))
                            ) : (
                                <div className="d-flex justify-content-center">
                                    <h5>?????? ????????????</h5>
                                </div>
                            )
                        ) : (
                            <div className="p-5 w-100 d-flex justify-content-center">
                                <Loader color="#343434" />
                            </div>
                        )}
                    </div>
                )}
            </div>
        </>
    )
}

export default Partners
