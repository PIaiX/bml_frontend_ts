import React, {FC, useEffect, useState} from 'react'
import {Link, useParams} from 'react-router-dom'
import {MdMoreHoriz, MdOutlineArrowBack, MdOutlineQuestionAnswer, MdReply} from 'react-icons/md'
import {IUseStateItem, IUseStateItems} from '../../types'
import {IUser} from '../../types/user'
import {getUserInfo} from '../../services/users'
import {IOffersItem, IOffersMeta} from '../../types/offers'
import {getUsersOffersNotArchive} from '../../services/offers'
import {checkPhotoPath} from '../../helpers/photoLoader'
import Loader from '../../components/utils/Loader'

const ViewProfile: FC = () => {
    const {id} = useParams()
    const [userInfo, setUserInfo] = useState<IUseStateItem<IUser>>({
        isLoaded: false,
        item: null,
    })
    const [userOffers, setUserOffers] = useState<IUseStateItems<IOffersItem, IOffersMeta>>({
        isLoaded: false,
        meta: null,
        items: null,
    })

    useEffect(() => {
        if (id) {
            getUserInfo(+id)
                .then((res) => res && setUserInfo({isLoaded: true, item: res}))
                .catch((error) => setUserInfo({isLoaded: true, item: null}))
        }
    }, [id])

    useEffect(() => {
        if (id) {
            getUsersOffersNotArchive(+id, 1, 6, 'desc')
                .then((res) => res && setUserOffers({isLoaded: true, items: res.data, meta: res.meta}))
                .catch((error) => setUserOffers({isLoaded: true, items: null, meta: null}))
        }
    }, [id])

    return (
        <>
            <Link to="/account" className="color-1 f_11 fw_5 d-flex align-items-center d-lg-none mb-3 mb-sm-4">
                <MdOutlineArrowBack /> <span className="ms-2">Назад</span>
            </Link>
            <div className="acc-box">
                <div className="row">
                    <div className="col-md-4 mb-3 mb-sm-4 mb-md-0">
                        <h4 className="fw_7 text-center">{userInfo?.item?.fullName}</h4>
                        <img
                            src={checkPhotoPath(userInfo?.item?.avatar)}
                            alt={userInfo?.item?.fullName}
                            className="user-photo"
                        />
                        <div className="acc-box mt-3 mt-xl-4">
                            <button type="button" className="d-flex align-items-center blue fw_6">
                                <MdOutlineQuestionAnswer className="f_17" />
                                <span className="ms-1 ms-sm-3 text-start">Написать сообщение</span>
                            </button>
                            <hr className="my-3" />
                            <button type="button" className="text-start color-1 f_09">
                                Добавить в бизнес-партнёры
                            </button>
                            <hr className="my-3" />
                            <button type="button" className="l-gray d-flex align-items-center">
                                <MdReply className="f_17" />
                                <span className="f_09 text-start ms-3">Поделиться</span>
                            </button>
                            <button type="button" className="l-gray mt-3">
                                <MdMoreHoriz className="f_17" />
                                <span className="f_09 text-start ms-3">Еще</span>
                            </button>
                        </div>
                    </div>
                    <div className="col-md-8">
                        <div className="acc-box">
                            <div className="table-responsive">
                                <table className="table table-borderless acc-table mb-0">
                                    <tbody>
                                        {userInfo?.item?.type === 0 && (
                                            <>
                                                <tr>
                                                    <td className="l-gray">Дата рождения:</td>
                                                    <td className="color-1">
                                                        {userInfo?.item?.birthday
                                                            ? userInfo?.item?.birthdayForUser
                                                            : 'Не установлено'}
                                                    </td>
                                                </tr>
                                            </>
                                        )}
                                        {userInfo?.item?.type === 1 && (
                                            <>
                                                <tr>
                                                    <td className="l-gray">Компания:</td>
                                                    <td className="color-1">
                                                        {userInfo?.item?.companyName
                                                            ? userInfo?.item?.companyName
                                                            : 'Не установлено'}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="l-gray">ОГРНИП:</td>
                                                    <td className="color-1">
                                                        {userInfo?.item?.mainStateRegistrationNumber
                                                            ? userInfo?.item?.birthdayForUser
                                                            : 'Не установлено'}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="l-gray">ИНН:</td>
                                                    <td className="color-1">
                                                        {userInfo?.item?.taxpayerIdentificationNumber
                                                            ? userInfo?.item?.taxpayerIdentificationNumber
                                                            : 'Не установлено'}
                                                    </td>
                                                </tr>
                                            </>
                                        )}
                                        {userInfo?.item?.type === 2 && (
                                            <>
                                                <tr>
                                                    <td className="l-gray">Компания:</td>
                                                    <td className="color-1">
                                                        {userInfo?.item?.companyName
                                                            ? userInfo?.item?.companyName
                                                            : 'Не установлено'}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="l-gray">ОГРН:</td>
                                                    <td className="color-1">
                                                        {userInfo?.item?.mainStateRegistrationNumber
                                                            ? userInfo?.item?.birthdayForUser
                                                            : 'Не установлено'}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="l-gray">ИНН:</td>
                                                    <td className="color-1">
                                                        {userInfo?.item?.taxpayerIdentificationNumber
                                                            ? userInfo?.item?.taxpayerIdentificationNumber
                                                            : 'Не установлено'}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="l-gray">Юридический адрес:</td>
                                                    <td className="color-1">
                                                        {userInfo?.item?.taxpayerIdentificationNumber
                                                            ? userInfo?.item?.taxpayerIdentificationNumber
                                                            : 'Не установлено'}
                                                    </td>
                                                </tr>
                                            </>
                                        )}
                                        <tr>
                                            <td className="l-gray">Город:</td>
                                            <td className="color-1">
                                                {userInfo?.item?.city ? userInfo?.item?.city : 'Не установлено'}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="l-gray">Номер телефона:</td>
                                            <td className="color-1">***********</td>
                                        </tr>
                                        <tr>
                                            <td className="l-gray">Адрес эл. почты:</td>
                                            <td className="color-1">***********</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div className="acc-box mt-3 mt-m-4 mt-xl-5">
                            <div className="f_09 d-flex justify-content-between">
                                <div>
                                    Объявления <span className="l-gray">{userOffers?.meta?.total || 0}</span>
                                </div>
                                <a href="/" className="color-1">
                                    Показать все
                                </a>
                            </div>
                            <div
                                className={
                                    userOffers?.meta?.total && userOffers?.meta?.total > 0
                                        ? 'row row-cols-3 g-1 g-sm-2 g-xl-4 text-center mt-1'
                                        : 'd-flex flex-row justify-content-center'
                                }
                            >
                                {userOffers?.isLoaded ? (
                                    userOffers?.meta?.total && userOffers?.meta?.total > 0 ? (
                                        userOffers?.items?.map((offer) => (
                                            <div key={offer?.id}>
                                                <div className="acc-box ads">
                                                    <img
                                                        src={checkPhotoPath(offer?.image)}
                                                        alt={offer?.categoryForUser}
                                                        className="ads-img"
                                                    />
                                                    <div className="fw_5 f_09 mt-2">{offer?.categoryForUser}</div>
                                                    <div className="gray f_09 mt-1">
                                                        {offer?.subsection?.area?.name}
                                                    </div>
                                                </div>
                                            </div>
                                        ))
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

export default ViewProfile
