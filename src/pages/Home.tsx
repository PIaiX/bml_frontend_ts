import React, {FC} from 'react'
import Partners from '../components/Partners'
import 'swiper/css'
import 'swiper/css/pagination'
import HomeCategoriesContainer from '../components/HomeCategoriesContainer'
import NewsContainer from '../components/NewsContainer'
import BannerContainer from '../components/BannerContainer'
import BlocksContainer from '../components/BlocksContainer'

const Home: FC = () => {
    return (
        <main>
            <BannerContainer />

            <BlocksContainer />

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
