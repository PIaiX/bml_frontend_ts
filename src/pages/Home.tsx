import React, {useEffect, useState} from 'react'
import Partners from '../components/Partners'
import {Swiper, SwiperSlide} from 'swiper/react'
import {Pagination} from 'swiper'
import NewsPreview from '../components/NewsPreview'
import NewsMini from '../components/NewsMini'
import {Link} from 'react-router-dom'
import 'swiper/css'
import 'swiper/css/pagination'
import HomeCategoriesContainer from '../components/HomeCategoriesContainer'
import {getUnsplashImages} from '../services/temp'
import Loader from '../components/utils/Loader'

const Home = () => {
    const [news, setNews] = useState<any>({
        isLoading: false,
        error: null,
        items: [],
    })

    useEffect(() => {
        getUnsplashImages(1, 6)
            .then((items) => setNews({isLoading: true, items}))
            .catch((error) => setNews({isLoading: true, error}))
    }, [])

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
                                <div className="fw_5 mb-4">Поиск инвесторов</div>
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
                                <div className="fw_5 mb-4">Поиск инвесторов</div>
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

            <section className="bg_l_blue">
                <div className="container" id="block_3">
                    <h1>Главный заголовок</h1>
                    <div className="row align-items-center">
                        <div className="col-12 col-md-4 mb-4 mb-md-0">
                            <video controls>
                                <source src="/bml/video/video.mp4" type="video/mp4" />
                            </video>
                        </div>
                        <div className="col-12 col-md-8 col-xl-7 col-xxl-6">
                            <p className="f_12 pt">
                                Посмотрите видео о работе портала: для инвесторов и партнеров, с помощью которого, не
                                отрываясь от бизнес процессов, можно рассматривать перспективные проекты и узнавать о
                                трендах рынка
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <HomeCategoriesContainer />

            <section className="container" id="block_4">
                <h2>Новости и статьи</h2>
                <div className="row">
                    <div className="col-md-4 col-lg-3 mb-sm-3 mb-md-0 pt-3">
                        {news.isLoading ? (
                            news.items.length ? (
                                news.items
                                    .slice(0, 3)
                                    .map((item: any) => (
                                        <NewsMini
                                            key={item?.id}
                                            className="mb-3 mb-md-4"
                                            url={`news/${item?.id}`}
                                            date={'28.09.2020'}
                                            title={item?.user?.name}
                                        />
                                    ))
                            ) : (
                                <h6 className="w-100 p-5 text-center">Ничего нет</h6>
                            )
                        ) : (
                            <div className="p-5 w-100 d-flex justify-content-center">
                                <Loader color="#343434" />
                            </div>
                        )}
                        <div className="color-1">
                            <Link to="/news" className="bb_1 fw_5 link">
                                Все новости
                            </Link>
                        </div>
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
                            {news.isLoading ? (
                                news.items.length ? (
                                    news.items.map((item: any) => (
                                        <SwiperSlide key={item.id}>
                                            <NewsPreview
                                                url={`news/${item?.id}`}
                                                imgUrl={item?.urls?.full}
                                                title={item?.user?.name}
                                                text={item?.sponsorship?.tagline}
                                            />
                                        </SwiperSlide>
                                    ))
                                ) : (
                                    <h6 className="w-100 p-5 text-center">Ничего нет</h6>
                                )
                            ) : (
                                <div className="p-5 w-100 d-flex justify-content-center">
                                    <Loader color="#343434" />
                                </div>
                            )}
                        </Swiper>
                    </div>
                </div>
            </section>

            <Partners />
        </main>
    )
}

export default Home
