import React, {FC, useEffect, useState} from 'react'
import NewsMini from '../NewsMini'
import Loader from '../utils/Loader'
import {Link} from 'react-router-dom'
import {Swiper, SwiperSlide} from 'swiper/react'
import {Pagination} from 'swiper'
import NewsPreview from '../NewsPreview'
import {useGetAllNewsQuery} from '../../services/RTK/newsApi'
import {INewsUseState} from '../../types/news'

const NewsContainer: FC = () => {
    const [news, setNews] = useState<INewsUseState>({
        items: null,
        meta: null,
    })

    const {data, error, isLoading} = useGetAllNewsQuery({page: 1, limit: 6, orderBy: 'desc'})

    useEffect(() => {
        !isLoading && data && setNews({meta: data?.body?.meta, items: data?.body?.data})
    }, [isLoading, data])

    return (
        <section className="container" id="block_4">
            <h2>Новости и статьи</h2>
            <div className="row">
                <div className="col-md-4 col-lg-3 mb-sm-3 mb-md-0 pt-3">
                    {!isLoading ? (
                        news?.items?.length ? (
                            news.items
                                .slice(0, 3)
                                .map((item) => (
                                    <NewsMini
                                        key={item?.id}
                                        className="mb-3 mb-md-4"
                                        url={`${item?.slug}`}
                                        date={item?.createdAt}
                                        title={item?.title}
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
                        {!isLoading ? (
                            news?.items?.length ? (
                                news?.items?.map((item) => (
                                    <SwiperSlide key={item.id}>
                                        <NewsPreview
                                            url={`/news/${item?.slug}`}
                                            imgUrl={item?.image}
                                            title={item?.title}
                                            text={item?.description}
                                            readingTimeTo={item?.readingTimeTo}
                                            readingTimeFrom={item?.readingTimeFrom}
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
    )
}

export default NewsContainer
