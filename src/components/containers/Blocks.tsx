import React, {FC} from 'react'
import {IOffersItem, IOffersMeta} from '../../types/offers'
import {Nav} from "react-bootstrap";
import {NavLink} from "react-router-dom";

type Props = {
    investors?: IOffersMeta
    businessPartners?: IOffersMeta
    saleBusiness?: IOffersMeta
    franchise?: IOffersMeta
}

const BlocksContainer: FC<Props> = ({investors, businessPartners, saleBusiness, franchise}) => {
    return (
        <section id="block_2" className="container">
            <div className="row row-cols-sm-2 row-cols-md-3 row-cols-lg-4 justify-content-center g-4">
                <div>
                    <NavLink to={'/category/0'}>
                    <div className="white_box box_shad info_in_nums">
                        <div>
                            <div className="fw_5 mb-4">Поиск инвесторов</div>
                            <div className="f_09 pt">
                                {/*<span className="color-2 fw_7">{(investors && investors?.total>99)? investors?.total : 100}</span> зарегистрированных*/}
                                Более <span className="color-2 fw_7">400</span> зарегистрированных инвесторов
                            </div>
                        </div>
                        <div>
                                <img src="/images/icons/icon-1.svg" alt="Поиск инвесторов" />
                        </div>
                    </div>
                    </NavLink>

                </div>
                <div>
                    <NavLink to={'/category/2'}>
                    <div className="white_box box_shad info_in_nums">
                        <div>
                            <div className="fw_5 mb-4">Зарегистрировано пользователей</div>
                            <div className="f_09 pt">
                                Более <span className="color-2 fw_7">7000</span> предпринимателей
                                {/*<span className="color-2 fw_7">{(businessPartners && businessPartners?.total>99)? businessPartners?.total : 100}</span> зарегистрированных партнёров по бизнесу*/}
                            </div>
                        </div>
                        <div>
                            <img src="/images/icons/icon-2.svg" alt="Поиск бизнес парнёров" />
                        </div>

                    </div>
                    </NavLink>
                </div>
                <div>
                    <NavLink to={'/category/3'}>
                    <div className="white_box box_shad info_in_nums">
                        <div>
                            <div className="fw_5 mb-4">Продажа бизнеса</div>
                            <div className="f_09 pt">
                                Более <span className="color-2 fw_7">600</span> проданных объектов
                                {/*<span className="color-2 fw_7">{(saleBusiness && saleBusiness?.total>99)? saleBusiness?.total : 100}</span> зарегистрированных*/}
                            </div>
                        </div>
                        <div>
                            <img src="/images/icons/icon-3.svg" alt="Поиск инвесторов" />
                        </div>
                    </div>
                    </NavLink>
                </div>
                <div>
                    <NavLink to={'/category/4'}>
                    <div className="white_box box_shad info_in_nums">
                        <div>
                            <div className="fw_5 mb-4">Поиск франшиз</div>
                            <div className="f_09 pt">
                                Более <span className="color-2 fw_7">50</span> компаний
                                {/*<span className="color-2 fw_7">{(franchise && franchise?.total>99)? franchise?.total : 100}</span> зарегистрированных*/}
                            </div>
                        </div>
                        <div>
                            <img src="/images/icons/icon-4.svg" alt="Поиск инвесторов" />
                        </div>
                    </div>
                    </NavLink>
                </div>
            </div>
        </section>
    )
}

export default BlocksContainer
