import React, {FC, useEffect, useState} from 'react'
import AdvPreview from '../components/AdvPreview'
import {Swiper, SwiperSlide} from 'swiper/react'
import {Pagination} from 'swiper'
import 'swiper/css'
import 'swiper/css/pagination'
import {getImages} from '../services/temp'
import Loader from '../components/utils/Loader'
import ServicePagination from '../components/utils/Pagination'
import usePagination from '../hooks/pagination'
import {useParams} from 'react-router-dom'
import SearchForm from '../components/SearchForm'
import {onSelectHandler} from '../helpers/formHandlers'
import Partners from '../components/Partners'
import NewsContainer from '../components/NewsContainer'
interface ServiceData {
    isLoading: boolean
    error?: any
    foundCount: number
    items?: []
}

const Service: FC = () => {
    const params = useParams()
    const categoryId = params.categoryId ? parseInt(params.categoryId) : 0
    const [filters, setFilters] = useState({
        orderBy: 'desc',
        byPublicationDate: 0,
    })
    const [appliedFilters, setAppliedFilters] = useState(filters)
    const [dataHZ, setDataHZ] = useState<ServiceData>({
        isLoading: false,
        error: null,
        foundCount: 0,
        items: [],
    })
    const {paginationItems, pageCount, selectedPage, handlePageClick} = usePagination(dataHZ.items, 16, 6)

    const onApplyFilters = () => setAppliedFilters(filters)

    // ! continue working after creating backend services
    useEffect(() => {
        getImages()
            .then((items: any) => setDataHZ({isLoading: true, foundCount: items.length, items}))
            .catch((error: any) => setDataHZ((prev) => ({...prev, isLoading: true, error})))
    }, [appliedFilters])

    return (
        <main>
            <Swiper className="swiper-1" modules={[Pagination]} slidesPerView={1} pagination={{clickable: true}}>
                <SwiperSlide>
                    <img src="/images/main_slider/slider.jpg" alt="Быстрый сервис поиска и подбора инвестиций" />
                    <div className="container white">
                        <div className="row">
                            <div className="col-md-9 col-lg-7">
                                <h2>Быстрый сервис поиска и подбора инвестиций</h2>
                                <h5>
                                    Мы собрали у себя лучшие предложения на рынке бизнеса, чтобы вы могли сравнить
                                    предложения и выбрать то, что действительно вам подходит
                                </h5>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <img src="/images/main_slider/slider.jpg" alt="Быстрый сервис поиска и подбора инвестиций" />
                    <div className="container white">
                        <div className="row">
                            <div className="col-md-9 col-lg-7">
                                <h2>Быстрый сервис поиска и подбора инвестиций</h2>
                                <h5>
                                    Мы собрали у себя лучшие предложения на рынке бизнеса, чтобы вы могли сравнить
                                    предложения и выбрать то, что действительно вам подходит
                                </h5>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
            </Swiper>

            <section id="block_2" className="container">
                <div className="row row-cols-sm-2 row-cols-md-3 row-cols-lg-4 justify-content-center g-4">
                    <div>
                        <div className="white_box box_shad info_in_nums">
                            <div>
                                <div className="fw_5 mb-4">Поиск инвесторов</div>
                                <div className="f_09 pt">
                                    <span className="color-2 fw_7">2650</span> зарегестрированных инвесторов
                                </div>
                            </div>
                            <div>
                                <img src="/images/icons/icon-1.svg" alt="Поиск инвесторов" />
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="white_box box_shad info_in_nums">
                            <div>
                                <div className="fw_5 mb-4">Поиск бизнес парнёров</div>
                                <div className="f_09 pt">
                                    <span className="color-2 fw_7">1650</span> будущих
                                    <br />
                                    партнёров по бизнесу
                                </div>
                            </div>
                            <div>
                                <img src="/images/icons/icon-2.svg" alt="Поиск бизнес парнёров" />
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="white_box box_shad info_in_nums">
                            <div>
                                <div className="fw_5 mb-4">Поиск бизнес проектов</div>
                                <div className="f_09 pt">
                                    <span className="color-2 fw_7">180</span> готовых бизнес проектов
                                </div>
                            </div>
                            <div>
                                <img src="/images/icons/icon-3.svg" alt="Поиск инвесторов" />
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="white_box box_shad info_in_nums">
                            <div>
                                <div className="fw_5 mb-4">Поиск франшиз</div>
                                <div className="f_09 pt">
                                    <span className="color-2 fw_7">265</span> размещенных франшиз
                                </div>
                            </div>
                            <div>
                                <img src="/images/icons/icon-4.svg" alt="Поиск инвесторов" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="block_3 container">
                <h1 className="inner mt-4">
                    {categoryId === 1 && 'Поиск инвесторов'}
                    {categoryId === 2 && 'Предложения инвесторов'}
                    {categoryId === 3 && 'Поиск бизнес партнёров'}
                    {categoryId === 4 && 'Продажа готового бизнеса'}
                    {categoryId === 5 && 'Франшизы'}
                </h1>
                {categoryId === 1 && (
                    <SearchForm
                        foundCount={dataHZ.foundCount}
                        filters={filters}
                        setFilters={setFilters}
                        onApplyFilters={onApplyFilters}
                        modules={['projectImplementationStage', 'paybackPeriod', 'wordContent', 'investmentSize']}
                    />
                )}
                {categoryId === 2 && (
                    <SearchForm
                        foundCount={dataHZ.foundCount}
                        filters={filters}
                        setFilters={setFilters}
                        onApplyFilters={onApplyFilters}
                        modules={['wordContent', 'investmentSize']}
                    />
                )}
                {categoryId === 3 && (
                    <SearchForm
                        foundCount={dataHZ.foundCount}
                        filters={filters}
                        setFilters={setFilters}
                        onApplyFilters={onApplyFilters}
                        modules={['projectImplementationStage', 'paybackPeriod', 'wordContent', 'investmentSize']}
                    />
                )}
                {categoryId === 4 && (
                    <SearchForm
                        foundCount={dataHZ.foundCount}
                        filters={filters}
                        setFilters={setFilters}
                        onApplyFilters={onApplyFilters}
                        modules={['projectImplementationStage', 'paybackPeriod', 'wordContent', 'investmentSize']}
                    />
                )}
                {categoryId === 5 && (
                    <SearchForm
                        foundCount={dataHZ.foundCount}
                        filters={filters}
                        setFilters={setFilters}
                        onApplyFilters={onApplyFilters}
                        modules={['paybackPeriod', 'wordContent', 'investmentSize']}
                    />
                )}
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
                        <span className="d-inline d-xl-none">/</span> {dataHZ?.items && dataHZ?.items?.length}
                    </div>
                    <div className="d-flex align-items-center">
                        <span className="f_09 d-none d-lg-block">Сортировать:</span>
                        <select
                            name="byPublicationDate"
                            value={filters.byPublicationDate}
                            className="f_08 ms-2 pe-4"
                            onChange={(e) => onSelectHandler(e, setFilters)}
                        >
                            <option value={0} disabled>
                                по дате публикации
                            </option>
                            <option value={'desc'}>сначала новые</option>
                            <option value={'asc'}>сначала старые</option>
                        </select>
                        <select
                            name="orderBy"
                            value={filters.orderBy}
                            className="f_08 ms-2 pe-4"
                            onChange={(e) => onSelectHandler(e, setFilters)}
                        >
                            <option value={'desc'}>по убыванию</option>
                            <option value={'asc'}>по возрастанию</option>
                        </select>
                    </div>
                </div>

                <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 g-2 g-sm-3 g-xl-4">
                    {dataHZ?.isLoading ? (
                        dataHZ?.items && dataHZ?.items?.length ? (
                            paginationItems.slice(0, 8).map((item: any) => (
                                <div className="col" key={item.id}>
                                    <AdvPreview
                                        // url={"adv-page"}
                                        id={item.id}
                                        imgURL={item.url}
                                        title={item.title}
                                        summ={'400000'}
                                        favorite={false}
                                    />
                                </div>
                            ))
                        ) : (
                            <h6 className="w-100 p-5 text-center">Ничего нет</h6>
                        )
                    ) : (
                        <div className="p-5 w-100 d-flex justify-content-center">
                            <Loader color="#343434" />
                        </div>
                    )}
                    <div className="col-12 w-100">
                        <Swiper
                            className="preview-slider"
                            modules={[Pagination]}
                            slidesPerView={1}
                            pagination={{clickable: true}}
                        >
                            <SwiperSlide>
                                <img src="/images/slider_offers/slide1.jpg" alt="" className="img-fluid" />
                            </SwiperSlide>
                            <SwiperSlide>
                                <img src="/images/slider_offers/slide2.jpg" alt="" className="img-fluid" />
                            </SwiperSlide>
                        </Swiper>
                    </div>
                    {dataHZ?.items && dataHZ?.items?.length
                        ? paginationItems.slice(8, paginationItems.length).map((item: any) => (
                              <div className="col" key={item.id}>
                                  <AdvPreview
                                      // url={"adv-page"}
                                      imgURL={item.url}
                                      title={item.title}
                                      summ={'400000'}
                                      favorite={false}
                                      id={item.id}
                                  />
                              </div>
                          ))
                        : null}
                </div>

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
                        <span className="d-inline d-xl-none">/</span> {dataHZ?.items && dataHZ?.items?.length}
                    </div>
                    <div className="d-flex align-items-center">
                        <span className="f_09 d-none d-lg-block">Сортировать:</span>
                        <select
                            name="byPublicationDate"
                            value={filters.byPublicationDate}
                            className="f_08 ms-2 pe-4"
                            onChange={(e) => onSelectHandler(e, setFilters)}
                        >
                            <option value={0} disabled>
                                по дате публикации
                            </option>
                            <option value={'desc'}>сначала новые</option>
                            <option value={'asc'}>сначала старые</option>
                        </select>
                        <select
                            name="orderBy"
                            value={filters.orderBy}
                            className="f_08 ms-2 pe-4"
                            onChange={(e) => onSelectHandler(e, setFilters)}
                        >
                            <option value={'desc'}>по убыванию</option>
                            <option value={'asc'}>по возрастанию</option>
                        </select>
                    </div>
                </div>
            </section>

            <NewsContainer />

            <Partners />
        </main>
    )
}

export default Service
