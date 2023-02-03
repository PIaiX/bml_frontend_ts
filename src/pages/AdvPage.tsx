import React, {
    BaseSyntheticEvent,
    ButtonHTMLAttributes,
    DetailedHTMLProps,
    FC,
    MouseEventHandler,
    useEffect,
    useState,
} from 'react'
import Breadcrumbs from '../components/utils/Breadcrumbs'
import AdvPreview from '../components/AdvPreview'
import { NavLink, useParams } from 'react-router-dom'
import { MdDateRange, MdInfoOutline, MdOutlinePlace, MdOutlineVisibility } from 'react-icons/md'
import BtnFav from '../components/utils/BtnFav'
import { PhotoProvider, PhotoView } from 'react-photo-view'
import 'react-photo-view/dist/react-photo-view.css'
import PartnersSite from '../components/PartnersSite'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper'
import 'swiper/css'
import 'swiper/css/pagination'
import { getOffers, getOneOffer } from '../services/offers'
import { IUseStateItem, IUseStateItems } from '../types'
import { IOfferItem, IOffersItem, IOffersMeta } from '../types/offers'
import { checkPhotoPath } from '../helpers/photoLoader'
import LeftMenuInOfferContainer from '../components/containers/LeftMenuInOffer'
import ShortInfoInOfferContainer from '../components/containers/ShortInfoInOffer'
import { createReport, getOfferReportType } from '../services/reports'
import { IUser } from '../types/user'
import { useAppDispatch, useAppSelector } from '../hooks/store'
import Loader from '../components/utils/Loader'
import { IUseStateReportType, PayloadsReport } from '../types/report'
import CustomModal from '../components/utils/CustomModal'
import { useForm } from 'react-hook-form'
import ValidateWrapper from '../components/utils/ValidateWrapper'
import { resetAlert, showAlert } from '../store/reducers/alertSlice'
import { emitCreateWithOfferTopicMessage, emitCreateWithoutTopicMessage } from '../services/sockets/messages'
import FunctionForPrice from '../services/FunctionForPrice'
import { convertLocaleDate } from '../helpers/convertLocaleDate'

