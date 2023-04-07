import React, {FC, useEffect} from 'react'
import {Swiper, SwiperSlide} from 'swiper/react'
import {Pagination} from 'swiper'
import 'swiper/css'
import 'swiper/css/pagination'
import {useAppSelector} from "../hooks/store";
import {useDispatch} from "react-redux";
import {getPartners} from "../services/partners";
import {AppDispatch} from "../store/store";
import {checkPhotoPath} from "../helpers/photoLoader";

const PartnersSite: FC = () => {
    const partners = useAppSelector(state => state.partners.partners)
    const dispatch = useDispatch<AppDispatch>()
    useEffect(()=>{
        if(!partners){
            dispatch(getPartners())
        }
    }, [partners])

    return (
        <section className="bg_l_blue">
            <div id="block_5" className="container">
                <h2 className="mt-sm-2">Наши партнёры</h2>
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
                            slidesPerView: partners && partners?.length>2?3:partners?.length,
                            spaceBetween: 15,
                        },
                        768: {
                            slidesPerView: partners && partners?.length>4?5:partners?.length,
                            spaceBetween: 10,
                        },
                        992: {
                            slidesPerView: partners && partners?.length>5?6:partners?.length,
                            spaceBetween: 15,
                        },
                        1200: {
                            slidesPerView: partners && partners?.length>5?6:partners?.length,
                            spaceBetween: 30,
                        },
                    }}
                >
                    {
                        partners?.map((element, index:number)=>
                            <SwiperSlide key={index}>
                                <div className={'w-100 h-100 d-flex justify-content-center'}>
                                    <img style={{cursor:"pointer"}} src={checkPhotoPath(element.image)} alt="partners"
                                         onClick={()=>{window.open(element.link);}}
                                    />
                                </div>
                            </SwiperSlide>
                        )
                    }
                </Swiper>
            </div>
        </section>
    )
}

export default PartnersSite
