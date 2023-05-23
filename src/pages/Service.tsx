import React, {FC, useCallback, useEffect, useRef, useState} from 'react'
import AdvPreview from '../components/AdvPreview'
import 'swiper/css'
import 'swiper/css/pagination'
import Loader from '../components/utils/Loader'
import ServicePagination from '../components/utils/Pagination'
import usePagination from '../hooks/pagination'
import {useLocation, useParams} from 'react-router-dom'
import SearchForm from '../components/forms/SearchForm'
import PartnersSite from '../components/PartnersSite'
import NewsContainer from '../components/containers/News'
import BannerContainer from '../components/containers/Banner'
import {getAllAreas, getAllSubsections, getOffers} from '../services/offers'
import {getCity} from '../services/city'
import {IOffersAreaItem, IOffersItem, IOffersMeta, IOffersSubSectionsItem, IPayloadsFilter} from '../types/offers'
import {useAppDispatch, useAppSelector} from '../hooks/store'
import {IUser} from '../types/user'
import {IUseStateItems} from '../types'
import {getAdvertisings} from "../services/advertising";
import {Advertisings} from "../types/advertising";
import {checkPhotoPath} from "../helpers/photoLoader";
import {MdInfoOutline} from "react-icons/md";
import CustomModal from "../components/utils/CustomModal";
import ValidateWrapper from "../components/utils/ValidateWrapper";
import {useForm} from "react-hook-form";
import {IUseStateReportType} from "../types/report";
import {createReport, getAdvReportType} from "../services/reports";
import {showAlert} from "../store/reducers/alertSlice";

