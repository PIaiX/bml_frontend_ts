import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';

export default function Partners() {
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
                        <img src="/images/partners/image 10.jpg" alt="partners" />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src="/images/partners/image 11.jpg" alt="partners" />
                    </SwiperSlide>
                    <SwiperSlide><img src="/images/partners/image 12.jpg" alt="partners" /></SwiperSlide>
                    <SwiperSlide><img src="/images/partners/image 13.jpg" alt="partners" /></SwiperSlide>
                    <SwiperSlide><img src="/images/partners/image 14.jpg" alt="partners" /></SwiperSlide>
                    <SwiperSlide><img src="/images/partners/image 15.jpg" alt="partners" /></SwiperSlide>
                    <SwiperSlide>
                        <img src="/images/partners/image 10.jpg" alt="partners" />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src="/images/partners/image 11.jpg" alt="partners" />
                    </SwiperSlide>
                    <SwiperSlide><img src="/images/partners/image 12.jpg" alt="partners" /></SwiperSlide>
                    <SwiperSlide><img src="/images/partners/image 13.jpg" alt="partners" /></SwiperSlide>
                    <SwiperSlide><img src="/images/partners/image 14.jpg" alt="partners" /></SwiperSlide>
                    <SwiperSlide><img src="/images/partners/image 15.jpg" alt="partners" /></SwiperSlide>
                </Swiper>
            </div>
        </section>
    );
}