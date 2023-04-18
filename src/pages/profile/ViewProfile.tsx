import React, { BaseSyntheticEvent, FC, useEffect, useState } from 'react'
import { Link, NavLink, useNavigate, useParams } from 'react-router-dom'
import {MdInfoOutline, MdOutlineArrowBack, MdOutlineQuestionAnswer} from 'react-icons/md'
import { IUseStateItem, IUseStateItems } from '../../types'
import { IUser } from '../../types/user'
import { getIdChat, getUserInfo } from '../../services/users'
import { IOffersItem, IOffersMeta } from '../../types/offers'
import { getUsersOffersNotArchive } from '../../services/offers'
import { checkPhotoPath } from '../../helpers/photoLoader'
import Loader from '../../components/utils/Loader'
import { createFriend, deleteFriend } from '../../services/friends'
import { useAppDispatch, useAppSelector } from '../../hooks/store'
import { emitCreateWithoutTopicMessage } from '../../services/sockets/messages'
import { showAlert } from '../../store/reducers/alertSlice'
import CustomModal from '../../components/utils/CustomModal'
import {IUseStateReportType} from "../../types/report";
import {createReport, getAdvReportType, getUserReportType} from "../../services/reports";
import ValidateWrapper from "../../components/utils/ValidateWrapper";
import {useForm} from "react-hook-form";

