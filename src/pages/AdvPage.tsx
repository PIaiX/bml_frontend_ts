import React from 'react'
import Breadcrumbs from '../components/utils/Breadcrumbs'
import AdvPreview from '../components/AdvPreview'
import {NavLink} from 'react-router-dom'
import {Link} from 'react-scroll'
import {MdOutlineShoppingCart, MdInfoOutline, MdOutlinePlace, MdDateRange, MdOutlineVisibility} from 'react-icons/md'
import BtnFav from '../components/utils/BtnFav'
import {PhotoProvider, PhotoView} from 'react-photo-view'
import 'react-photo-view/dist/react-photo-view.css'
import Partners from '../components/Partners'
import {Swiper, SwiperSlide} from 'swiper/react'
import {Pagination} from 'swiper'
import 'swiper/css'
import 'swiper/css/pagination'

const AdvPage = () => {
    return (
        <main>
            <div className="container pt-3 pt-sm-4">
                <Breadcrumbs />
            </div>

            <section id="offer-page" className="container">
                <h1>English 1st</h1>
                <div className="d-lg-flex justify-content-between align-items-center mb-2 mb-sm-4">
                    <h2 className="mb-0">франшиза школы иностранных языков</h2>
                    <div className="short-info ms-auto mt-3 mt-sm-4 mt-lg-0">
                        <span>ID: 55113344</span>
                        <time className="d-flex align-items-center ms-3 ms-sm-4">
                            <MdDateRange />
                            <span className="ms-1 ms-sm-2">12.10.2020</span>
                        </time>
                        <div className="d-flex align-items-center ms-3 ms-sm-4">
                            <MdOutlineVisibility />
                            <span className="ms-1 ms-sm-2">120 просмотров</span>
                        </div>
                    </div>
                </div>

                <div className="row mb-3 mb-sm-4 mb-md-5">
                    <div className="col-lg-7 col-xl-8 mb-4 mb-lg-0">
                        <img src="/images/offers/3.jpg" alt="offers" className="main-img" />
                    </div>
                    <div className="col-lg-5 col-xl-4">
                        <div className="blue-box h-100 d-flex flex-column justify-content-between">
                            <div>
                                <div className="d-flex justify-content-between align-items-center mb-2 mb-sm-4">
                                    <NavLink to="/account/profile/view" className="user d-flex align-items-center">
                                        <img src="/images/photo.png" alt="Александр Васильев" />
                                        <div className="ms-2">
                                            <div className="f_11">Александр Васильев</div>
                                            <div className="f_09">Представитель франшизы</div>
                                        </div>
                                    </NavLink>
                                    <div className="d-flex align-items-center">
                                        <BtnFav check={false} className={'color-2 f_20'} />
                                        <button type="button" className="color-1 f_20 ms-3 ms-sm-4 ms-lg-2 ms-xxl-3">
                                            <MdOutlineShoppingCart />
                                        </button>
                                    </div>
                                </div>

                                <div className="d-flex align-items-center mb-3">
                                    <span className="pt fw_7 gray f_11 me-2 me-sm-4">Инвестиции:</span>
                                    <span className="f_20 fw_5">1 000 000 Р</span>
                                </div>
                                <div className="d-flex align-items-center mb-3">
                                    <span className="pt fw_7 gray f_11 me-2 me-sm-4">Прибыль в месяц:</span>
                                    <span className="f_20 fw_5">100 000 Р</span>
                                </div>
                                <div className="d-flex align-items-center mb-3">
                                    <span className="pt fw_7 gray f_11 me-2 me-sm-4">Окупаемость:</span>
                                    <span className="f_20 fw_5">1 000 000 Р</span>
                                </div>
                            </div>

                            <div>
                                <button type="button" className="btn_main btn-5 f_11 w-100">
                                    ПОЛУЧИТЬ БИЗНЕС-ПЛАН
                                </button>
                                <button type="button" className="btn_main btn-6 f_11 w-100 mt-2 mt-sm-3">
                                    НАПИСАТЬ СООБЩЕНИЕ
                                </button>
                            </div>

                            <button
                                type="button"
                                className="d-flex align-items-center ms-auto me-0 mt-3 mt-sm-4 mt-lg-0"
                            >
                                <MdInfoOutline className="f_11 gray" />
                                <span className="ms-2 fw_7 f_09">Пожаловаться</span>
                            </button>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-4 col-lg-3 position-relative">
                        <div className="left_menu">
                            <nav className="anchor-menu d-none d-md-block">
                                <ul>
                                    <li>
                                        <Link
                                            activeClass="active"
                                            to="anchor_1"
                                            spy={true}
                                            smooth={true}
                                            hashSpy={true}
                                            offset={-130}
                                            duration={300}
                                            isDynamic={true}
                                        >
                                            Описание компании
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            activeClass="active"
                                            to="anchor_2"
                                            spy={true}
                                            smooth={true}
                                            hashSpy={true}
                                            offset={-130}
                                            duration={300}
                                            isDynamic={true}
                                        >
                                            Описание франшизы
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            activeClass="active"
                                            to="anchor_3"
                                            spy={true}
                                            smooth={true}
                                            hashSpy={true}
                                            offset={-130}
                                            duration={300}
                                            isDynamic={true}
                                        >
                                            Преимущества франшизы
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            activeClass="active"
                                            to="anchor_4"
                                            spy={true}
                                            smooth={true}
                                            hashSpy={true}
                                            offset={-130}
                                            duration={300}
                                            isDynamic={true}
                                        >
                                            Этапы сотрудничества
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            activeClass="active"
                                            to="anchor_5"
                                            spy={true}
                                            smooth={true}
                                            hashSpy={true}
                                            offset={-130}
                                            duration={300}
                                            isDynamic={true}
                                        >
                                            Покупка франшизы
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            activeClass="active"
                                            to="anchor_6"
                                            spy={true}
                                            smooth={true}
                                            hashSpy={true}
                                            offset={-130}
                                            duration={300}
                                            isDynamic={true}
                                        >
                                            Фотогалерея
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            activeClass="active"
                                            to="anchor_7"
                                            spy={true}
                                            smooth={true}
                                            hashSpy={true}
                                            offset={0}
                                            duration={300}
                                            isDynamic={true}
                                        >
                                            Похожие франшизы
                                        </Link>
                                    </li>
                                </ul>
                            </nav>

                            <div className="row justify-content-center g-4">
                                <div className="col-8 col-sm-6 col-md-12 promo">
                                    <img src="/images/img-0.jpg" alt="img" className="img-fluid mb-2" />
                                    <h4 className="fw_7 mb-2">Акции от застройщиков</h4>
                                    <h5 className="mb-0">
                                        ТекстТекстТекст ТекстТекстТекст ТекстТекстТекстТекст Текст\Текст
                                        ТекстТекстТекстТекстТекст
                                    </h5>
                                </div>
                                <div className="col-8 col-sm-6 col-md-12 promo">
                                    <img src="/images/img-0.jpg" alt="img" className="img-fluid mb-2" />
                                    <h4 className="fw_7 mb-2">Акции от застройщиков</h4>
                                    <h5 className="mb-0">
                                        ТекстТекстТекст ТекстТекстТекст ТекстТекстТекстТекст Текст\Текст
                                        ТекстТекстТекстТекстТекст
                                    </h5>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-8 col-lg-9">
                        <div className="offer-page-main">
                            <hr className="mt-md-0" />
                            <div className="d-flex align-items-center f_09 mb-4 mb-lg-5">
                                <MdOutlinePlace className="color-1" />
                                <span className="gray ms-2">Регионы продаж:</span>
                                <span className="ms-3">Казань</span>
                            </div>
                            <section className="anchor_block" id="anchor_1">
                                <h4 className="fw_7">Описание компании</h4>
                                <p>
                                    Школа английского языка предлагает курсы для детей и взрослых. Наши современные
                                    методики обучения и специально разработанные программы по обучению иностранным
                                    языкам помогают эффективно и в короткие сроки достичь отличных результатов. Мы
                                    предлагаем занятия для детей от 5 лет, а гибкий график занятий Вы сможете настроить
                                    индивидуально для вашего ребенка. В нашей школе дети могут изучать языки в течение
                                    всего учебного года, а также во время отдыха в нашем летнем языковом лагере.
                                </p>
                            </section>

                            <section className="anchor_block" id="anchor_2">
                                <h4 className="fw_7">Описание франшизы</h4>
                                <p>
                                    Франшиза «English 1st» включает не только формат офлайн-обучения детей, но и онлайн.
                                    В пакет франшизы входят: онлайн-игры, мобильное приложение, онлайн-тесты для детей.
                                    С 2020 года франчайзер запустил новые образовательные онлайн-продукты. Они позволяют
                                    детям учиться по видеоурокам в записи или онлайн-урокам с педагогами в прямом эфире,
                                    не выходя из дома. Продукты включены в пакет франшизы детского языкового центра
                                    English 1st. Также набор программ дополнен новыми авторскими курсами по скорочтению
                                    и каллиграфии.
                                </p>
                            </section>

                            <section className="anchor_block" id="anchor_3">
                                <h4 className="fw_7">Преимущества франшизы</h4>
                                <ul>
                                    <li>Уникальная авторская методика, гарантирующая быстрый результат;</li>
                                    <li>Небольшие стартовые инвестиции;</li>
                                    <li>Поддержка на всех этапах открытия и работы Центра;</li>
                                    <li>Более 130 успешно работающих филиалов по всему миру.</li>
                                </ul>
                                <h5 className="fw_7 mb-4">Во франчайзинговый пакет входит:</h5>
                                <ul>
                                    <li>Бизнес-план</li>
                                    <li>Маркетинговый план</li>
                                    <li>Комплект методических пособий с поурочным планированием</li>
                                    <li>Сценарии праздников и мероприятий</li>
                                    <li>Комплект плакатов, игр, флэшкарт</li>
                                    <li>Типовой дизайн-проект с 3D-визуализацией</li>
                                    <li>Более 1000 дизайнерских макетов</li>
                                    <li>Документы, необходимые для получения лицензии</li>
                                    <li>Обучение франчайзи и кураторство на протяжении всего периода сотрудничества</li>
                                    <li>
                                        Подбор, собеседования и обучение всех преподавателей, мотивационная система для
                                        педагогов
                                    </li>
                                    <li>Сайт на общем домене</li>
                                    <li>CRM-система для ведения учета</li>
                                    <li>
                                        Поддержка специалистов франчайзера: юриста, бухгалтера, маркетолога,
                                        HR-специалиста, дизайнеров, иллюстраторов, программистов, копирайтеров –
                                        постоянная и ежедневная
                                    </li>
                                    <li>Помощь в получении субсидии на развитие бизнеса</li>
                                    <li>Регистрация договора коммерческой концессии в Роспатенте</li>
                                    <li>Регулярные консультации и семинары</li>
                                    <li>
                                        Участие в общих корпоративных мероприятиях, где партнеры сети общаются и
                                        обмениваются опытом, а также принимают участие в формировании стратегии развития
                                        сети.
                                    </li>
                                </ul>
                            </section>

                            <section className="anchor_block" id="anchor_4">
                                <h4 className="fw_7">Этапы сотрудничества</h4>
                                <ol>
                                    <li>
                                        Договор коммерческой концессии заключается на пять лет и проходит обязательную
                                        регистрацию в Роспатенте.
                                    </li>
                                    <li>
                                        Подробный бизнес план с детально описанными бизнес-процессами позволит как
                                        предпринимателям с опытом, так и начинающим бизнесменам разобраться в тонкостях
                                        образовательного бизнеса.
                                    </li>
                                    <li>
                                        Франчайзер помогает подготовить документы на получение субсидии по договору
                                        франчайзинга. У нас 100% успех в получении грантов и субсидий, мы имеем в этом
                                        большой опыт!
                                    </li>
                                    <li>
                                        В работе каждому партнеру помогают два куратора, которые готовы ответить на все
                                        вопросы.
                                    </li>
                                    <li>
                                        Регулярные семинары для руководителей, а также администраторов и педагогов
                                        центров проводятся не реже двух раз в месяц, в дальнейшем все записи вебинаров
                                        можно просмотреть в записи, чтобы освежить информацию.
                                    </li>
                                    <li>
                                        Полный комплект методических материалов с поурочным планированием, сценарии
                                        праздников и мероприятий центра.
                                    </li>
                                    <li>
                                        Юрист и бухгалтер компании помогут проверить и составить договора и разобраться
                                        с налогами.
                                    </li>
                                    <li>
                                        Маркетолог и специалист по PR составили подробный маркетинговый план и окажут
                                        поддержку по любым вопросам.
                                    </li>
                                    <li>
                                        У каждого партнера свой сайт на общем домене, где он может принимать заявки на
                                        обучение, публиковать новости, расписание, информацию о педагогах центра.
                                        Посещаемость сайта - более 5000 человек.
                                    </li>
                                    <li>
                                        CRM-система «Полиглотики-бизнес», позволяющая вести кадровый, финансовый учет,
                                        планировать загрузку помещений и вести базу клиентов.
                                    </li>
                                    <li>
                                        Наш партнер получает все шаблоны и программу для получения лицензии на
                                        образовательную деятельность.
                                    </li>
                                    <li>
                                        Франчайзер помогает с поиском и подбором персонала, проводит собеседование,
                                        тестирование и обязательное обучение педагогов центра (в любом количестве).
                                    </li>
                                    <li>Узнаваемый бренд, неповторимый стиль зафиксированы в бренд-буке.</li>
                                    <li>
                                        Франчайзер проводит регулярные встречи партнеров: ежеквартальные бизнес-завтраки
                                        и ежегодные слеты. Ежедневное общение партнеров сети происходит в онлайн-чате.
                                        «Полиглотики» разработали популярную игру для изучения новых слов – ее можно
                                        скачать бесплатно через сайт или Google Play.
                                    </li>
                                </ol>
                            </section>

                            <section className="anchor_block" id="anchor_5">
                                <h4 className="fw_7">Покупка франшизы</h4>
                                <ul>
                                    <li>Оставьте заявку на сайте или позвоните представителю франшизы сами</li>
                                    <li>С вами связывается представитель франашизы для первичного знакомства</li>
                                    <li>Вам направляется подробный бизнес - план и материалы выбранной франшизы.</li>
                                    <li>Если франшиза вам подходит, выслаются договор покупки франшизы.</li>
                                    <li>Вы оплачиаете платёж и получаете доступ к франшизе.</li>
                                    <li>Вы начинаете вести свой бизнес!</li>
                                </ul>
                            </section>

                            <section className="anchor_block mb-4" id="anchor_6">
                                <h4 className="fw_7">Фотогалерея</h4>
                                <PhotoProvider maskOpacity={0.75}>
                                    <div className="row row-cols-2 row-cols-sm-3 row-cols-lg-4 g-2 g-sm-3 g-xl-4">
                                        <div>
                                            <PhotoView src="/images/photogallery/1.jpg">
                                                <img
                                                    src="/images/photogallery/1.jpg"
                                                    alt="photogallery"
                                                    className="photogallery"
                                                />
                                            </PhotoView>
                                        </div>
                                        <div>
                                            <PhotoView src="/images/photogallery/2.jpg">
                                                <img
                                                    src="/images/photogallery/2.jpg"
                                                    alt="photogallery"
                                                    className="photogallery"
                                                />
                                            </PhotoView>
                                        </div>
                                        <div>
                                            <PhotoView src="/images/photogallery/3.jpg">
                                                <img
                                                    src="/images/photogallery/3.jpg"
                                                    alt="photogallery"
                                                    className="photogallery"
                                                />
                                            </PhotoView>
                                        </div>
                                        <div>
                                            <PhotoView src="/images/photogallery/4.jpg">
                                                <img
                                                    src="/images/photogallery/4.jpg"
                                                    alt="photogallery"
                                                    className="photogallery"
                                                />
                                            </PhotoView>
                                        </div>
                                        <div>
                                            <PhotoView src="/images/photogallery/5.jpg">
                                                <img
                                                    src="/images/photogallery/5.jpg"
                                                    alt="photogallery"
                                                    className="photogallery"
                                                />
                                            </PhotoView>
                                        </div>
                                        <div>
                                            <PhotoView src="/images/photogallery/6.jpg">
                                                <img
                                                    src="/images/photogallery/6.jpg"
                                                    alt="photogallery"
                                                    className="photogallery"
                                                />
                                            </PhotoView>
                                        </div>
                                    </div>
                                </PhotoProvider>
                            </section>

                            <section className="anchor_block" id="anchor_7">
                                <h4 className="fw_7">Краткая информация</h4>
                                <ul>
                                    <li>Инвестиции: 1 000 000 ₽</li>
                                    <li>Прибыль в месяц: 100 000 ₽</li>
                                    <li>Окупаемость: 1 000 000 ₽</li>
                                </ul>

                                <button type="button" className="d-flex align-items-center mb-2">
                                    <MdInfoOutline className="f_11 gray" />
                                    <span className="ms-2 fw_7 f_09">Пожаловаться</span>
                                </button>
                                <div className="f_08">Вы пожаловались</div>
                            </section>

                            <div className="tags mt-4">
                                <span>Франшизы</span>
                                <span>Франшизы в сфере образования</span>
                                <span>Франшизы</span>
                                <span>Франшизы в сфере образования</span>
                                <span>Франшизы</span>
                                <span>Франшизы в сфере образования</span>
                                <span>Франшизы</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="anchor_block mb-5" id="anchor_7">
                <div className="container">
                    <h2 className="mt-sm-4">Похожие франшизы</h2>
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
                                slidesPerView: 2,
                                spaceBetween: 15,
                            },
                            768: {
                                slidesPerView: 3,
                                spaceBetween: 10,
                            },
                            992: {
                                slidesPerView: 4,
                                spaceBetween: 15,
                            },
                            1200: {
                                slidesPerView: 4,
                                spaceBetween: 30,
                            },
                        }}
                    >
                        <SwiperSlide>
                            <AdvPreview
                                url={'adv-page'}
                                imgURL={'/images/offers/3.jpg'}
                                title={'English 1st - франшиза школы иностранных языков'}
                                summ={'400000'}
                            />
                        </SwiperSlide>
                        <SwiperSlide>
                            <AdvPreview
                                url={'adv-page'}
                                imgURL={'/images/offers/3.jpg'}
                                title={'English 1st - франшиза школы иностранных языков'}
                                summ={'400000'}
                            />
                        </SwiperSlide>
                        <SwiperSlide>
                            <AdvPreview
                                url={'adv-page'}
                                imgURL={'/images/offers/3.jpg'}
                                title={'English 1st - франшиза школы иностранных языков'}
                                summ={'400000'}
                            />
                        </SwiperSlide>
                        <SwiperSlide>
                            <AdvPreview
                                url={'adv-page'}
                                imgURL={'/images/offers/3.jpg'}
                                title={'English 1st - франшиза школы иностранных языков'}
                                summ={'400000'}
                            />
                        </SwiperSlide>
                        <SwiperSlide>
                            <AdvPreview
                                url={'adv-page'}
                                imgURL={'/images/offers/3.jpg'}
                                title={'English 1st - франшиза школы иностранных языков'}
                                summ={'400000'}
                            />
                        </SwiperSlide>
                        <SwiperSlide>
                            <AdvPreview
                                url={'adv-page'}
                                imgURL={'/images/offers/3.jpg'}
                                title={'English 1st - франшиза школы иностранных языков'}
                                summ={'400000'}
                            />
                        </SwiperSlide>
                        <SwiperSlide>
                            <AdvPreview
                                url={'adv-page'}
                                imgURL={'/images/offers/3.jpg'}
                                title={'English 1st - франшиза школы иностранных языков'}
                                summ={'400000'}
                            />
                        </SwiperSlide>
                        <SwiperSlide>
                            <AdvPreview
                                url={'adv-page'}
                                imgURL={'/images/offers/3.jpg'}
                                title={'English 1st - франшиза школы иностранных языков'}
                                summ={'400000'}
                            />
                        </SwiperSlide>
                    </Swiper>
                </div>
            </section>

            <Partners />
        </main>
    )
}

export default AdvPage
