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
import {NavLink, useParams} from 'react-router-dom'
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
import {createReport, getOfferReportType} from '../services/reports'
import {IUser} from '../types/user'
import {useAppDispatch, useAppSelector} from '../hooks/store'
import Loader from '../components/utils/Loader'
import {IUseStateReportType, PayloadsReport} from '../types/report'
import CustomModal from '../components/utils/CustomModal'
import {useForm} from 'react-hook-form'
import ValidateWrapper from '../components/utils/ValidateWrapper'
import {resetAlert, showAlert} from '../store/reducers/alertSlice'
import {emitCreateWithOfferTopicMessage, emitCreateWithoutTopicMessage} from '../services/sockets/messages'

const AdvPage: FC = () => {
    const {id} = useParams()
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
        conversationId: 0,
    })

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
            .catch(() => setReportTypes({isLoaded: true, items: null, error: '?????????????????? ????????????'}))
    }, [])

    useEffect(() => {
        if (offer?.item) {
            const payloads = {}
            if (user) {
                getOffers(1, 10, offer?.item?.category, user?.id, payloads, true)
                    .then((res) => setSimilarOffers({isLoaded: true, items: res?.data, meta: res?.meta}))
                    .catch(() => setSimilarOffers({isLoaded: true, items: null, meta: null}))
            }
        }
    }, [offer?.item, user?.id])

    const returnDescriptionName = () => {
        const category = offer?.item?.category
        if (category === 0 || category === 1 || category === 2) {
            return '???????????????? ????????????????????'
        } else if (category === 3) {
            return '???????????????? ??????????????'
        } else if (category === 4) {
            return '???????????????? ????????????????'
        } else {
            return '???????????????? ????????-????'
        }
    }

    const aboutMeBlock = () => {
        if (offer?.item?.category || offer?.item?.category === 0) {
            if (3 > offer?.item?.category) {
                return (
                    <section className="anchor_block" id="anchor_about_me">
                        <h4 className="fw_7">?? ????????</h4>
                        <p>{offer?.item?.about}</p>
                    </section>
                )
            }
        }
    }

    const onSubmit = (data: PayloadsReport) => {
        createReport(data)
            .then(() => {
                dispatch(showAlert({message: '???????????? ?????????????? ????????????????????', typeAlert: 'good'}))
                setIsShowModalReport(false)
                reset()
            })
            .catch(() => dispatch(showAlert({message: '?????????????????? ????????????', typeAlert: 'bad'})))
    }

    const createWithOfferTopicMessage = (e: BaseSyntheticEvent) => {
        e.preventDefault()
        if (offer.item) {
            emitCreateWithOfferTopicMessage(offer.item?.userId, messagePayload).then((res) => {
                res?.status === 200 && dispatch(showAlert({message: '?????????????????? ?????????????? ????????????????????', typeAlert: 'good'}))
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
                    <h2 className="mb-0">{offer?.item?.title}</h2>
                    <div className="short-info ms-auto mt-3 mt-sm-4 mt-lg-0">
                        <span>ID: {offer?.item?.id}</span>
                        <time className="d-flex align-items-center ms-3 ms-sm-4">
                            <MdDateRange />
                            <span className="ms-1 ms-sm-2">{offer?.item?.createdAtForUser}</span>
                        </time>
                        <div className="d-flex align-items-center ms-3 ms-sm-4">
                            <MdOutlineVisibility />
                            <span className="ms-1 ms-sm-2">{offer?.item?.viewsCount} ????????????????????</span>
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
                                    <NavLink to="/account/profile/view" className="user d-flex align-items-center">
                                        <img
                                            src={checkPhotoPath(offer?.item?.user?.avatar)}
                                            alt={offer?.item?.user?.fullName}
                                        />
                                        <div className="ms-2">
                                            <div className="f_11">{offer?.item?.user?.fullName}</div>
                                            <div className="f_09">
                                                {offer?.item?.user?.type ? offer?.item?.user?.typeForUser : ''}
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

                                <div className="d-flex align-items-center mb-3">
                                    <span className="pt fw_7 gray f_11 me-2 me-sm-4">
                                        {offer?.item?.category !== 3 ? '????????????????????' : '??????????????????'}:
                                    </span>
                                    <span className="f_15 fw_5">
                                        {offer?.item?.category !== 3 ? offer?.item?.investments : offer?.item?.price}???
                                    </span>
                                </div>
                                {offer?.item?.category !== 1 && (
                                    <div className="d-flex align-items-center mb-3">
                                        <span className="pt fw_7 gray f_11 me-2 me-sm-4">?????????????? ?? ??????????:</span>
                                        <span className="f_15 fw_5">{offer?.item?.profitPerMonth} ???</span>
                                    </div>
                                )}
                                <div className="d-flex align-items-center mb-3">
                                    <span className="pt fw_7 gray f_11 me-2 me-sm-4">??????????????????????:</span>
                                    <span className="f_15 fw_5">{offer?.item?.paybackTimeForUser}</span>
                                </div>
                            </div>

                            <div>
                                <button
                                    type="button"
                                    className="btn_main btn-5 f_11 w-100"
                                    onClick={() => {
                                        setIsShowMessageModal(true)
                                        setMessagePayload((prevState) => ({...prevState, text: '???????? ??????????'}))
                                    }}
                                >
                                    ???????????????? ????????????-????????
                                </button>
                                <button
                                    type="button"
                                    className="btn_main btn-6 f_11 w-100 mt-2 mt-sm-3"
                                    onClick={() => {
                                        setIsShowMessageModal(true)
                                        setMessagePayload((prevState) => ({...prevState, text: ''}))
                                    }}
                                >
                                    ???????????????? ??????????????????
                                </button>
                            </div>

                            <button
                                type="button"
                                className="d-flex align-items-center ms-auto me-0 mt-3 mt-sm-4 mt-lg-0"
                                onClick={() => setIsShowModalReport(true)}
                            >
                                <MdInfoOutline className="f_11 gray" />
                                <span className="ms-2 fw_7 f_09">????????????????????????</span>
                            </button>
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
                                    <h4 className="fw_7 mb-2">?????????? ???? ????????????????????????</h4>
                                    <h5 className="mb-0">
                                        ?????????????????????????????? ?????????????????????????????? ???????????????????????????????????????? ??????????\??????????
                                        ??????????????????????????????????????????????????
                                    </h5>
                                </div>
                                <div className="col-8 col-sm-6 col-md-12 promo">
                                    <img src="/images/img-0.jpg" alt="img" className="img-fluid mb-2" />
                                    <h4 className="fw_7 mb-2">?????????? ???? ????????????????????????</h4>
                                    <h5 className="mb-0">
                                        ?????????????????????????????? ?????????????????????????????? ???????????????????????????????????????? ??????????\??????????
                                        ??????????????????????????????????????????????????
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
                                <span className="gray ms-2">?????????????? ????????????:</span>
                                <span className="ms-3">{offer?.item?.city}</span>
                            </div>

                            {offer?.item?.category === 4 ? (
                                <section className="anchor_block" id="anchor_company_info">
                                    <h4 className="fw_7">???????????????? ????????????????</h4>
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
                                    <h4 className="fw_7">???????????????????????? ????????????????</h4>
                                    <p>{offer?.item?.benefits}</p>
                                </section>
                            ) : (
                                ''
                            )}

                            <section className="anchor_block" id="anchor_terms_coop">
                                <h4 className="fw_7">
                                    {offer?.item?.category !== 3 ? '?????????????? ????????????????????????????' : '?????????????? ??????????????'}
                                </h4>
                                <p>{offer?.item?.cooperationTerms}</p>
                            </section>

                            {offer?.item?.category !== 1 ? (
                                <section className="anchor_block" id="anchor_business_plan">
                                    <h4 className="fw_7">????????????-????????</h4>
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
                                <span className="ms-2 fw_7 f_09">????????????????????????</span>
                            </button>

                            {offer?.item?.video && (
                                <section className="anchor_block mb-4" id="anchor_video">
                                    <h4 className="fw_7">??????????</h4>
                                    <PhotoProvider maskOpacity={0.75}>
                                        <div className="row row-cols-2 row-cols-sm-3 row-cols-lg-4 g-2 g-sm-3 g-xl-4">
                                            <div>
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
                                        </div>
                                    </PhotoProvider>
                                </section>
                            )}

                            <section className="anchor_block mb-4" id="anchor_photo">
                                <h4 className="fw_7">??????????????????????</h4>
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
                    <h2 className="mt-sm-4">?????????????? ????????????????</h2>
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
                                <h5>?????? ?????????????? ????????????????????</h5>
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
                        <label>?????????? ??????????????????:</label>
                        <textarea
                            placeholder="?????????????? ??????????????????..."
                            value={messagePayload.text || ''}
                            onChange={(e) => setMessagePayload((prevState) => ({...prevState, text: e.target.value}))}
                        />
                        {messagePayload?.text?.length === 0 ? (
                            <span className="gray-text">
                                <sup>*</sup>?????????????? 1 ????????
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
                            ??????????????????
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
                            <label className="fs-12">???????????????? ?????????????? ????????????: </label>
                            <ValidateWrapper error={errors.reportTypeId}>
                                <select
                                    {...register('reportTypeId', {
                                        required: '???????????????????????? ????????',
                                    })}
                                >
                                    {reportTypes?.isLoaded ? (
                                        reportTypes?.items?.map((i) => (
                                            <option value={i.id} key={i.id}>
                                                {i.name}
                                            </option>
                                        ))
                                    ) : (
                                        <option>????????????????</option>
                                    )}
                                </select>
                            </ValidateWrapper>
                        </div>
                        <div className="mt-3 mb-3">
                            <label className="fs-12">?????????? ????????????: </label>
                            <ValidateWrapper error={errors.description}>
                                <textarea
                                    {...register('description', {
                                        required: '???????????????????????? ????????',
                                        minLength: {value: 5, message: '?????????????? 5 ????????????????'},
                                        maxLength: {value: 250, message: '???????????????? 250 ????????????????'},
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
                                ??????????????????
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