const ViewProfile: FC = () => {
    const { id } = useParams()
    const {register, setValue, formState: {errors}, handleSubmit, reset} = useForm()
    const user: IUser | null = useAppSelector((state) => state?.user?.user)
    const [userInfo, setUserInfo] = useState<IUseStateItem<IUser>>({
        isLoaded: false,
        item: null,
    })

    const [userOffers, setUserOffers] = useState<IUseStateItems<IOffersItem, IOffersMeta>>({
        isLoaded: false,
        meta: null,
        items: null,
    })
    const [messagePayload, setMessagePayload] = useState({
        text: '',
        conversationId: 0,
    })
    const [idChat, setIdChat] = useState()

    const [isShowModalReport, setIsShowModalReport] = useState<boolean>(false)
    const [reportUserTypes, setReportUserTypes] = useState<IUseStateReportType>({
        isLoaded: true,
        error: null,
        items: null,
    })

    useEffect(() => {
        getUserReportType()
            .then((res) => res && setReportUserTypes({isLoaded: true, items: res, error: null}))
            .catch(() => setReportUserTypes({isLoaded: true, items: null, error: 'Произошла ошибка'}))
    }, [])


    const [isShowMessageModal, setIsShowMessageModal] = useState(false)
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (id && user?.id) {
            getUserInfo(+id, user?.id)
                .then((res) => res && setUserInfo({ isLoaded: true, item: res }))
                .catch((error) => setUserInfo({ isLoaded: true, item: null }))
        }
    }, [id, user?.id])

    useEffect(() => {
        if (id) {
            getUsersOffersNotArchive(+id, 1, 6, 'desc')
                .then((res) => res && setUserOffers({ isLoaded: true, items: res.data, meta: res.meta }))
                .catch((error) => setUserOffers({ isLoaded: true, items: null, meta: null }))
        }
    }, [id])

    useEffect(() => {
        if (user && userInfo?.item?.id) {
            getIdChat(userInfo?.item?.id).then(res => setIdChat(res.id))
        }
    }, [userInfo?.item])


    const onSubmitCreateFriend = () => {
        if (user && id) {
            createFriend({ fromId: user?.id, toId: +id })
                .then(() => {
                    if (id && user?.id) {
                        dispatch(
                            showAlert({
                                message: 'Заявка успешно отправлена',
                                typeAlert: 'good',
                            })
                        )
                        getUserInfo(+id, user?.id)
                            .then((res) => res && setUserInfo({ isLoaded: true, item: res }))
                            .catch((error) => setUserInfo({ isLoaded: true, item: null }))
                    }
                })
                .catch(() => console.log())
        }
    }
    const onSubmit=(data:any)=>{
        const req = {...data, toId:userInfo?.item?.id, userId:user?.id}
        createReport(req)
            .then(() => {
                dispatch(showAlert({message: 'Жалоба успешно отправлена', typeAlert: 'good'}))
                setIsShowModalReport(false)
                reset()
            })
            .catch(() => dispatch(showAlert({message: 'Произошла ошибка', typeAlert: 'bad'})))

    }
    const onSubmitRemoveFromFriend = () => {
        if (user && id) {
            deleteFriend({ fromId: user?.id, toId: +id })
                .then(() => {
                    if (id && user?.id) {
                        dispatch(
                            showAlert({
                                message: 'Заявка успешно отменена',
                                typeAlert: 'good',
                            })
                        )

                        getUserInfo(+id, user?.id)
                            .then((res) => res && setUserInfo({ isLoaded: true, item: res }))
                            .catch((error) => setUserInfo({ isLoaded: true, item: null }))
                    }
                })
                .catch(() => console.log())
        }
    }
    const getAddsContent = () => {
        let content = []
        if (userOffers?.items)
            for (let i: number = 0; i < userOffers?.items?.length; i += 3) {
                content.push(
                    <div className={'row row-cols-3 g-1 g-sm-2 g-xl-4 text-center mt-1'} key={`user-offer-1115${i}`} >
                        {userOffers?.items[i] && (
                            <div key={i}>
                                <NavLink to={`/adv-page/${userOffers?.items[i].id}`}>
                                    <div className="acc-box ads d-flex flex-column justify-content-between h-100">
                                        <div>
                                            <img
                                                src={checkPhotoPath(userOffers?.items[i]?.image)}
                                                alt={userOffers?.items[i]?.categoryForUser}
                                                className="ads-img"
                                            />
                                        </div>
                                        <div className="fw_5 f_09 mt-2">{userOffers?.items[i]?.categoryForUser}</div>
                                        <div
                                            className="gray f_09 mt-1">{userOffers?.items[i]?.subsection?.area?.name}</div>
                                    </div>
                                </NavLink>
                            </div>
                        )}
                        {userOffers?.items[i + 1] && (
                            <div key={i + 1}>
                                <NavLink to={`/adv-page/${userOffers?.items[i + 1].id}`} key={`user-offer-11${i}`} >
                                    <div className="acc-box ads d-flex flex-column justify-content-between h-100">
                                        <div>
                                            <img
                                                src={checkPhotoPath(userOffers?.items[i + 1]?.image)}
                                                alt={userOffers?.items[i + 1]?.categoryForUser}
                                                className="ads-img"
                                            />
                                        </div>
                                        <div
                                            className="fw_5 f_09 mt-2">{userOffers?.items[i + 1]?.categoryForUser}</div>
                                        <div className="gray f_09 mt-1">
                                            {userOffers?.items[i + 1]?.subsection?.area?.name}
                                        </div>
                                    </div>
                                </NavLink>
                            </div>
                        )}
                        {userOffers?.items[i + 2] && (
                            <div key={i + 2}>
                                <NavLink to={`/adv-page/${userOffers?.items[i + 2].id}`} key={`user-offer-111${i}`} >
                                    <div className="acc-box ads d-flex flex-column justify-content-between h-100">
                                        <div>
                                            <img
                                                src={checkPhotoPath(userOffers?.items[i + 2]?.image)}
                                                alt={userOffers?.items[i + 2]?.categoryForUser}
                                                className="ads-img"
                                            />
                                        </div>
                                        <div
                                            className="fw_5 f_09 mt-2">{userOffers?.items[i + 2]?.categoryForUser}</div>
                                        <div className="gray f_09 mt-1">
                                            {userOffers?.items[i + 2]?.subsection?.area?.name}
                                        </div>
                                    </div>
                                </NavLink>
                            </div>
                        )}
                    </div>
                )
            }
        return content
    }
    const createWithTopicMessage = (e: BaseSyntheticEvent) => {
        e.preventDefault()
        if (id) {
            emitCreateWithoutTopicMessage(id, messagePayload).then((res) => {
                res?.status === 200 &&
                    dispatch(
                        showAlert({
                            message: 'Сообщение успешно отправлено',
                            typeAlert: 'good',
                        })
                    )
                setIsShowMessageModal(false)
            })
        }
    }
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
                        {user?.id != id && userInfo?.item && (
                            <div className="acc-box mt-3 mt-xl-4 position-relative">
                                <>
                                    <Link
                                        to={`/account/chat/window/${idChat ? idChat : 'new'}`}
                                        state={{ userName: userInfo?.item.fullName, userId: userInfo?.item.id, avatar: userInfo?.item.avatar }}
                                    >
                                        <button
                                            type="button"
                                            className="d-flex align-items-center blue fw_6"
                                        >
                                            <MdOutlineQuestionAnswer className="f_17" />
                                            <span className="ms-1 ms-sm-3 text-start">Написать сообщение</span>
                                        </button>
                                        <hr className="my-3" />
                                    </Link>
                                </>
                                {!userInfo?.item?.outgoingStatus && !userInfo?.item?.incomingStatus && !userInfo?.item?.friendStatus && (
                                    <button
                                        type="button"
                                        className="text-start color-1 f_09"
                                        onClick={() => {
                                            onSubmitCreateFriend()
                                        }}
                                    >
                                        Добавить в бизнес-партнеры
                                    </button>
                                )}
                                {userInfo?.item?.outgoingStatus && !userInfo?.item?.incomingStatus && (
                                    <button
                                        type="button"
                                        className="text-start color-1 f_09"
                                        onClick={() => {
                                            onSubmitRemoveFromFriend()
                                        }}
                                    >
                                        Отменить заявку
                                    </button>
                                )}
                                {!userInfo?.item?.outgoingStatus && userInfo?.item?.incomingStatus && (
                                    <button
                                        type="button"
                                        className="text-start color-1 f_09"
                                        onClick={() => {
                                            onSubmitCreateFriend()
                                        }}
                                    >
                                        Принять заявку
                                    </button>
                                )}
                                {userInfo?.item?.friendStatus && (
                                    <button
                                        type="button"
                                        className="text-start color-1 f_09"
                                        onClick={() => {
                                            onSubmitRemoveFromFriend()
                                        }}
                                    >
                                        Удалить из партнёров
                                    </button>
                                )}
                                {
                                    <div className={'badAdv'} title={'Пожаловаться'} onClick={() => {
                                        setIsShowModalReport(true)
                                    }}>
                                        <MdInfoOutline className="f_11 gray"/>
                                    </div>

                                }

                            </div>
                        )}
                    </div>
                    <div className="col-md-8">
                        <div className="acc-box">
                            <div className="table-responsive">
                                <table className="table table-borderless acc-table mb-0">
                                    <tbody>
                                        {userInfo?.item?.type === 0 && userInfo?.item?.birthday && (
                                            <tr>
                                                <td className="l-gray">Дата рождения:</td>
                                                <td className="color-1">{userInfo.item.birthdayForUser}</td>
                                            </tr>
                                        )}
                                        {userInfo?.item?.type === 1 && (
                                            <>
                                                {userInfo?.item?.companyName &&
                                                    <tr>
                                                        <td className="l-gray">Компания:</td>
                                                        <td className="color-1">{userInfo?.item?.companyName}</td>
                                                    </tr>
                                                }
                                                {userInfo?.item?.mainStateRegistrationNumber &&
                                                    <tr>
                                                        <td className="l-gray">ОГРНИП:</td>
                                                        <td className="color-1">{userInfo?.item?.mainStateRegistrationNumber}</td>
                                                    </tr>
                                                }
                                                {userInfo?.item?.taxpayerIdentificationNumber &&
                                                    <tr>
                                                        <td className="l-gray">ИНН:</td>
                                                        <td className="color-1">
                                                            {userInfo?.item?.taxpayerIdentificationNumber}
                                                        </td>
                                                    </tr>
                                                }
                                            </>
                                        )}
                                        {userInfo?.item?.type === 2 && (
                                            <>
                                                {userInfo?.item?.companyName &&
                                                    <tr>
                                                        <td className="l-gray">Компания:</td>
                                                        <td className="color-1">{userInfo?.item?.companyName}</td>
                                                    </tr>
                                                }
                                                {userInfo?.item?.mainStateRegistrationNumber &&
                                                    <tr>
                                                        <td className="l-gray">ОГРН:</td>
                                                        <td className="color-1">{userInfo?.item?.mainStateRegistrationNumber}</td>
                                                    </tr>}
                                                {userInfo?.item?.taxpayerIdentificationNumber &&
                                                    <tr>
                                                        <td className="l-gray">ИНН:</td>
                                                        <td className="color-1">{userInfo?.item?.taxpayerIdentificationNumber}</td>
                                                    </tr>}
                                                {userInfo?.item?.legalAddress &&
                                                    <tr>
                                                        <td className="l-gray">Юридический адрес:</td>
                                                        <td className="color-1">{userInfo?.item?.legalAddress}</td>
                                                    </tr>
                                                }
                                            </>
                                        )}
                                        {userInfo?.item?.city &&
                                            <tr>
                                                <td className="l-gray">Город:</td>
                                                <td className="color-1">{userInfo?.item?.city}</td>
                                            </tr>}
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
            <CustomModal
                isShow={isShowMessageModal}
                setIsShow={setIsShowMessageModal}
                centered={false}
                closeButton={true}
                className="modal__messages"
            >
                <form>
                    <div className="m-3">
                        <label>Текст сообщения:</label>
                        <textarea
                            placeholder="Введите сообщение..."
                            value={messagePayload.text || ''}
                            onChange={(e) => setMessagePayload((prevState) => ({ ...prevState, text: e.target.value }))}
                        />
                        {messagePayload?.text?.length === 0 ? (
                            <span className="gray-text">
                                <sup>*</sup>Минимум 1 знак
                            </span>
                        ) : null}
                    </div>
                    <div className="d-flex justify-content-center mt-5">
                        <button
                            className="btn_main btn_1"
                            onClick={(event: BaseSyntheticEvent) =>
                                messagePayload?.text?.length >= 1
                                    ? createWithTopicMessage(event)
                                    : event.preventDefault()
                            }
                        >
                            Отправить
                        </button>
                    </div>
                </form>
            </CustomModal>
            <CustomModal
                isShow={isShowModalReport}
                setIsShow={setIsShowModalReport}
                centered={false}
                closeButton={true}
                className="modal__report"
            >
                <div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div>
                            <label className="fs-12">Выберите причину жалобы: </label>
                            <ValidateWrapper error={errors.reportTypeId}>
                                <select
                                    {...register('reportTypeId', {
                                        required: 'Обязательное поле',
                                    })}
                                >
                                    {reportUserTypes?.isLoaded ? (
                                        reportUserTypes?.items?.map((i) => (
                                            <option value={i.id} key={i.id}>
                                                {i.name}
                                            </option>
                                        ))
                                    ) : (
                                        <option>Загрузка</option>
                                    )}
                                </select>
                            </ValidateWrapper>
                        </div>
                        <div className="mt-3 mb-3">
                            <label className="fs-12">Текст жалобы: </label>
                            <ValidateWrapper error={errors.description}>
                                <textarea
                                    {...register('description', {
                                        required: 'Обязательное поле',
                                        minLength: {value: 5, message: 'Минимум 5 символов'},
                                        maxLength: {value: 250, message: 'Максимум 250 символов'},
                                    })}
                                />
                            </ValidateWrapper>
                        </div>
                        <div className="d-flex justify-content-center">
                            <button
                                type="submit"
                                className="btn_main btn_1"
                            >
                                Отправить
                            </button>
                        </div>
                    </form>
                </div>
            </CustomModal>
        </>
    )
}

export default ViewProfile