const AdvPage: FC = () => {
    const { id } = useParams()
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
    const [reportTypes, setReportTypes] = useState<IUseStateReportType>({
        isLoaded: true,
        error: null,
        items: null,
    })
    const {
        register,
        getValues,
        formState: { errors },
        handleSubmit,
        setValue,
        reset,
    } = useForm<PayloadsReport>({ mode: 'onSubmit', reValidateMode: 'onChange' })
    const dispatch = useAppDispatch()
    const [isShowMessageModal, setIsShowMessageModal] = useState<boolean>(false)
    const [messagePayload, setMessagePayload] = useState({
        text: '',
        offerId: id,
        conversationId: 0,
    })

    useEffect(() => {
        if (user && messagePayload.text === user.fullName + ' запросил бизнес план с объявления "' + window.location.href + '"')
            createWithOfferTopicMessage(null)
    }, [messagePayload])

    useEffect(() => {
        if (id) {
            getOneOffer(id, user?.id)
                .then((res) => {
                    res && setOffer({ isLoaded: true, item: res })
                })
                .catch((error) => {
                    setOffer({ isLoaded: true, item: null })
                })
        }
    }, [id, user?.id])

    useEffect(() => {
        getOfferReportType()
            .then((res) => res && setReportTypes({ isLoaded: true, items: res, error: null }))
            .catch(() => setReportTypes({ isLoaded: true, items: null, error: 'Произошла ошибка' }))
    }, [])

    useEffect(() => {
        if (offer?.item) {
            const payloads = {}
            if (user) {
                getOffers(1, 10, offer?.item?.category, user?.id, payloads, true)
                    .then((res) => setSimilarOffers({ isLoaded: true, items: res?.data, meta: res?.meta }))
                    .catch(() => setSimilarOffers({ isLoaded: true, items: null, meta: null }))
            }
        }
    }, [offer?.item, user?.id])

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
                        <p>{offer?.item?.about}</p>
                    </section>
                )
            }
        }
    }

    const onSubmit = (data: PayloadsReport) => {
        createReport(data)
            .then(() => {
                dispatch(showAlert({ message: 'Жалоба успешно отправлена', typeAlert: 'good' }))
                setIsShowModalReport(false)
                reset()
            })
            .catch(() => dispatch(showAlert({ message: 'Произошла ошибка', typeAlert: 'bad' })))
    }
    const [messageType, setMessageType] = useState<string>('0')

    const createWithOfferTopicMessage = (e: BaseSyntheticEvent | null) => {
        e && e.preventDefault()
        if (offer.item) {
            emitCreateWithOfferTopicMessage(offer.item?.userId, messagePayload).then((res) => {
                res?.status === 200 && dispatch(showAlert({ message: messageType, typeAlert: 'good' }))
                setIsShowMessageModal(false)
            })
        }
    }
    return (
        <main>
            <div className="container pt-3 pt-sm-4">
                <Breadcrumbs />
            </div>

            <section id="offer-page" className="container">
                <h1>{offer?.item?.title}</h1>
                <div className="d-lg-flex justify-content-between align-items-center mb-2 mb-sm-4">
                    <h2 className="mb-0">
                        {offer?.item?.description.slice(0, 50)}
                        {offer?.item?.description && offer?.item?.description.length > 50 && "..."}
                    </h2>
                    <div className="short-info ms-auto mt-3 mt-sm-4 mt-lg-0">
                        <span>ID: {offer?.item?.id}</span>
                        <time className="d-flex align-items-center ms-3 ms-sm-4">
                            <MdDateRange />
                            <span className="ms-1 ms-sm-2">{offer?.item?.createdAtForUser}</span>
                        </time>
                        <div className="d-flex align-items-center ms-3 ms-sm-4">
                            <MdOutlineVisibility />
                            <span className="ms-1 ms-sm-2">{offer?.item?.viewsCount} просмотров</span>
                        </div>
                    </div>
                </div>

                <div className="row mb-3 mb-sm-4 mb-md-5">
                    <div className="col-lg-7 col-xl-8 mb-4 mb-lg-0">
                        <img src={checkPhotoPath(offer?.item?.image)} alt={offer?.item?.title} className="main-img" />
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
                                            <span className="f_15 fw_5 text-nowrap">{FunctionForPrice(offer?.item?.investments)} ₽</span>
                                        </div>

                                        <div className="d-flex align-items-center mb-3 justify-content-between">
                                            <span className="pt fw_7 gray f_11 me-2 me-sm-4">Предполагаемая прибыль:</span>
                                            <span className="f_15 fw_5 text-nowrap">
                                                {FunctionForPrice(offer?.item?.profitPerMonth) || 0} ₽
                                            </span>
                                        </div>

                                        <div className="d-flex align-items-center mb-3 justify-content-between">
                                            <span className="pt fw_7 gray f_11 me-2 me-sm-4">Окупаемость:</span>
                                            <span className="f_15 fw_5 text-nowrap">{offer?.item?.paybackTimeForUser != '' ? offer?.item?.paybackTimeForUser : 'не установлено'}</span>
                                        </div>

                                        <div className="d-flex align-items-center mb-3 justify-content-between">
                                            <span className="pt fw_7 gray f_11 me-2 me-sm-4">Стадия проекта:</span>
                                            <span className="f_15 fw_5 text-nowrap">{offer?.item?.projectStage !== null ? offer?.item?.projectStageForUser?.toLowerCase() : 'не установлено'}</span>
                                        </div>

                                        <div className="d-flex align-items-center mb-3 justify-content-between">
                                            <span className="pt fw_7 gray f_11 me-2 me-sm-4">Сфера:</span>
                                            <span className="f_15 fw_5 text-nowrap">{offer?.item?.subsection?.area?.name}</span>
                                        </div>
                                    </>
                                )}

                                {offer?.item?.category === 1 && (
                                    <>
                                        <div className="d-flex align-items-center mb-3 justify-content-between">
                                            <span className="pt fw_7 gray f_11 me-2 me-sm-4">Инвестиции:</span>
                                            <span className="f_15 fw_5 text-nowrap">{FunctionForPrice(offer?.item?.investments)} ₽</span>
                                        </div>

                                        <div className="d-flex align-items-center mb-3 justify-content-between">
                                            <span className="pt fw_7 gray f_11 me-2 me-sm-4">Окупаемость:</span>
                                            <span className="f_15 fw_5 text-nowrap">{offer?.item?.paybackTimeForUser != '' ? offer?.item?.paybackTimeForUser : 'не установлено'}</span>
                                        </div>

                                        <div className="d-flex align-items-center mb-3 justify-content-between">
                                            <span className="pt fw_7 gray f_11 me-2 me-sm-4">Сфера:</span>
                                            <span className="f_15 fw_5 text-nowrap">{offer?.item?.subsection?.area?.name}</span>
                                        </div>
                                    </>
                                )}


                                {offer?.item?.category === 2 && (
                                    <>
                                        <div className="d-flex align-items-center mb-3 justify-content-between">
                                            <span className="pt fw_7 gray f_11 me-2 me-sm-4">Инвестиции:</span>
                                            <span className="f_15 fw_5 text-nowrap">{FunctionForPrice(offer?.item?.investments)} ₽</span>
                                        </div>

                                        <div className="d-flex align-items-center mb-3 justify-content-between">
                                            <span className="pt fw_7 gray f_11 me-2 me-sm-4">Предполагаемая прибыль:</span>
                                            <span className="f_15 fw_5 text-nowrap">{FunctionForPrice(offer?.item?.profit)} ₽</span>
                                        </div>

                                        <div className="d-flex align-items-center mb-3 justify-content-between">
                                            <span className="pt fw_7 gray f_11 me-2 me-sm-4">Окупаемость:</span>
                                            <span className="f_15 fw_5 text-nowrap">{offer?.item?.paybackTimeForUser != '' ? offer?.item?.paybackTimeForUser : 'не установлено'}</span>
                                        </div>

                                        <div className="d-flex align-items-center mb-3 justify-content-between">
                                            <span className="pt fw_7 gray f_11 me-2 me-sm-4">Стадия проекта:</span>
                                            <span className="f_15 fw_5 text-nowrap">{offer?.item?.projectStage !== null ? offer?.item?.projectStageForUser?.toLowerCase() : 'не установлено'}</span>
                                        </div>

                                        <div className="d-flex align-items-center mb-3 justify-content-between">
                                            <span className="pt fw_7 gray f_11 me-2 me-sm-4">Город:</span>
                                            <span className="f_15 fw_5 text-nowrap">{offer?.item?.city}</span>
                                        </div>
                                    </>
                                )}


                                {offer?.item?.category === 3 && (
                                    <>
                                        <div className="d-flex align-items-center mb-3 justify-content-between">
                                            <span className="pt fw_7 gray f_11 me-2 me-sm-4">Стоимость бизнеса:</span>
                                            <span className="f_15 fw_5 text-nowrap">{FunctionForPrice(offer?.item?.price)} ₽</span>
                                        </div>

                                        <div className="d-flex align-items-center mb-3 justify-content-between">
                                            <span className="pt fw_7 gray f_11 me-2 me-sm-4">Окупаемость:</span>
                                            <span className="f_15 fw_5 text-nowrap">{offer?.item?.paybackTimeForUser != '' ? offer?.item?.paybackTimeForUser : 'не установлено'}</span>
                                        </div>

                                        <div className="d-flex align-items-center mb-3 justify-content-between">
                                            <span className="pt fw_7 gray f_11 me-2 me-sm-4">Оборот в месяц:</span>
                                            <span className="f_15 fw_5 text-nowrap">{FunctionForPrice(offer?.item?.profitPerMonth)} ₽</span>
                                        </div>

                                        <div className="d-flex align-items-center mb-3 justify-content-between">
                                            <span className="pt fw_7 gray f_11 me-2 me-sm-4">Чистая прибыль:</span>
                                            <span className="f_15 fw_5 text-nowrap">{FunctionForPrice(offer?.item?.profit)} ₽</span>
                                        </div>

                                        <div className="d-flex align-items-center mb-3 justify-content-between">
                                            <span className="pt fw_7 gray f_11 me-2 me-sm-4">Количество точек:</span>
                                            <span className="f_15 fw_5 text-nowrap">{FunctionForPrice(offer?.item?.branchCount)} шт.</span>
                                        </div>

                                        <div className="d-flex align-items-center mb-3 justify-content-between">
                                            <span className="pt fw_7 gray f_11 me-2 me-sm-4">Город:</span>
                                            <span className="f_15 fw_5 text-nowrap">{offer?.item?.city}</span>
                                        </div>
                                    </>
                                )}


                                {offer?.item?.category === 4 && (
                                    <>
                                        <div className="d-flex align-items-center mb-3 justify-content-between">
                                            <span className="pt fw_7 gray f_11 me-2 me-sm-4">Стартовые инвестиции от:</span>
                                            <span className="f_15 fw_5 text-nowrap">{FunctionForPrice(offer?.item?.investments)} ₽</span>
                                        </div>

                                        <div className="d-flex align-items-center mb-3 justify-content-between">
                                            <span className="pt fw_7 gray f_11 me-2 me-sm-4">Паушальный взнос:</span>
                                            <span className="f_15 fw_5 text-nowrap">{FunctionForPrice(offer?.item?.price)} ₽</span>
                                        </div>

                                        <div className="d-flex align-items-center mb-3 justify-content-between">
                                            <span className="pt fw_7 gray f_11 me-2 me-sm-4">Роялти:</span>
                                            <span className="f_15 fw_5 text-nowrap">{FunctionForPrice(offer?.item?.pricePerMonth)} ₽</span>
                                        </div>

                                        <div className="d-flex align-items-center mb-3 justify-content-between">
                                            <span className="pt fw_7 gray f_11 me-2 me-sm-4">Срок окупаемости:</span>
                                            <span className="f_15 fw_5 text-nowrap">{offer?.item?.paybackTimeForUser != '' ? offer?.item?.paybackTimeForUser : 'не установлено'}</span>
                                        </div>

                                        <div className="d-flex align-items-center mb-3 justify-content-between">
                                            <span className="pt fw_7 gray f_11 me-2 me-sm-4">Предполагаемая прибыль:</span>
                                            <span className="f_15 fw_5 text-nowrap">{FunctionForPrice(offer?.item?.profitPerMonth)} ₽</span>
                                        </div>

                                        <div className="d-flex align-items-center mb-3 justify-content-between">
                                            <span className="pt fw_7 gray f_11 me-2 me-sm-4">Год основания компании:</span>
                                            <span className="f_15 fw_5 text-nowrap">{convertLocaleDate(offer?.item?.dateOfCreation)?.slice(-4)}</span>
                                        </div>

                                        <div className="d-flex align-items-center mb-3 justify-content-between">
                                            <span className="pt fw_7 gray f_11 me-2 me-sm-4">Количество собственных точек:</span>
                                            <span className="f_15 fw_5 text-nowrap">{FunctionForPrice(offer?.item?.branchCount)} шт.</span>
                                        </div>

                                        <div className="d-flex align-items-center mb-3 justify-content-between">
                                            <span className="pt fw_7 gray f_11 me-2 me-sm-4">Количество проданных франшиз:</span>
                                            <span className="f_15 fw_5 text-nowrap">{FunctionForPrice(offer?.item?.soldBranchCount)} шт.</span>
                                        </div>
                                    </>
                                )}

                            </div>

                            {(user
                                && <div>
                                    <button
                                        type="button"
                                        className="btn_main btn-5 f_11 w-100"
                                        onClick={(event) => {
                                            setMessageType(
                                                'Запрос на бизнес план отправлен'
                                            )
                                            setMessagePayload((prevState) => ({ ...prevState, text: user.fullName + ' запросил бизнес план с объявления "' + window.location.href + '"' }))
                                            createWithOfferTopicMessage(event)
                                        }}

                                    >
                                        ПОЛУЧИТЬ БИЗНЕС-ПЛАН
                                    </button>
                                    <button
                                        type="button"
                                        className="btn_main btn-6 f_11 w-100 mt-2 mt-sm-3"
                                        onClick={() => {
                                            setMessageType('Сообщение успешно отправлено в онлайн чат.')
                                            setIsShowMessageModal(true)
                                            setMessagePayload((prevState) => ({ ...prevState, text: '' }))
                                        }}
                                    >
                                        НАПИСАТЬ СООБЩЕНИЕ
                                    </button>
                                </div>)}

                            {(user
                                && <button
                                    type="button"
                                    className="d-flex align-items-center ms-auto me-0 mt-3 mt-sm-4 mt-lg-0"
                                    onClick={() => setIsShowModalReport(true)}
                                >
                                    <MdInfoOutline className="f_11 gray" />
                                    <span className="ms-2 fw_7 f_12">Пожаловаться</span>
                                </button>)}
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-4 col-lg-3 position-relative">
                        <div className="left_menu">
                            <LeftMenuInOfferContainer category={offer?.item?.category} video={offer?.item?.video} />

                            <div className="row justify-content-center g-4">
                                <div className="col-8 col-sm-6 col-md-12 promo">
                                    <img src="/images/img-0.jpg" alt="img" className="img-fluid mb-2" />
                                    <h4 className="fw_7 mb-2">Акции от застройщиков</h4>
                                    <h5 className="mb-0">
                                        ТекстТекстТекст ТекстТекстТекст ТекстТекстТекстТекст Текст\Текст
                                        ТекстТекстТекстТекстТекст
                                    </h5>
                                </div>
                                <div className="col-8 col-sm-6 col-md-12 promo">
                                    <img src="/images/img-0.jpg" alt="img" className="img-fluid mb-2" />
                                    <h4 className="fw_7 mb-2">Акции от застройщиков</h4>
                                    <h5 className="mb-0">
                                        ТекстТекстТекст ТекстТекстТекст ТекстТекстТекстТекст Текст\Текст
                                        ТекстТекстТекстТекстТекст
                                    </h5>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-8 col-lg-9">
                        <div className="offer-page-main">
                            <hr className="mt-md-0" />
                            <div className="d-flex align-items-center f_09 mb-4 mb-lg-5">
                                <MdOutlinePlace className="color-1" />
                                <span className="gray ms-2">Регионы продаж:</span>
                                <span className="ms-3">{offer?.item?.city}</span>
                            </div>

                            {offer?.item?.category === 4 ? (
                                <section className="anchor_block" id="anchor_company_info">
                                    <h4 className="fw_7">Описание компании</h4>
                                    <p>{offer?.item?.aboutCompany}</p>
                                </section>
                            ) : (
                                ''
                            )}

                            <section className="anchor_block" id="anchor_description">
                                <h4 className="fw_7">{returnDescriptionName()}</h4>
                                <p>{offer?.item?.description}</p>
                            </section>

                            {offer?.item?.category === 4 ? (
                                <section className="anchor_block" id="anchor_benefits">
                                    <h4 className="fw_7">Преимущества франшизы</h4>
                                    <p>{offer?.item?.benefits}</p>
                                </section>
                            ) : (
                                ''
                            )}

                            <section className="anchor_block" id="anchor_terms_coop">
                                <h4 className="fw_7">
                                    {offer?.item?.category !== 3 ? 'Условия сотрудничества' : 'Условия продажи'}
                                </h4>
                                <p>{offer?.item?.cooperationTerms}</p>
                            </section>

                            {offer?.item?.category !== 1 ? (
                                <section className="anchor_block" id="anchor_business_plan">
                                    <h4 className="fw_7">Бизнес-план</h4>
                                    <p>{offer?.item?.businessPlan}</p>
                                </section>
                            ) : (
                                ''
                            )}

                            {aboutMeBlock()}

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
                            />

                            <button
                                type="button"
                                className="d-flex align-items-center mb-2"
                                onClick={() => setIsShowModalReport(true)}
                            >
                                <MdInfoOutline className="f_11 gray" />
                                <span className="ms-2 fw_7 f_12">Пожаловаться</span>
                            </button>

                            {offer?.item?.video && (
                                <section className="anchor_block mb-4" id="anchor_video">
                                    <h4 className="fw_7">Видео</h4>
                                    <PhotoProvider maskOpacity={0.75}>
                                        <div className="row row-cols-2 row-cols-sm-3 row-cols-lg-4 g-2 g-sm-3 g-xl-4">
                                            <div className="acc-video">
                                                <iframe
                                                    src={offer?.item?.video}
                                                    title="YouTube video player"
                                                    frameBorder="0"
                                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                    allowFullScreen
                                                />
                                            </div>
                                        </div>
                                    </PhotoProvider>
                                </section>
                            )}

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
                        </div>
                    </div>
                </div>
            </section>

            <section className="anchor_block mb-5" id="anchor_like">
                <div className="container">
                    <h2 className="mt-sm-4">Похожие объявления</h2>
                    <Swiper
                        className="pt-sm-4 pb-4 pb-sm-5"
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
                                            investments={offer.investments}
                                            favorite={false}
                                        />
                                    </SwiperSlide>
                                ))
                            ) : (
                                <h5>Нет похожих объявлений</h5>
                            )
                        ) : (
                            <div className="p-5 w-100 d-flex justify-content-center">
                                <Loader color="#343434" />
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
                                    ? createWithOfferTopicMessage(event)
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
                                    {reportTypes?.isLoaded ? (
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
                                        minLength: { value: 5, message: 'Минимум 5 символов' },
                                        maxLength: { value: 250, message: 'Максимум 250 символов' },
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
            <PartnersSite />
        </main>
    )
}

export default AdvPage