const Service: FC = () => {
    const params = useParams()
    const categoryId = params.categoryId ? parseInt(params.categoryId) : 0
    const [orderBy, setOrderBy] = useState<string>('')
    const limit = 36
    const {pathname} = useLocation()
    const dispatch = useAppDispatch()

    const ref = useRef<HTMLElement>(null)
    const [areas, setAreas] = useState<Array<IOffersAreaItem | undefined>>([])
    const [subSections, setSubSections] = useState<Array<IOffersSubSectionsItem | undefined>>([])
    const [currentArea, setCurrentArea] = useState<number | undefined>(undefined)
    const [cities, setCities] = useState<Array<string> | undefined>([])

    const [idAdvForBad, setIdAdvForBad] = useState<number | undefined>()
    const [reportTypes, setReportTypes] = useState<IUseStateReportType>({
        isLoaded: true,
        error: null,
        items: null,
    })

    const [isShowModalReport, setIsShowModalReport] = useState<boolean>(false)
    const {register, setValue, formState: {errors}, handleSubmit, reset} = useForm()
    const [offers, setOffers] = useState<IUseStateItems<IOffersItem, IOffersMeta>>({
        isLoaded: false,
        items: null,
        meta: null,
    })
    const [advertising, setAdvertising] = useState<Advertisings>()
    const user: IUser | null = useAppSelector((state) => state?.user?.user)
    const {paginationItems, pageCount, selectedPage, handlePageClick, setSelectedPage} = usePagination(
        offers?.items,
        limit,
        offers?.meta?.total
    )
    const [filters, setFilters] = useState<IPayloadsFilter>({
        orderBy: 'desc',
    })

    useEffect(() => {
        if (ref.current !== null)
            window.scrollTo(0, ref?.current?.offsetTop - 130)
    }, [categoryId])

    useEffect(() => {
        getAdvReportType()
            .then((res) => res && setReportTypes({isLoaded: true, items: res, error: null}))
            .catch(() => setReportTypes({isLoaded: true, items: null, error: 'Произошла ошибка'}))
    }, [])


    useEffect(() => {
        getAllAreas().then((res) => res && setAreas(res))
    }, [])

    useEffect(() => {
        if (currentArea) {
            getAllSubsections(currentArea).then((res) => res && setSubSections(res))
        }
    }, [currentArea])

    useEffect(() => {
        getCity().then((res) => setCities(res))
    }, [])

    useEffect(() => {
        getAdvertisings(1).then(res => {
            res && setAdvertising(res)
        })

        if (localStorage.getItem('token')) {
            if (user?.id) {
                getOffers(selectedPage + 1, limit, categoryId, user?.id, filters, false)
                    .then((res) => {
                        res && setOffers({isLoaded: true, items: res?.data, meta: res?.meta})
                    })
                    .catch((error) => {
                        setOffers({isLoaded: true, items: null, meta: null})
                    })
            }
        } else {
            getOffers(selectedPage + 1, limit, categoryId, null, filters, false)
                .then((res) => {
                    res && setOffers({isLoaded: true, items: res?.data, meta: res?.meta})
                })
                .catch((error) => {
                    setOffers({isLoaded: true, items: null, meta: null})
                })
        }
    }, [selectedPage, orderBy, categoryId, user?.id, filters])

    const selectCurrentArea = useCallback((areaId: number) => {
        setCurrentArea(areaId)
    }, [])

    const onApplyFilters = (data: IPayloadsFilter) => {
        setSelectedPage(0)
        if (user) {
            getOffers(1, limit, categoryId, user?.id, data, false)
                .then((res) => {
                    res && setOffers({isLoaded: true, items: res?.data, meta: res?.meta})
                })
                .catch((error) => {
                    setOffers({isLoaded: true, items: null, meta: null})
                })
        }
    }

    const onReset = (data: IPayloadsFilter) => {
        setFilters(data)
    }


    useEffect(() => {
        setSelectedPage(0)
    }, [categoryId])

    const onSubmit = ({description, reportTypeId, advertisementId}: any) => {
        const req = {description, reportTypeId, userId: user?.id, advertisementId}
        createReport(req)
            .then(() => {
                dispatch(showAlert({message: 'Жалоба успешно отправлена', typeAlert: 'good'}))
                setIsShowModalReport(false)
                reset()
            })
            .catch(() => dispatch(showAlert({message: 'Произошла ошибка', typeAlert: 'bad'})))
    }
    useEffect(()=>{
        const timer = setTimeout(() => {
            window.scrollTo(0,0)
        }, 200);
        return () => clearTimeout(timer);
    },[pathname])


    return (
        <main>
            <BannerContainer/>

            <section className="block_3 container" ref={ref}>
                <h1 className="inner mt-4">
                    {categoryId === 0 && 'Поиск инвесторов'}
                    {categoryId === 1 && 'Предложения инвесторов'}
                    {categoryId === 2 && 'Поиск бизнес партнёров'}
                    {categoryId === 3 && 'Продажа готового бизнеса'}
                    {categoryId === 4 && 'Франшизы'}
                </h1>
                {categoryId === 0 && (
                    <SearchForm
                        onReset={onReset}
                        selectCurrentArea={selectCurrentArea}
                        areas={areas}
                        cities={cities}
                        subSections={subSections}
                        foundCount={offers?.meta?.total}
                        onApplyFilters={onApplyFilters}
                        modules={['paybackTime', 'projectStage', 'investments', 'query']}
                    />
                )}
                {categoryId === 1 && (
                    <SearchForm
                        onReset={onReset}
                        selectCurrentArea={selectCurrentArea}
                        areas={areas}
                        cities={cities}
                        subSections={subSections}
                        foundCount={offers?.meta?.total}
                        onApplyFilters={onApplyFilters}
                        modules={['investments', 'query']}
                    />
                )}
                {categoryId === 2 && (
                    <SearchForm
                        onReset={onReset}
                        selectCurrentArea={selectCurrentArea}
                        areas={areas}
                        cities={cities}
                        subSections={subSections}
                        foundCount={offers?.meta?.total}
                        onApplyFilters={onApplyFilters}
                        modules={['paybackTime', 'projectStage', 'investments', 'query']}
                    />
                )}
                {categoryId === 3 && (
                    <SearchForm
                        onReset={onReset}
                        selectCurrentArea={selectCurrentArea}
                        areas={areas}
                        cities={cities}
                        subSections={subSections}
                        foundCount={offers?.meta?.total}
                        onApplyFilters={onApplyFilters}
                        modules={['paybackTime', 'query', 'price', 'profit', 'profitPerMonth']}
                    />
                )}
                {categoryId === 4 && (
                    <SearchForm
                        onReset={onReset}
                        areas={areas}
                        cities={cities}
                        subSections={subSections}
                        foundCount={offers?.meta?.total}
                        onApplyFilters={onApplyFilters}
                        modules={['paybackTime', 'investments', 'query']}
                    />
                )}
                {offers.isLoaded && (
                    <div className="sort mb-4">
                        <ServicePagination
                            nextLabel="❯"
                            onPageChange={handlePageClick}
                            forcePage={selectedPage}
                            pageRangeDisplayed={3}
                            marginPagesDisplayed={1}
                            pageCount={pageCount}
                            previousLabel="❮"
                        />
                        <div className="mr-2 mr-sm-0">
                            Показано {paginationItems && paginationItems.length}{' '}
                            <span className="d-none d-xl-inline">предложений из</span>
                            <span className="d-inline d-xl-none">/</span> {offers?.items && offers?.meta?.total}
                        </div>
                        <div className="d-flex align-items-center">
                            <span className="f_09 d-none d-lg-block">Сортировать:</span>
                            <select
                                name="orderBy"
                                value={filters?.orderBy}
                                className="f_08 ms-2 pe-4"
                                onChange={(e) => setFilters((prevState) => ({...prevState, orderBy: e.target.value}))}
                            >
                                <option value={''} disabled>
                                    по дате публикации
                                </option>
                                <option value={'desc'}>сначала новые</option>
                                <option value={'asc'}>сначала старые</option>
                            </select>
                        </div>
                    </div>
                )}

                {offers.isLoaded && (
                    <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 g-2 g-sm-3 g-xl-4">
                        {offers?.isLoaded ? (
                            offers?.items && offers?.items?.length ? (
                                paginationItems?.slice(0, 12).map((item: IOffersItem) => (
                                    <div className="col position-relative" key={item.id}>
                                        <AdvPreview
                                            id={item.id}
                                            image={item.image}
                                            title={item.title}
                                            investments={item.investments}
                                            favorite={item.isFavorite}
                                            price={categoryId === 3 ? item.price : undefined}
                                            isPricePerMonthAbsolute={true}
                                        />
                                    </div>
                                ))
                            ) : (
                                <h6 className="w-100 p-5 text-center">Ничего нет</h6>
                            )
                        ) : (
                            <div className="p-5 w-100 d-flex justify-content-center">
                                <Loader color="#343434"/>
                            </div>
                        )}
                        {advertising && advertising[0] && advertising[0].image &&
                            <div className="blockAdvertising position-relative">
                                <img className={"img-advertising"} src={checkPhotoPath(advertising[0].image)} alt="" onClick={()=>window.open(`${advertising[0]?.link}`)} />
                                {user &&
                                    <div className={'badAdv'} title={'Пожаловаться'} onClick={() => {
                                        setIdAdvForBad(advertising[0].id)
                                        setIsShowModalReport(true)
                                    }}>
                                        <MdInfoOutline className="f_11 gray"/>
                                    </div>
                                }
                            </div>}
                        {offers?.items && offers?.items?.length
                            ? paginationItems?.slice(12, 24).map((item: IOffersItem) => (
                                <div className="col position-relative" key={item.id}>
                                    <AdvPreview
                                        id={item.id}
                                        image={item.image}
                                        title={item.title}
                                        favorite={item.isFavorite}
                                        investments={item.investments}
                                        price={categoryId === 3 ? item.price : undefined}
                                        isPricePerMonthAbsolute={true}
                                    />
                                </div>
                            ))
                            : null}
                        {advertising && advertising[1] && advertising[1]?.image &&
                            <div className={"blockAdvertising position-relative"}>
                                <img className={"img-advertising"} src={checkPhotoPath(advertising[1].image)} alt="" onClick={()=>window.open(`${advertising[1]?.link}`)} />
                                {user &&
                                    <div className={'badAdv'} title={'Пожаловаться'} onClick={() => {
                                        setIdAdvForBad(advertising[0].id)
                                        setIsShowModalReport(true)
                                    }}>
                                        <MdInfoOutline className="f_11 gray"/>
                                    </div>
                                }
                            </div>}
                        {offers?.items && offers?.items?.length
                            ? paginationItems?.slice(24, offers?.items?.length).map((item: IOffersItem) => (
                                <div className="col position-relative" key={item.id}>
                                    <AdvPreview
                                        id={item.id}
                                        image={item.image}
                                        title={item.title}
                                        favorite={item.isFavorite}
                                        investments={item.investments}
                                        price={categoryId === 3 ? item.price : undefined}
                                        isPricePerMonthAbsolute={true}
                                    />
                                </div>
                            ))
                            : null}
                    </div>
                )}
                {offers.isLoaded && (
                    <div className="sort mt-4">
                        <ServicePagination
                            nextLabel="❯"
                            onPageChange={handlePageClick}
                            forcePage={selectedPage}
                            pageRangeDisplayed={3}
                            marginPagesDisplayed={1}
                            pageCount={pageCount}
                            previousLabel="❮"
                        />
                        <div className="mr-2 mr-sm-0">
                            Показано {paginationItems && paginationItems.length}{' '}
                            <span className="d-none d-xl-inline">предложений из</span>
                            <span className="d-inline d-xl-none">/</span> {offers?.items && offers?.meta?.total}
                        </div>
                        <div className="d-flex align-items-center">
                            <span className="f_09 d-none d-lg-block">Сортировать:</span>
                            <select
                                name="orderBy"
                                value={filters?.orderBy}
                                className="f_08 ms-2 pe-4"
                                onChange={(e) => setFilters((prevState) => ({...prevState, orderBy: e.target.value}))}
                            >
                                <option value={''} disabled>
                                    по дате публикации
                                </option>
                                <option value={'desc'}>сначала новые</option>
                                <option value={'asc'}>сначала старые</option>
                            </select>
                        </div>
                    </div>
                )}
            </section>
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
                                    setValue('advertisementId', idAdvForBad)
                                }}
                            >
                                Отправить
                            </button>
                        </div>
                    </form>
                </div>
            </CustomModal>
            <NewsContainer/>

            <PartnersSite/>
        </main>
    )
}

export default Service
