import React, { FC } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper'
import { useGetBannerQuery } from '../../services/RTK/bannerApi'
import Loader from '../utils/Loader'
import { checkPhotoPath } from '../../helpers/photoLoader'
import {useAppSelector} from "../../hooks/store";

type Props = {
    swiperDelay?: number
}

const BannerContainer: FC<Props> = ({ swiperDelay }) => {
    const { data, error, isLoading } = useGetBannerQuery()
    if (!swiperDelay) return null

    return (
        <Swiper
            className="swiper-1"
            modules={[Pagination, Autoplay]}
            slidesPerView={1}
            pagination={{ clickable: true }}
            autoplay={{ delay: swiperDelay * 1000 }}
        >
            {!isLoading ? (
                data ? (
                    data?.body?.map((item) => (
                        <SwiperSlide key={item?.id}>
                            <>
                                <img src={checkPhotoPath(item?.image)} alt={item?.title} />
                                <div className="container white">
                                    <div className="row">
                                        <div className="col-md-9 col-lg-7">
                                            <h2>{item?.title}</h2>
                                            <div className={'d-none d-sm-inline '}>
                                                <h5 dangerouslySetInnerHTML={{ __html: item?.description }} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {item?.link && <a href={item?.link} />}
                            </>
                        </SwiperSlide>
                    ))
                ) : (
                    <h3>Произошла ошибка</h3>
                )
            ) : (
                <div className="p-5 w-100 d-flex justify-content-center">
                    <Loader color="#343434" />
                </div>
            )}
        </Swiper>
    )
}

export default BannerContainer
