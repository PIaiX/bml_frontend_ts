import React, {FC} from 'react'
import Partners from '../components/Partners'
import {Swiper, SwiperSlide} from 'swiper/react'
import {Pagination} from 'swiper'
import 'swiper/css'
import 'swiper/css/pagination'
import HomeCategoriesContainer from '../components/HomeCategoriesContainer'
import NewsContainer from '../components/NewsContainer'

const Home: FC = () => {
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

            <NewsContainer />

            <Partners />
        </main>
    )
}

export default Home