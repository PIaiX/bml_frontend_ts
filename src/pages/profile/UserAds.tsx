import React, {FC, useState} from 'react'
import {Link} from 'react-router-dom'
import {MdOutlineArrowBack} from 'react-icons/md'
import NotArchiveAds from '../../components/NotArchiveAds'
import ArchiveAds from '../../components/ArchiveAds'
import {IUser} from "../../types/user";
import {useAppSelector} from "../../hooks/store";
import AccountMenu from "./AccountMenu";
import ModerationAds from "../../components/ModerationAds";
import BannedAds from "../../components/BannedAds";

const UserAds: FC = () => {
    const [section, setSection] = useState<number>(0)
    const [tab, setTab] = useState<number>(0)
    const user: IUser | null = useAppSelector((state) => state?.user?.user)
    return (
        <>{user ?
            <>

                <Link to="/account" className="color-1 f_11 fw_5 d-flex align-items-center d-lg-none mb-3 mb-sm-4">
                    <MdOutlineArrowBack/>
                    <span className="ms-2">Назад</span>
                </Link>
                <div className="acc-box">
                    <div
                        className="d-flex flex-column-reverse flex-sm-row justify-content-between align-items-center mb-3 mb-md-4">
                        <div className="d-flex align-items-center f_11 mt-3 mt-sm-0 flex-grow-1 row ">
                            <button
                                type="button"
                                className={`col-12 col-sm-6 col-md-3 col-lg-3 col-xl-3 ${section === 0 ? '' : 'l-gray '}`}
                                onClick={() => setSection(0)}>
                                <span>Объявления</span>
                                <span className="l-gray ms-2"></span>
                            </button>
                            <button
                                type="button"
                                className={`mt-2 mt-sm-0 col-12 col-sm-6 col-md-3 col-lg-3 col-xl-3 ${section === 1 ? '' : 'l-gray '}`}
                                onClick={() => setSection(1)}
                            >
                                <span>Архив</span>
                                <span className="l-gray ms-2"></span>
                            </button>
                            <button
                                type="button"
                                className={`mt-2 mt-md-0 col-12 col-sm-6 col-md-3 col-lg-3 col-xl-3 ${section === 2 ? '' : 'l-gray '} d-inline-block`}
                                onClick={() => setSection(2)}
                            >
                                <span>На модерации</span>
                                <span className="l-gray ms-2"></span>
                            </button>
                            <button
                                type="button"
                                className={`mt-2 mt-md-0 col-12 col-sm-6 col-md-3 col-lg-3 col-xl-3 ${section === 3 ? '' : 'l-gray '}`}
                                onClick={() => setSection(3)}
                            >
                                <span>В блоке</span>
                                <span className="l-gray ms-2"></span>
                            </button>
                        </div>
                        <Link to="new-ad" className="btn_main btn_3">
                            Новое объявление
                        </Link>
                    </div>
                    <div className="tab-btns">
                        <button type="button" className={tab === 0 ? 'active' : ''} onClick={() => setTab(0)}>
                            Поиск инвесторов
                        </button>
                        <button type="button" className={tab === 1 ? 'active' : ''} onClick={() => setTab(1)}>
                            Предложения инвесторов
                        </button>
                        <button type="button" className={tab === 2 ? 'active' : ''} onClick={() => setTab(2)}>
                            Поиск бизнес партнёров
                        </button>
                        <button type="button" className={tab === 3 ? 'active' : ''} onClick={() => setTab(3)}>
                            Продажа готового бизнеса
                        </button>
                        <button type="button" className={tab === 4 ? 'active' : ''} onClick={() => setTab(4)}>
                            Франшизы
                        </button>
                    </div>
                    {section === 0 ?
                        <NotArchiveAds tab={tab} section={section}/>
                        : section === 1 ?
                            <ArchiveAds tab={tab} section={section}/>
                            : section===2?
                                <ModerationAds tab={tab} section={section} />
                                : <BannedAds tab={tab} section={section} />
                            // : <ModerationAds tab={tab} section={section}/>
                    }
                </div>
            </>
            : <AccountMenu></AccountMenu>}
        </>

    )
}

export default UserAds
