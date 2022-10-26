import React, {useEffect, useState} from 'react'
import AdvPreview from '../components/AdvPreview'
import NewsPreview from '../components/NewsPreview'
import NewsMini from '../components/NewsMini'
import {Swiper, SwiperSlide} from 'swiper/react'
import {Pagination} from 'swiper'
import 'swiper/css'
import 'swiper/css/pagination'
import {getImages} from '../API/temp'
import Loader from '../components/utils/Loader'
import ServicePagination from '../components/utils/Pagination'
import usePagination from '../hooks/pagination'
import {useParams} from 'react-router-dom';
import SearchForm from '../components/SearchForm';
import {onSelectHandler} from '../helpers/formHandlers';

interface ServiceData {
    isLoading: boolean, 
    error?: any,
    foundCount: number,
    items?: []
}

const Service = () => {
    const params = useParams()
    const categoryId = params.categoryId ? parseInt(params.categoryId) : 0
    const [filters, setFilters] = useState({
        orderBy: 'desc',
        byPublicationDate: 0
    })
    const [appliedFilters, setAppliedFilters] = useState(filters)
    const [data, setData] = useState<ServiceData>({
        isLoading: false,
        error: null,
        foundCount: 0,
        items: []
    })
    const {paginationItems, pageCount, selectedPage, handlePageClick} = usePagination(data.items, 16)

    const onApplyFilters = () => setAppliedFilters(filters)

    // ! continue working after creating backend API
    useEffect(() => {
        getImages()
            .then((items: any) => setData({isLoading: true, foundCount: items.length, items}))
            .catch((error: any) => setData((prev) => ({...prev, isLoading: true, error})))
    }, [appliedFilters])

    return (
        <main>
            <Swiper
                className="swiper-1"
                modules={[Pagination]}
                slidesPerView={1}
                pagination={{clickable: true}}
            >
                <SwiperSlide>
                    <img src="/images/main_slider/slider.jpg" alt="Быстрый сервис поиска и подбора инвестиций"/>
                    <div className="container white">
                        <div className="row">
                            <div className="col-md-9 col-lg-7">
                                <h2>Быстрый сервис поиска и подбора инвестиций</h2>
                                <h5>Мы собрали у себя лучшие предложения на рынке бизнеса, чтобы вы могли сравнить
                                    предложения и выбрать то, что действительно вам подходит</h5>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <img src="/images/main_slider/slider.jpg" alt="Быстрый сервис поиска и подбора инвестиций"/>
                    <div className="container white">
                        <div className="row">
                            <div className="col-md-9 col-lg-7">
                                <h2>Быстрый сервис поиска и подбора инвестиций</h2>
                                <h5>Мы собрали у себя лучшие предложения на рынке бизнеса, чтобы вы могли сравнить
                                    предложения и выбрать то, что действительно вам подходит</h5>
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
                                <div className="f_09 pt"><span className="color-2 fw_7">2650</span> зарегестрированных
                                    инвесторов
                                </div>
                            </div>
                            <div><img src="/images/icons/icon-1.svg" alt="Поиск инвесторов"/></div>
                        </div>
                    </div>
                    <div>
                        <div className="white_box box_shad info_in_nums">
                            <div>
                                <div className="fw_5 mb-4">Поиск бизнес парнёров</div>
                                <div className="f_09 pt"><span className="color-2 fw_7">1650</span> будущих<br/>партнёров
                                    по бизнесу
                                </div>
                            </div>
                            <div><img src="/images/icons/icon-2.svg" alt="Поиск бизнес парнёров"/></div>
                        </div>
                    </div>
                    <div>
                        <div className="white_box box_shad info_in_nums">
                            <div>
                                <div className="fw_5 mb-4">Поиск бизнес проектов</div>
                                <div className="f_09 pt"><span className="color-2 fw_7">180</span> готовых бизнес
                                    проектов
                                </div>
                            </div>
                            <div><img src="/images/icons/icon-3.svg" alt="Поиск инвесторов"/></div>
                        </div>
                    </div>
                    <div>
                        <div className="white_box box_shad info_in_nums">
                            <div>
                                <div className="fw_5 mb-4">Поиск франшиз</div>
                                <div className="f_09 pt"><span className="color-2 fw_7">265</span> размещенных франшиз
                                </div>
                            </div>
                            <div><img src="/images/icons/icon-4.svg" alt="Поиск инвесторов"/></div>
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
                {categoryId === 1 &&
                    <SearchForm
                        foundCount={data.foundCount}
                        filters={filters}
                        setFilters={setFilters}
                        onApplyFilters={onApplyFilters}
                        modules={['projectImplementationStage', 'paybackPeriod', 'wordContent', 'investmentSize']}
                    />
                }
                {categoryId === 2 &&
                    <SearchForm
                        foundCount={data.foundCount}
                        filters={filters}
                        setFilters={setFilters}
                        onApplyFilters={onApplyFilters}
                        modules={['wordContent', 'investmentSize']}
                    />
                }
                {categoryId === 3 &&
                    <SearchForm
                        foundCount={data.foundCount}
                        filters={filters}
                        setFilters={setFilters}
                        onApplyFilters={onApplyFilters}
                        modules={['projectImplementationStage', 'paybackPeriod', 'wordContent', 'investmentSize']}
                    />
                }
                {categoryId === 4 &&
                    <SearchForm
                        foundCount={data.foundCount}
                        filters={filters}
                        setFilters={setFilters}
                        onApplyFilters={onApplyFilters}
                        modules={['projectImplementationStage', 'paybackPeriod', 'wordContent', 'investmentSize']}
                    />
                }
                {categoryId === 5 &&
                    <SearchForm
                        foundCount={data.foundCount}
                        filters={filters}
                        setFilters={setFilters}
                        onApplyFilters={onApplyFilters}
                        modules={['paybackPeriod', 'wordContent', 'investmentSize']}
                    />
                }
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
                        Показано {paginationItems && paginationItems.length} <span className="d-none d-xl-inline">предложений из</span>
                        <span className="d-inline d-xl-none">/</span> {data.items && data.items.length}
                    </div>
                    <div className="d-flex align-items-center">
                        <span className="f_09 d-none d-lg-block">Сортировать:</span>
                        <select
                            name='byPublicationDate'
                            value={filters.byPublicationDate}
                            className="f_08 ms-2 pe-4"
                            onChange={e => onSelectHandler(e, setFilters)}
                        >
                            <option value={0} disabled>по дате публикации</option>
                            <option value={'desc'}>сначала новые</option>
                            <option value={'asc'}>сначала старые</option>
                        </select>
                        <select
                            name='orderBy'
                            value={filters.orderBy}
                            className="f_08 ms-2 pe-4"
                            onChange={e => onSelectHandler(e, setFilters)}
                        >
                            <option value={'desc'}>по убыванию</option>
                            <option value={'asc'}>по возрастанию</option>
                        </select>
                    </div>
                </div>

                <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 g-2 g-sm-3 g-xl-4">
                    {
                        data.isLoading
                            ? data.items && data.items.length
                                ? paginationItems.slice(0, 8).map((item: any) => (
                                    <div className="col" key={item.id}>
                                        <AdvPreview
                                            // url={"adv-page"}
                                            imgURL={item.url}
                                            title={item.title}
                                            summ={'400000'}
                                            favorite={false}
                                        />
                                    </div>
                                ))
                                : <h6 className="w-100 p-5 text-center">Ничего нет</h6>
                            : <div className="p-5 w-100 d-flex justify-content-center"><Loader color="#343434"/></div>
                    }
                    <div className="col-12 w-100">
                        <Swiper
                            className="preview-slider"
                            modules={[Pagination]}
                            slidesPerView={1}
                            pagination={{clickable: true}}
                        >
                            <SwiperSlide>
                                <img src="/images/slider_offers/slide1.jpg" alt="" className="img-fluid"/>
                            </SwiperSlide>
                            <SwiperSlide>
                                <img src="/images/slider_offers/slide2.jpg" alt="" className="img-fluid"/>
                            </SwiperSlide>
                        </Swiper>
                    </div>
                    {   data.items && 
                        data.items.length
                            ? paginationItems.slice(8, paginationItems.length).map((item:any) => (
                                <div className="col" key={item.id}>
                                    <AdvPreview
                                        // url={"adv-page"}
                                        imgURL={item.url}
                                        title={item.title}
                                        summ={'400000'}
                                        favorite={false}
                                    />
                                </div>
                            ))
                            : null
                    }
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
                        Показано {paginationItems && paginationItems.length} <span className="d-none d-xl-inline">предложений из</span>
                        <span className="d-inline d-xl-none">/</span> {data.items && data.items.length}
                    </div>
                    <div className="d-flex align-items-center">
                        <span className="f_09 d-none d-lg-block">Сортировать:</span>
                        <select
                            name='byPublicationDate'
                            value={filters.byPublicationDate}
                            className="f_08 ms-2 pe-4"
                            onChange={e => onSelectHandler(e, setFilters)}
                        >
                            <option value={0} disabled>по дате публикации</option>
                            <option value={'desc'}>сначала новые</option>
                            <option value={'asc'}>сначала старые</option>
                        </select>
                        <select
                            name='orderBy'
                            value={filters.orderBy}
                            className="f_08 ms-2 pe-4"
                            onChange={e => onSelectHandler(e, setFilters)}
                        >
                            <option value={'desc'}>по убыванию</option>
                            <option value={'asc'}>по возрастанию</option>
                        </select>
                    </div>
                </div>
            </section>

            <section className="container" id="block_4">
                <h2>Новости и статьи</h2>
                <div className="row">
                    <div className="col-md-4 col-lg-3 mb-sm-3 mb-md-0 pt-3">
                        <NewsMini className={'mb-3 mb-md-4'} url={'/news-0'} date={'28.09.2020'}
                                  title={'Как малому бизнесу выживать в условиях коронавируса'}/>
                        <NewsMini className={'mb-3 mb-md-4'} url={'/news-0'} date={'28.09.2020'}
                                  title={'Как малому бизнесу выживать в условиях коронавируса'}/>
                        <NewsMini className={'mb-3 mb-md-4'} url={'/news-0'} date={'28.09.2020'}
                                  title={'Как малому бизнесу выживать в условиях коронавируса'}/>
                        <div className="color-1"><a href="news.html" className="bb_1 fw_5 link">Все новости</a></div>
                    </div>
                    <div className="col-md-8 col-lg-9">
                        <Swiper
                            className="pt-3 pb-5"
                            modules={[Pagination]}
                            slidesPerView={1}
                            spaceBetween={16}
                            pagination={{
                                clickable: true,
                                dynamicBullets: true,
                            }}
                            breakpoints={{
                                576: {
                                    slidesPerView: 2,
                                    spaceBetween: 16,
                                },
                                992: {
                                    slidesPerView: 3,
                                    spaceBetween: 16,
                                },
                            }}
                        >
                            <SwiperSlide>
                                <NewsPreview url={'/news-0'} imgUrl={"/images/news/n1.jpg"}
                                             title={"Как малому бизнесу выживать в условиях коронавируса"}
                                             text={"Сейчас бесконтактные бизнес-процедуры — оптимальный вариант ведения бизнеса."}/>
                            </SwiperSlide>
                            <SwiperSlide>
                                <NewsPreview url={'/news-0'} imgUrl={"/images/news/n1.jpg"}
                                             title={"Как малому бизнесу выживать в условиях коронавируса"}
                                             text={"Сейчас бесконтактные бизнес-процедуры — оптимальный вариант ведения бизнеса."}/>
                            </SwiperSlide>
                            <SwiperSlide>
                                <NewsPreview url={'/news-0'} imgUrl={"/images/news/n1.jpg"}
                                             title={"Как малому бизнесу выживать в условиях коронавируса"}
                                             text={"Сейчас бесконтактные бизнес-процедуры — оптимальный вариант ведения бизнеса."}/>
                            </SwiperSlide>
                            <SwiperSlide>
                                <NewsPreview url={'/news-0'} imgUrl={"/images/news/n1.jpg"}
                                             title={"Как малому бизнесу выживать в условиях коронавируса"}
                                             text={"Сейчас бесконтактные бизнес-процедуры — оптимальный вариант ведения бизнеса."}/>
                            </SwiperSlide>
                            <SwiperSlide>
                                <NewsPreview url={'/news-0'} imgUrl={"/images/news/n1.jpg"}
                                             title={"Как малому бизнесу выживать в условиях коронавируса"}
                                             text={"Сейчас бесконтактные бизнес-процедуры — оптимальный вариант ведения бизнеса."}/>
                            </SwiperSlide>
                            <SwiperSlide>
                                <NewsPreview url={'/news-0'} imgUrl={"/images/news/n1.jpg"}
                                             title={"Как малому бизнесу выживать в условиях коронавируса"}
                                             text={"Сейчас бесконтактные бизнес-процедуры — оптимальный вариант ведения бизнеса."}/>
                            </SwiperSlide>
                        </Swiper>
                    </div>
                </div>
            </section>

            <section className="bg_l_blue">
                <div id="block_5" className="container">
                    <h2 className="mt-2">Наши партнёры</h2>
                    <Swiper
                        className="pt-3 pb-5"
                        modules={[Pagination]}
                        slidesPerView={2}
                        spaceBetween={6}
                        pagination={{
                            clickable: true,
                            dynamicBullets: true,
                        }}
                        breakpoints={{
                            576: {
                                slidesPerView: 3,
                                spaceBetween: 15,
                            },
                            768: {
                                slidesPerView: 5,
                                spaceBetween: 10,
                            },
                            992: {
                                slidesPerView: 6,
                                spaceBetween: 15,
                            },
                            1200: {
                                slidesPerView: 6,
                                spaceBetween: 30,
                            },
                        }}
                    >
                        <SwiperSlide>
                            <img src="/images/partners/image 10.jpg" alt="partners"/>
                        </SwiperSlide>
                        <SwiperSlide>
                            <img src="/images/partners/image 11.jpg" alt="partners"/>
                        </SwiperSlide>
                        <SwiperSlide><img src="/images/partners/image 12.jpg" alt="partners"/></SwiperSlide>
                        <SwiperSlide><img src="/images/partners/image 13.jpg" alt="partners"/></SwiperSlide>
                        <SwiperSlide><img src="/images/partners/image 14.jpg" alt="partners"/></SwiperSlide>
                        <SwiperSlide><img src="/images/partners/image 15.jpg" alt="partners"/></SwiperSlide>
                        <SwiperSlide>
                            <img src="/images/partners/image 10.jpg" alt="partners"/>
                        </SwiperSlide>
                        <SwiperSlide>
                            <img src="/images/partners/image 11.jpg" alt="partners"/>
                        </SwiperSlide>
                        <SwiperSlide><img src="/images/partners/image 12.jpg" alt="partners"/></SwiperSlide>
                        <SwiperSlide><img src="/images/partners/image 13.jpg" alt="partners"/></SwiperSlide>
                        <SwiperSlide><img src="/images/partners/image 14.jpg" alt="partners"/></SwiperSlide>
                        <SwiperSlide><img src="/images/partners/image 15.jpg" alt="partners"/></SwiperSlide>
                    </Swiper>
                </div>
            </section>
        </main>
    );
}

export default Service