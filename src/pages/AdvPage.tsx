import React, {BaseSyntheticEvent, FC, useEffect, useState,} from 'react'
import Breadcrumbs from '../components/utils/Breadcrumbs'
import AdvPreview from '../components/AdvPreview'
import {NavLink, useNavigate, useParams} from 'react-router-dom'
import {MdDateRange, MdInfoOutline, MdOutlinePlace, MdOutlineVisibility} from 'react-icons/md'
import BtnFav from '../components/utils/BtnFav'
import {PhotoProvider, PhotoView} from 'react-photo-view'
import 'react-photo-view/dist/react-photo-view.css'
import PartnersSite from '../components/PartnersSite'
import {Swiper, SwiperSlide} from 'swiper/react'
import {Pagination} from 'swiper'
import 'swiper/css'
import 'swiper/css/pagination'
import {getOffers, getOneOffer} from '../services/offers'
import {IUseStateItem, IUseStateItems} from '../types'
import {IOfferItem, IOffersItem, IOffersMeta} from '../types/offers'
import {checkPhotoPath} from '../helpers/photoLoader'
import LeftMenuInOfferContainer from '../components/containers/LeftMenuInOffer'
import ShortInfoInOfferContainer from '../components/containers/ShortInfoInOffer'
import {createReport, getAdvReportType, getOfferReportType} from '../services/reports'
import {IUser} from '../types/user'
import {useAppDispatch, useAppSelector} from '../hooks/store'
import Loader from '../components/utils/Loader'
import {IUseStateReportType, PayloadsReport} from '../types/report'
import {useForm} from 'react-hook-form'
import {showAlert} from '../store/reducers/alertSlice'
import {emitCreateMessage} from '../services/sockets/messages'
import FunctionForPrice from '../helpers/FunctionForPrice'
import {convertLocaleDate} from "../helpers/convertLocaleDate";
import {getIdChat} from "../services/users";
import {getAdvertisings} from "../services/advertising";
import {Advertisings} from "../types/advertising";
import {MyEditor} from "../components/MyEditor/MyEditor";
import CustomModal from "../components/utils/CustomModal";
import ValidateWrapper from "../components/utils/ValidateWrapper";
import {correctLink} from "../helpers/correctLink";
const AdvPage: FC = () => {
    const navigate = useNavigate()
    const {id} = useParams()
    const [idChat, setIdChat] = useState();
    const [offer, setOffer] = useState<IUseStateItem<IOfferItem>>({
        isLoaded: false,
        item: null,
    })
    const user: IUser | null = useAppSelector((state) => state?.user?.user)
    const [isShowModalReport, setIsShowModalReport] = useState<boolean>(false)
    const [similarOffers, setSimilarOffers] = useState<IUseStateItems<IOffersItem, IOffersMeta>>({
        isLoaded: false,
        items: null,
        meta: null,
    })
    const [idAdvForBad, setIdAdvForBad] = useState<number | undefined>()

    useEffect(() => {
        if (!isShowModalReport)
            setIdAdvForBad(undefined)
    }, [isShowModalReport])

    const [advertising, setAdvertising] = useState<Advertisings>()
    const [reportTypes, setReportTypes] = useState<IUseStateReportType>({
        isLoaded: true,
        error: null,
        items: null,
    })
    const [reportAdsTypes, setReportAdsTypes] = useState<IUseStateReportType>({
        isLoaded: true,
        error: null,
        items: null,
    })

    const {
        register,
        formState: {errors},
        handleSubmit,
        setValue,
        reset,
    } = useForm<PayloadsReport>({mode: 'onSubmit', reValidateMode: 'onChange'})
    const dispatch = useAppDispatch()
    const [isShowMessageModal, setIsShowMessageModal] = useState<boolean>(false)
    const [messagePayload, setMessagePayload] = useState({
        text: '',
        offerId: id,
        conversationId: 0
    })

    useEffect(() => {
        if(messagePayload?.text!=='')
            createWithOfferTopicMessage()
    }, [messagePayload])

    useEffect(() => {
        getAdvertisings(2).then(res => {
            setAdvertising(res)
        })
    }, [offer?.item?.id])

    useEffect(() => {
        if (user && offer?.item?.user?.id) {
            getIdChat(offer?.item?.user?.id).then(res => res && setIdChat(res.id))
        }
    }, [offer])

    useEffect(() => {

        if (id) {
            getOneOffer(id, user?.id)
                .then((res) => {
                    res && setOffer({isLoaded: true, item: res})
                })
                .catch((error) => {
                    setOffer({isLoaded: true, item: null})
                })
        }
    }, [id, user?.id])

    useEffect(() => {
        getOfferReportType()
            .then((res) => res && setReportTypes({isLoaded: true, items: res, error: null}))
            .catch(() => setReportTypes({isLoaded: true, items: null, error: 'Произошла ошибка'}))
    }, [])

    useEffect(() => {
        getAdvReportType()
            .then((res) => res && setReportAdsTypes({isLoaded: true, items: res, error: null}))
            .catch(() => setReportAdsTypes({isLoaded: true, items: null, error: 'Произошла ошибка'}))
    }, [])

    useEffect(() => {
        if (offer?.item) {
            const payloads = {}
            getOffers(1, 10, offer?.item?.category, user ? user.id : null, payloads, true)
                .then((res) => setSimilarOffers({isLoaded: true, items: res?.data, meta: res?.meta}))
                .catch(() => setSimilarOffers({isLoaded: true, items: null, meta: null}))
        }
    }, [offer?.item])

    const returnDescriptionName = () => {
        const category = offer?.item?.category
        if (category === 0 || category === 1 || category === 2) {
            return 'Описание объявления'
        } else if (category === 3) {
            return 'Описание бизнеса'
        } else if (category === 4) {
            return 'Описание франшизы'
        } else {
            return 'Описание чего-то'
        }
    }
    const aboutMeBlock = () => {
        if (offer?.item?.category || offer?.item?.category === 0) {
            if (3 > offer?.item?.category) {
                return (
                    <section className="anchor_block" id="anchor_about_me">
                        <h4 className="fw_7">О себе</h4>
                        <MyEditor readOnly={true} value={offer?.item?.about}/>
                    </section>
                )
            }
        }
    }

    const onSubmit = (data: PayloadsReport) => {
        let req: any = {...data}
        if (idAdvForBad) {
            const {description, reportTypeId} = req
            req = {description, reportTypeId, userId: user?.id, advertisementId: idAdvForBad}
        }
        createReport(req)
            .then(() => {
                dispatch(showAlert({message: 'Жалоба успешно отправлена', typeAlert: 'good'}))
                setIsShowModalReport(false)
                reset()
            })
            .catch(() => dispatch(showAlert({message: 'Произошла ошибка', typeAlert: 'bad'})))
    }
    let swiperPB = 50;

    // console.log(offer.item?.description)
    const createWithOfferTopicMessage = () => {
        if (offer.item) {
            emitCreateMessage({userId: offer.item?.userId, text: messagePayload?.text, topic: offer.item?.title})
                .then(res => {
                    if (offer?.item?.user?.id)
                        getIdChat(offer?.item?.user?.id).then(res => res && setIdChat(res.id))
                    dispatch(showAlert({
                        message: 'Запрос на бизнес план отправлен',
                        typeAlert: 'good'
                    }))
                })
                .catch(e => {
                    dispatch(showAlert({message: 'Произошла ошибка', typeAlert: 'bad'}))
                })
        }
    }
    let srcToChat = '/enter'
    if (user)
        srcToChat = `/account/chat/window/${idChat ? idChat : 'new'}`


    const clickMessage = () => {
        if (user)
            navigate(srcToChat, {
                state: {
                    userName: offer?.item?.user.fullName,
                    userId: offer?.item?.user.id,
                    avatar: offer?.item?.user.avatar,
                    topic: offer.item?.title
                }
            })
        else
            dispatch(showAlert({
                message: 'Зарегистрируйтесь для отправки сообщений. ',
                typeAlert: 'neutral',
                withLink: true
            }))
    }

    if(!offer.isLoaded)
        return <main className={'d-flex justify-content-center py-5'}><Loader color={'#2E5193'} /></main>
    return (
        <main>
            <div className="container pt-3 pt-sm-4">
                <Breadcrumbs offer={offer?.item}/>
            </div>
            <section id="offer-page" className="container">
                <h1>{offer?.item?.title}</h1>
                <div className="d-lg-flex justify-content-between align-items-center mb-2 mb-sm-4">
                    <div className="short-info ms-auto mt-3 mt-sm-4 mt-lg-0">
                        <span>ID: {offer?.item?.id}</span>
                        <time className="d-flex align-items-center ms-3 ms-sm-4">
                            <MdDateRange/>
                            <span className="ms-1 ms-sm-2">{offer?.item?.createdAtForUser}</span>
                        </time>
                        <div className="d-flex align-items-center ms-3 ms-sm-4">
                            <MdOutlineVisibility/>
                            <span className="ms-1 ms-sm-2">{offer?.item?.viewsCount} просмотров</span>
                        </div>
                    </div>
                </div>

                <div className="row mb-3 mb-sm-4 mb-md-5">
                    <div className="col-lg-7 col-xl-8 mb-4 mb-lg-0">
                        <img src={checkPhotoPath(offer?.item?.image)} alt={offer?.item?.title} className="main-img"/>
                    </div>
                    <div className="col-lg-5 col-xl-4">
                        <div className="blue-box h-100 d-flex flex-column justify-content-between">
                            <div>
                                <div className="d-flex justify-content-between align-items-center mb-2 mb-sm-4">
                                    <NavLink
                                        to={'/account/profile/user/' + offer.item?.user.id}
                                        className="user d-flex align-items-center"
                                    >
                                        <img
                                            src={checkPhotoPath(offer?.item?.user?.avatar)}
                                            alt={offer?.item?.user?.fullName}
                                        />
                                        <div className="ms-2">
                                            <div className="f_11 font-weight-light">{offer?.item?.user?.fullName}</div>
                                            <div className="f_09">
                                                {offer?.item?.user?.type ?
                                                    offer?.item?.user?.companyName
                                                    : ''
                                                }
                                            </div>
                                        </div>
                                    </NavLink>
                                    <div className="d-flex align-items-center">
                                        <BtnFav
                                            check={offer?.item?.isFavorite}
                                            className={'color-2 f_20'}
                                            offerId={offer?.item?.id}
                                        />
                                    </div>
                                </div>

                                {/* Blue Box ------------------------------------------------------------------- */}
                                {offer?.item?.category === 0 && (
                                    <>
                                        <div className="d-flex align-items-center mb-3 justify-content-between">
                                            <span className="pt fw_7 gray f_11 me-2 me-sm-4">Инвестиции:</span>
                                            <span
                                                className="f_13 fw_5 text-nowrap">{FunctionForPrice(offer?.item?.investments)} ₽</span>
                                        </div>

                                        {offer?.item?.profitPerMonth &&
                                            <div className="d-flex align-items-center mb-3 justify-content-between">
                                                <span
                                                    className="pt fw_7 gray f_11 me-2 me-sm-4">Предполагаемая прибыль:</span>
                                                <span
                                                    className="f_13 fw_5 text-nowrap">{FunctionForPrice(offer?.item?.profitPerMonth)} ₽</span>
                                            </div>
                                        }

                                        {offer?.item?.paybackTimeForUser != '' &&
                                            <div className="d-flex align-items-center mb-3 justify-content-between">
                                                <span className="pt fw_7 gray f_11 me-2 me-sm-4">Окупаемость:</span>
                                                <span
                                                    style={{textAlign:'right'}}
                                                    className="f_13 fw_5 d-flex justify-content-end"
                                                >
                                                    {offer?.item?.paybackTimeForUser}
                                                </span>
                                            </div>}

                                        {offer?.item?.projectStage != 0 &&
                                            <div className="d-flex align-items-center mb-3 justify-content-between">
                                                <span className="pt fw_7 gray f_11 me-2 me-sm-4">Стадия проекта:</span>
                                                <span
                                                    className="f_13 fw_5 text-nowrap">{offer?.item?.projectStageForUser?.toLowerCase()}</span>
                                            </div>
                                        }

                                        <div className="d-flex align-items-center mb-3 justify-content-between">
                                            <span className="pt fw_7 gray f_11 me-2 me-sm-4">Сфера:</span>
                                            <span
                                                className="f_13 fw_5 text-nowrap">{offer?.item?.subsection?.area?.name}</span>
                                        </div>
                                    </>
                                )}

                                {offer?.item?.category === 1 && (
                                    <>
                                        <div className="d-flex align-items-center mb-3 justify-content-between">
                                            <span className="pt fw_7 gray f_11 me-2 me-sm-4">Инвестиции:</span>
                                            <span
                                                className="f_13 fw_5 text-nowrap">{FunctionForPrice(offer?.item?.investments)} ₽</span>
                                        </div>

                                        {offer?.item?.paybackTimeForUser != '' &&
                                            <div className="d-flex align-items-center mb-3 justify-content-between">
                                                <span className="pt fw_7 gray f_11 me-2 me-sm-4">Окупаемость:</span>
                                                <span
                                                    style={{textAlign:'right'}}
                                                    className="f_13 fw_5 d-flex"
                                                >
                                                    {offer?.item?.paybackTimeForUser}
                                                </span>
                                            </div>
                                        }

                                        <div className="d-flex align-items-center mb-3 justify-content-between">
                                            <span className="pt fw_7 gray f_11 me-2 me-sm-4">Сфера:</span>
                                            <span
                                                className="f_13 fw_5 text-nowrap">{offer?.item?.subsection?.area?.name}</span>
                                        </div>
                                    </>
                                )}


                                {offer?.item?.category === 2 && (
                                    <>
                                        <div className="d-flex align-items-center mb-3 justify-content-between">
                                            <span className="pt fw_7 gray f_11 me-2 me-sm-4">Инвестиции:</span>
                                            <span
                                                className="f_13 fw_5 text-nowrap">{FunctionForPrice(offer?.item?.investments)} ₽</span>
                                        </div>

                                        {offer?.item?.profit &&
                                            <div className="d-flex align-items-center mb-3 justify-content-between">
                                                <span
                                                    className="pt fw_7 gray f_11 me-2 me-sm-4">Предполагаемая прибыль:</span>
                                                <span
                                                    className="f_13 fw_5 text-nowrap">{FunctionForPrice(offer?.item?.profit)} ₽</span>
                                            </div>
                                        }


                                        {offer?.item?.paybackTimeForUser != '' &&
                                            <div className="d-flex align-items-center mb-3 justify-content-between">
                                                <span className="pt fw_7 gray f_11 me-2 me-sm-4">Окупаемость:</span>
                                                <span
                                                    style={{textAlign:'right'}}
                                                    className="f_13 fw_5"
                                                >
                                                    {offer?.item?.paybackTimeForUser}
                                                </span>
                                            </div>
                                        }

                                        {offer?.item?.projectStage != 0 &&
                                            <div className="d-flex align-items-center mb-3 justify-content-between">
                                                <span className="pt fw_7 gray f_11 me-2 me-sm-4">Стадия проекта:</span>
                                                <span
                                                    className="f_13 fw_5 text-nowrap">{offer?.item?.projectStageForUser?.toLowerCase()}</span>
                                            </div>
                                        }

                                        <div className="d-flex align-items-center mb-3 justify-content-between">
                                            <span className="pt fw_7 gray f_11 me-2 me-sm-4">Город:</span>
                                            <span className="f_13 fw_5 text-nowrap">{offer?.item?.city}</span>
                                        </div>
                                    </>
                                )}


                                {offer?.item?.category === 3 && (
                                    <>
                                        <div className="d-flex align-items-center mb-3 justify-content-between">
                                            <span className="pt fw_7 gray f_11 me-2 me-sm-4">Стоимость бизнеса:</span>
                                            <span
                                                className="f_13 fw_5 text-nowrap">{FunctionForPrice(offer?.item?.price)} ₽</span>
                                        </div>
                                        {offer?.item?.paybackTimeForUser &&
                                            <div className="d-flex align-items-center mb-3 justify-content-between">
                                                <span className="pt fw_7 gray f_11 me-2 me-sm-4">Окупаемость:</span>
                                                <span
                                                    style={{textAlign:'right'}}
                                                    className="f_13 fw_5"
                                                >
                                                    {offer?.item?.paybackTimeForUser}
                                                </span>
                                            </div>
                                        }
                                        {offer?.item?.profitPerMonth &&
                                            <div className="d-flex align-items-center mb-3 justify-content-between">
                                                <span className="pt fw_7 gray f_11 me-2 me-sm-4">Оборот в месяц:</span>
                                                <span
                                                    className="f_13 fw_5 text-nowrap">{FunctionForPrice(offer?.item?.profitPerMonth)} ₽</span>
                                            </div>
                                        }

                                        <div className="d-flex align-items-center mb-3 justify-content-between">
                                            <span className="pt fw_7 gray f_11 me-2 me-sm-4">Чистая прибыль:</span>
                                            <span
                                                className="f_13 fw_5 text-nowrap">{FunctionForPrice(offer?.item?.profit)} ₽</span>
                                        </div>

                                        <div className="d-flex align-items-center mb-3 justify-content-between">
                                            <span className="pt fw_7 gray f_11 me-2 me-sm-4">Количество точек:</span>
                                            <span
                                                className="f_13 fw_5 text-nowrap">{FunctionForPrice(offer?.item?.branchCount)} шт.</span>
                                        </div>

                                        <div className="d-flex align-items-center mb-3 justify-content-between">
                                            <span className="pt fw_7 gray f_11 me-2 me-sm-4">Город:</span>
                                            <span className="f_13 fw_5 text-nowrap">{offer?.item?.city}</span>
                                        </div>
                                    </>
                                )}


                                {offer?.item?.category === 4 && (
                                    <>
                                        <div className="d-flex align-items-center mb-3 justify-content-between">
                                            <span
                                                className="pt fw_7 gray f_11 me-2 me-sm-4">Стартовые инвестиции от:</span>
                                            <span
                                                className="f_13 fw_5 text-nowrap">{FunctionForPrice(offer?.item?.investments)} ₽</span>
                                        </div>

                                        {(offer?.item?.price != 0 && offer?.item?.price &&
                                            <div className="d-flex align-items-center mb-3 justify-content-between">
                                                <span
                                                    className="pt fw_7 gray f_11 me-2 me-sm-4">Паушальный взнос:</span>
                                                <span
                                                    className="f_13 fw_5 text-nowrap">{FunctionForPrice(offer?.item?.price)} ₽</span>
                                            </div>
                                        )}

                                        {offer?.item?.pricePerMonth != 0 && offer?.item?.pricePerMonth &&
                                            <div className="d-flex align-items-center mb-3 justify-content-between">
                                                <span className="pt fw_7 gray f_11 me-2 me-sm-4">Роялти:</span>
                                                <span
                                                    className="f_13 fw_5 text-nowrap">
                                                {FunctionForPrice(offer?.item?.pricePerMonth)}
                                                    {offer?.item?.isPricePerMonthAbsolute && offer?.item?.category === 4 ? ' ₽' : ' %'}
                                            </span>
                                            </div>
                                        }

                                        {offer?.item?.paybackTimeForUser != '' &&
                                            <div className="d-flex align-items-center mb-3 justify-content-between">
                                                <span
                                                    className="pt fw_7 gray f_11 me-2 me-sm-4">Срок окупаемости:</span>
                                                <span
                                                    style={{textAlign:'right'}}
                                                    className="f_13 fw_5 text-nowrap"><div dangerouslySetInnerHTML={{__html:offer?.item?.paybackTimeForUser?.replace('цев до', 'цев<br/>до')}}></div></span>
                                            </div>}
                                        {offer?.item?.profitPerMonth &&
                                            <div className="d-flex align-items-center mb-3 justify-content-between">
                                                <span
                                                    className="pt fw_7 gray f_11 me-2 me-sm-4">Предполагаемая прибыль:</span>
                                                <span
                                                    className="f_13 fw_5 text-nowrap">{FunctionForPrice(offer?.item?.profitPerMonth)} ₽</span>
                                            </div>
                                        }

                                        {offer?.item?.dateOfCreation &&
                                            <div className="d-flex align-items-center mb-3 justify-content-between">
                                            <span
                                                className="pt fw_7 gray f_11 me-2 me-sm-4">Год основания компании:</span>
                                                <span
                                                    className="f_13 fw_5 text-nowrap">{convertLocaleDate(offer?.item?.dateOfCreation)?.slice(-4)}</span>
                                            </div>
                                        }
                                        {offer?.item?.branchCount &&
                                            <div className="d-flex align-items-center mb-3 justify-content-between">
                                                <span className="pt fw_7 gray f_11 me-2 me-sm-4">Количество собственных точек:</span>
                                                <span
                                                    className="f_13 fw_5 text-nowrap">{FunctionForPrice(offer?.item?.branchCount)} шт.</span>
                                            </div>
                                        }
                                        {offer?.item?.soldBranchCount &&
                                            <div className="d-flex align-items-center mb-3 justify-content-between">
                                                <span className="pt fw_7 gray f_11 me-2 me-sm-4">Количество проданных франшиз:</span>
                                                <span
                                                    className="f_13 fw_5 text-nowrap">{FunctionForPrice(offer?.item?.soldBranchCount)} шт.</span>
                                            </div>
                                        }
                                    </>
                                )}

                            </div>
                            <div>
                                <button
                                    type="button"
                                    className="btn_main btn-5 f_11 w-100"
                                    onClick={(event) => {
                                        if (user) {
                                            if (user?.isFormCompleted) {
                                                setMessagePayload((prevState) => ({
                                                    ...prevState,
                                                    text: user.fullName + ' запросил бизнес план с объявления <a href="' + window.location.href + '" target="_blank">' + window.location.href + '</a>'
                                                }))
                                            } else {
                                                navigate('/account/settings')
                                            }
                                        } else {
                                            dispatch(showAlert({
                                                message: 'Зарегистрируйтесь для запроса бизнес плана. ',
                                                typeAlert: 'neutral',
                                                withLink: true
                                            }))
                                        }
                                    }}
                                >
                                    ПОЛУЧИТЬ БИЗНЕС-ПЛАН
                                </button>
                                <div onClick={() => clickMessage()}>
                                    <button
                                        type="button"
                                        className="btn_main btn-6 f_11 w-100 mt-2 mt-sm-3">
                                        НАПИСАТЬ СООБЩЕНИЕ
                                    </button>
                                </div>
                            </div>

                            {(user
                                && <button
                                    type="button"
                                    className="d-flex align-items-center ms-auto me-0 mt-3 mt-sm-4 mt-lg-0"
                                    onClick={() => setIsShowModalReport(true)}
                                >
                                    <MdInfoOutline className="f_11 gray"/>
                                    <span className="ms-2 fw_7 f_12">Пожаловаться</span>
                                </button>)}
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-5 col-lg-4 col-xl-3 position-relative">
                        <div className="left_menu">
                            <LeftMenuInOfferContainer category={offer?.item?.category} video={offer?.item?.video}/>

                            <div className="row justify-content-center g-4">
                                {advertising && advertising[0] &&
                                    <div className="col-8 col-sm-6 col-md-12 promo">
                                        <div className={'position-relative'} style={{width: '250px', height: '160px'}}>
                                            <img src={checkPhotoPath(advertising[0].image)} alt="img" onClick={()=>window.open(correctLink(advertising[0].link), "_blank")} className="img-fluid mb-2"/>
                                            {user &&
                                                <div className={'badAdv'} title={'Пожаловаться'} onClick={() => {
                                                    setIdAdvForBad(advertising[0].id)
                                                    setIsShowModalReport(true)
                                                }}>
                                                    <MdInfoOutline className="f_11 gray"/>
                                                </div>
                                            }

                                        </div>
                                        <h4 className="fw_7 mb-2">{advertising[0].description}</h4>
                                    </div>}
                                {advertising && advertising[1] &&
                                    <div className="col-8 col-sm-6 col-md-12 promo">
                                            <div className={'position-relative'} style={{width: '250px', height: '160px'}}>
                                                <img src={checkPhotoPath(advertising[1].image)} alt="img" onClick={()=>window.open(correctLink(advertising[1].link), "_blank")} className="img-fluid mb-2"/>
                                                {user &&
                                                    <div className={'badAdv'} title={'Пожаловаться'} onClick={() => {
                                                        setIdAdvForBad(advertising[0].id)
                                                        setIsShowModalReport(true)
                                                    }}>
                                                        <MdInfoOutline className="f_11 gray"/>
                                                    </div>
                                                }

                                            </div>
                                            <h4 className="fw_7 mb-2">{advertising[1].description}</h4>
                                    </div>}
                            </div>
                        </div>
                    </div>
                    <div className="col-md-7 col-lg-8 col-xl-9">
                        <div className="offer-page-main">
                            <hr className="mt-md-0"/>
                            <div className="d-flex align-items-center f_09 mb-4 mb-lg-5">
                                <MdOutlinePlace className="color-1"/>
                                <span className="gray ms-2">Регион:</span>
                                <span className="ms-3">{offer?.item?.city}</span>
                            </div>

                            {offer?.item?.category === 4 ? (
                                <section className="anchor_block" id="anchor_company_info">
                                    <h4 className="fw_7">Описание компании</h4>
                                    <MyEditor readOnly={true} value={offer?.item?.aboutCompany}/>
                                </section>
                            ) : (
                                ''
                            )}

                            {offer?.item?.description &&
                                <section className="anchor_block" id="anchor_description">
                                    <h4 className="fw_7">{returnDescriptionName()}</h4>
                                    <MyEditor readOnly={true} value={offer?.item?.description}/>
                                </section>
                            }

                            {offer?.item?.category === 4 && offer?.item?.benefits? (
                                <section className="anchor_block" id="anchor_benefits">
                                    <h4 className="fw_7">Преимущества франшизы</h4>
                                    <MyEditor readOnly={true} value={offer?.item?.benefits}/>
                                </section>
                            ) : (
                                ''
                            )}

                            {
                                offer?.item?.cooperationTerms &&
                                <section className="anchor_block" id="anchor_terms_coop">
                                    <h4 className="fw_7">
                                        {offer?.item?.category !== 3 ? 'Условия сотрудничества' : 'Условия продажи'}
                                    </h4>
                                    <MyEditor readOnly={true} value={offer?.item?.cooperationTerms}/>
                                </section>
                            }

                            {offer?.item?.category !== 1 && offer?.item?.businessPlan ? (
                                <section className="anchor_block" id="anchor_business_plan">
                                    <h4 className="fw_7">Бизнес-план</h4>
                                    <MyEditor readOnly={true} value={offer?.item?.businessPlan}/>
                                </section>
                            ) : (
                                ''
                            )}

                            {offer?.item?.about && aboutMeBlock()}

                            <ShortInfoInOfferContainer
                                category={offer?.item?.category}
                                investments={offer?.item?.investments}
                                branchCount={offer?.item?.branchCount}
                                price={offer?.item?.price}
                                pricePerMonth={offer?.item?.pricePerMonth}
                                profit={offer?.item?.profit}
                                profitPerMonth={offer?.item?.profitPerMonth}
                                soldBranchCount={offer?.item?.soldBranchCount}
                                payback={offer?.item?.paybackTime}
                                paybackForUser={offer?.item?.paybackTimeForUser}
                                projectStage={offer?.item?.projectStage}
                                projectStageForUser={offer?.item?.projectStageForUser}
                                city={offer?.item?.city}
                                dateOfCreation={offer?.item?.dateOfCreation}
                                areaName={offer?.item?.subsection?.area?.name}
                                isPricePerMonthAbsolute={offer?.item?.isPricePerMonthAbsolute}
                            />
                            <button
                                type="button"
                                className="d-flex align-items-center mb-2"
                                onClick={() => setIsShowModalReport(true)}
                            >
                                <MdInfoOutline className="f_11 gray"/>
                                <span className="ms-2 fw_7 f_12">Пожаловаться</span>
                            </button>

                            {offer?.item?.video &&  (
                                <section className="anchor_block mb-4" id="anchor_video">
                                    <h4 className="fw_7">Видео</h4>
                                    <PhotoProvider maskOpacity={0.75}>
                                        <div
                                            className="row row-cols-2 row-cols-sm-3 row-cols-lg-4 g-2 g-sm-3 g-xl-4 col">
                                            <div className="acc-video2 position-relative d-flex align-items-center" style={{cursor:'pointer'}}>
                                                <div
                                                    className={'position-absolute w-100 h-100 d-flex justify-content-center align-items-center'}
                                                    onClick={()=>window.open(correctLink(offer?.item?.video), '_blank')}
                                                >
                                                    <img
                                                        src='../images/icons/buttonVideo.png'
                                                        style={{width:'80px', height:'80px'}}
                                                    />
                                                </div>
                                                <img src={checkPhotoPath(offer?.item?.videoThumbnail)}
                                                    style={{width:'100%', objectFit:'cover', cursor:'pointer'}}
                                                />
                                            </div>
                                        </div>
                                    </PhotoProvider>
                                </section>
                            )}

                            {
                                offer?.item?.images && offer?.item?.images?.length>0 &&
                                <section className="anchor_block mb-4" id="anchor_photo">
                                    <h4 className="fw_7">Фотогалерея</h4>
                                    <PhotoProvider maskOpacity={0.75}>
                                        <div className="row row-cols-2 row-cols-sm-3 row-cols-lg-4 g-2 g-sm-3 g-xl-4">
                                            {offer?.item?.images.map((i) => (
                                                <div key={i.id}>
                                                    <PhotoView src={checkPhotoPath(i.image)}>
                                                        <img
                                                            src={checkPhotoPath(i.image)}
                                                            alt={i.createdAt}
                                                            className="photogallery"
                                                        />
                                                    </PhotoView>
                                                </div>
                                            ))}
                                        </div>
                                    </PhotoProvider>
                                </section>
                            }
                        </div>
                    </div>
                </div>
            </section>

            <section className="anchor_block mb-5" id="anchor_like">
                <div className="container">
                    <h2 className="mt-sm-4">Похожие объявления</h2>
                    <Swiper
                        style={{paddingBottom: `${swiperPB}px`}}
                        modules={[Pagination]}
                        slidesPerView={2}
                        spaceBetween={6}
                        pagination={{
                            clickable: true,
                            dynamicBullets: true,
                        }}
                        breakpoints={{
                            576: {
                                slidesPerView: 2,
                                spaceBetween: 15,
                            },
                            768: {
                                slidesPerView: 3,
                                spaceBetween: 10,
                            },
                            992: {
                                slidesPerView: 4,
                                spaceBetween: 15,
                            },
                            1200: {
                                slidesPerView: 4,
                                spaceBetween: 30,
                            },
                        }}
                    >
                        {similarOffers.isLoaded ? (
                            similarOffers?.meta?.total ? (
                                similarOffers?.items?.map((offer) => (
                                    <SwiperSlide key={offer?.id}>
                                        <AdvPreview
                                            id={offer.id}
                                            image={offer.image}
                                            title={offer.title}
                                            investments={offer.investments ? offer.investments : offer.price}
                                            favorite={false}
                                            isPricePerMonthAbsolute={true}
                                            // isPricePerMonthAbsolute={offer.isPricePerMonthAbsolute}
                                        />
                                    </SwiperSlide>
                                ))
                            ) : (
                                <h5>Нет похожих объявлений</h5>
                            )
                        ) : (
                            <div className="p-5 w-100 d-flex justify-content-center">
                                <Loader color="#343434"/>
                            </div>
                        )}
                    </Swiper>
                </div>
            </section>
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
                            onChange={(e) => setMessagePayload((prevState) => ({...prevState, text: e.target.value}))}
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
                                    ? createWithOfferTopicMessage()
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
                                    {idAdvForBad &&
                                    reportAdsTypes?.isLoaded ? (
                                        reportAdsTypes?.items?.map((i) => (
                                            <option value={i.id} key={i.id}>
                                                {i.name}
                                            </option>
                                        ))
                                    ) : (
                                        <option>Загрузка</option>
                                    )}
                                    {!idAdvForBad && reportTypes?.isLoaded ? (
                                        reportTypes?.items?.map((i) => (
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
                                onClick={() => {
                                    if (user) {
                                        setValue('userId', user?.id)
                                    }
                                    setValue('offerId', id)
                                }}
                            >
                                Отправить
                            </button>
                        </div>
                    </form>
                </div>
            </CustomModal>

            <PartnersSite/>
        </main>
    )
}

export default AdvPage
