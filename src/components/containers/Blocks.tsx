import React, {FC} from 'react'
import {IOffersItem, IOffersMeta} from '../../types/offers'

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
                    <div className="white_box box_shad info_in_nums">
                        <div>
                            <div className="fw_5 mb-4">Поиск инвесторов</div>
                            <div className="f_09 pt">
                                <span className="color-2 fw_7">{investors?.total || 0}</span> зарегистрированных
                                инвесторов
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
                                <span className="color-2 fw_7">{businessPartners?.total || 0}</span> будущих
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
                            <div className="fw_5 mb-4">Поиск бизнес проектов</div>
                            <div className="f_09 pt">
                                <span className="color-2 fw_7">{saleBusiness?.total || 0}</span> готовых бизнес проектов
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
                            <div className="fw_5 mb-4">Поиск франшиз</div>
                            <div className="f_09 pt">
                                <span className="color-2 fw_7">{franchise?.total || 0}</span> размещенных франшиз
                            </div>
                        </div>
                        <div>
                            <img src="/images/icons/icon-4.svg" alt="Поиск инвесторов" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default BlocksContainer
