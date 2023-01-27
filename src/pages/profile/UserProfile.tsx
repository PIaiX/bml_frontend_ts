import React, { FC, useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { MdAddCircle, MdOutlineArrowBack } from 'react-icons/md'
import { useAppSelector } from '../../hooks/store'
import { IUser } from '../../types/user'
import { checkPhotoPath } from '../../helpers/photoLoader'
import { getCurrentFriends } from '../../services/friends'
import { IUseStateItems } from '../../types'
import { IFriendsItem, IFriendsMeta } from '../../types/friends'
import Loader from '../../components/utils/Loader'
import { getUsersOffersNotArchive } from '../../services/offers'
import { IOffersItem, IOffersMeta } from '../../types/offers'

const UserProfile: FC = () => {
    const user: IUser | null = useAppSelector((state) => state?.user?.user)
    const [sliceNumber, setSliceNumber] = useState(6)
    const [currentFriends, setCurrentFriends] = useState<IUseStateItems<IFriendsItem, IFriendsMeta>>({
        isLoaded: false,
        meta: null,
        items: null,
    })
    const [userOffers, setUserOffers] = useState<IUseStateItems<IOffersItem, IOffersMeta>>({
        isLoaded: false,
        meta: null,
        items: null,
    })

    useEffect(() => {
        if (user?.id) {
            getCurrentFriends(user?.id, 1, 6, 'desc')
                .then((res) => res && setCurrentFriends({ isLoaded: true, items: res.data, meta: res.meta }))
                .catch((error) => setCurrentFriends({ isLoaded: true, items: null, meta: null }))
        }
    }, [user?.id])

    useEffect(() => {
        if (user?.id) {
            getUsersOffersNotArchive(user?.id, 1, 100, 'desc')
                .then((res) => res && setUserOffers({ isLoaded: true, items: res.data, meta: res.meta }))
                .catch((error) => setUserOffers({ isLoaded: true, items: null, meta: null }))
        }
    }, [user?.id])
    const getAddsContent = () => {
        let content = []
        if (userOffers?.items)
            for (let i: number = 0; i < userOffers?.items?.length; i += 3) {
                content.push(
                    <div className={'row row-cols-3 g-1 g-sm-2 g-xl-4 text-center mt-1'}>
                        {userOffers?.items[i] && (
                            <div>
                                <div className="acc-box ads d-flex flex-column justify-content-between h-100">
                                    <div></div>
                                    <div>
                                        <img
                                            src={checkPhotoPath(userOffers?.items[i]?.image)}
                                            alt={userOffers?.items[i]?.categoryForUser}
                                            className="ads-img"
                                        />
                                    </div>
                                    <div className="fw_5 f_09 mt-2">{userOffers?.items[i]?.categoryForUser}</div>
                                    <div className="gray f_09 mt-1">{userOffers?.items[i]?.subsection?.area?.name}</div>
                                </div>
                            </div>
                        )}
                        {userOffers?.items[i + 1] && (
                            <div>
                                <div className="acc-box ads d-flex flex-column justify-content-between h-100">
                                    <div>
                                        <img
                                            src={checkPhotoPath(userOffers?.items[i + 1]?.image)}
                                            alt={userOffers?.items[i + 1]?.categoryForUser}
                                            className="ads-img"
                                        />
                                    </div>
                                    <div className="fw_5 f_09 mt-2">{userOffers?.items[i + 1]?.categoryForUser}</div>
                                    <div className="gray f_09 mt-1">
                                        {userOffers?.items[i + 1]?.subsection?.area?.name}
                                    </div>
                                </div>
                            </div>
                        )}
                        {userOffers?.items[i + 2] && (
                            <div>
                                <div className="acc-box ads d-flex flex-column justify-content-between h-100">
                                    <div>
                                        <img
                                            src={checkPhotoPath(userOffers?.items[i + 2]?.image)}
                                            alt={userOffers?.items[i + 2]?.categoryForUser}
                                            className="ads-img"
                                        />
                                    </div>
                                    <div className="fw_5 f_09 mt-2">{userOffers?.items[i + 2]?.categoryForUser}</div>
                                    <div className="gray f_09 mt-1">
                                        {userOffers?.items[i + 2]?.subsection?.area?.name}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )
            }
        return content
    }

    return (
        <>
            <Link to="/account" className="color-1 f_11 fw_5 d-flex align-items-center d-lg-none mb-3 mb-sm-4">
                <MdOutlineArrowBack /> <span className="ms-2">Назад</span>
            </Link>
            <div className="acc-box">
                <div className="row">
                    <div className="col-md-4 mb-3 mb-sm-4 mb-md-0">
                        <h4 className="fw_7 text-center">{user?.fullName}</h4>
                        <img src={checkPhotoPath(user?.avatar)} alt={user?.fullName} className="user-photo" />
                        <div className="acc-box acc-friends mt-3 mt-xl-4">
                            <div className="d-flex flex-column align-items-center">
                                <Link to="/account/profile/partners">
                                    <span>Бизнес-партнёры</span>
                                    <span className="l-gray ms-2">{currentFriends?.meta?.total || 0}</span>
                                </Link>
                                <NavLink
                                    to="/account/profile/partners"
                                    className="blue mx-md-auto mx-xl-0 mt-md-2 mt-xl-0"
                                >
                                    <MdAddCircle className="f_12" />
                                    <span className="ms-1">Добавить</span>
                                </NavLink>
                            </div>

                            <div
                                className={
                                    currentFriends?.meta?.total && currentFriends?.meta?.total > 0
                                        ? 'row row-cols-3 g-3 mt-1'
                                        : 'd-flex flex-column align-items-center mt-3'
                                }
                            >
                                {currentFriends?.isLoaded ? (
                                    currentFriends?.meta && currentFriends?.meta?.total > 0 ? (
                                        currentFriends?.items?.map((friend) => (
                                            <NavLink key={friend.id} to={`/account/profile/user/${friend.id}`}>
                                                <div>
                                                    <img src={checkPhotoPath(friend?.avatar)} alt={friend?.fullName} />
                                                    <br/>

                                                    {friend.fullName}
                                                </div>
                                            </NavLink>

                                    ))
                                    ) : (
                                        <div>
                                            <h5>Нет партнеров</h5>
                                        </div>
                                    )
                                ) : (
                                    <div className="p-5 w-100 d-flex justify-content-center">
                                        <Loader color="#343434" />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="col-md-8">
                        <div className="acc-box">
                            <Link to="/account/settings" className="d-block blue f_09 mb-2 mb-sm-4">
                                Редактировать информацию
                            </Link>
                            <div className={`table-responsive`}>
                                {user ? (
                                    <table className="table table-borderless acc-table mb-0">
                                        {user?.type === 0 && (
                                            <tbody>
                                                <tr>
                                                    <td className="l-gray">Дата рождения:</td>
                                                    <td className="color-1">
                                                        {user?.birthday ? user?.birthdayForUser : 'Не установлено'}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="l-gray">Город:</td>
                                                    <td className="color-1">
                                                        {user?.city ? user?.city : 'Не установлено'}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="l-gray">Номер телефона:</td>
                                                    <td className="color-1">
                                                        {user?.phone ? user?.phone : 'Не установлено'}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="l-gray">Адрес эл. почты:</td>
                                                    <td className="color-1">
                                                        {user?.email ? user?.email : 'Не установлено'}
                                                    </td>
                                                </tr>
                                                {user.type !== 0 && (
                                                    <tr>
                                                        <td className="l-gray">ИНН:</td>
                                                        <td className="color-1">
                                                            {user?.taxpayerIdentificationNumber
                                                                ? user?.taxpayerIdentificationNumber
                                                                : 'Не установлено'}
                                                        </td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        )}
                                        {user?.type === 1 && (
                                            <tbody>
                                                <tr>
                                                    <td className="l-gray">Компания:</td>
                                                    <td className="color-1">
                                                        {user?.companyName ? user?.companyName : 'Не установлено'}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="l-gray">ОГРНИП:</td>
                                                    <td className="color-1">
                                                        {user?.mainStateRegistrationNumber
                                                            ? user?.mainStateRegistrationNumber
                                                            : 'Не установлено'}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="l-gray">ИНН:</td>
                                                    <td className="color-1">
                                                        {user?.taxpayerIdentificationNumber
                                                            ? user?.taxpayerIdentificationNumber
                                                            : 'Не установлено'}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="l-gray">Город:</td>
                                                    <td className="color-1">
                                                        {user?.city ? user?.city : 'Не установлено'}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="l-gray">Номер телефона:</td>
                                                    <td className="color-1">
                                                        {user?.phone ? user?.phone : 'Не установлено'}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="l-gray">Адрес эл. почты:</td>
                                                    <td className="color-1">
                                                        {user?.email ? user?.email : 'Не установлено'}
                                                    </td>
                                                </tr>
                                            </tbody>
                                        )}
                                        {user?.type === 2 && (
                                            <tbody>
                                                <tr>
                                                    <td className="l-gray">Компания:</td>
                                                    <td className="color-1">
                                                        {user?.companyName ? user?.companyName : 'Не установлено'}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="l-gray">ОГРН:</td>
                                                    <td className="color-1">
                                                        {user?.mainStateRegistrationNumber
                                                            ? user?.mainStateRegistrationNumber
                                                            : 'Не установлено'}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="l-gray">ИНН:</td>
                                                    <td className="color-1">
                                                        {user?.taxpayerIdentificationNumber
                                                            ? user?.taxpayerIdentificationNumber
                                                            : 'Не установлено'}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="l-gray">Юридический адрес:</td>
                                                    <td className="color-1">
                                                        {user?.legalAddress ? user?.legalAddress : 'Не установлено'}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="l-gray">Город:</td>
                                                    <td className="color-1">
                                                        {user?.city ? user?.city : 'Не установлено'}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="l-gray">Номер телефона:</td>
                                                    <td className="color-1">
                                                        {user?.phone ? user?.phone : 'Не установлено'}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="l-gray">Адрес эл. почты:</td>
                                                    <td className="color-1">
                                                        {user?.email ? user?.email : 'Не установлено'}
                                                    </td>
                                                </tr>
                                            </tbody>
                                        )}
                                    </table>
                                ) : (
                                    <div className="p-5 w-100 d-flex justify-content-center">
                                        <Loader color="#343434" />
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="acc-box mt-3 mt-m-4 mt-xl-5">
                            <div className="f_09 d-flex justify-content-between">
                                <div>
                                    Объявления <span className="l-gray">{userOffers?.meta?.total || 0}</span>
                                </div>
                                {userOffers?.meta && userOffers?.meta?.total > 6 ? (
                                    <button onClick={() => setSliceNumber(100)}>Показать все</button>
                                ) : (
                                    ''
                                )}
                            </div>
                            <div
                                className={
                                    userOffers?.meta?.total && userOffers?.meta?.total > 0
                                        ? ''
                                        : 'd-flex flex-row justify-content-center'
                                }
                            >
                                {userOffers?.isLoaded ? (
                                    userOffers?.meta?.total && userOffers?.meta?.total > 0 ? (
                                        getAddsContent()
                                    ) : (
                                        <div>
                                            <h5>Нет объявлений</h5>
                                        </div>
                                    )
                                ) : (
                                    <div className="p-5 w-100 d-flex justify-content-center">
                                        <Loader color="#343434" />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UserProfile
