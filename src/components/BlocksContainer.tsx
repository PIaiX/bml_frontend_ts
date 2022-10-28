import React, {FC} from 'react'

const BlocksContainer: FC = () => {
    return (
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
                            <div className="fw_5 mb-4">Поиск бизнес проектов</div>
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
                            <div className="fw_5 mb-4">Поиск франшиз</div>
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
    )
}

export default BlocksContainer
