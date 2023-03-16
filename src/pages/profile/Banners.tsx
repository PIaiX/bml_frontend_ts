import React, {useState} from 'react';
import {IUser} from "../../types/user";
import {useAppSelector} from "../../hooks/store";
import {Link} from "react-router-dom";
import {MdOutlineArrowBack} from "react-icons/md";
import NotArchiveAds from "../../components/NotArchiveAds";
import ArchiveAds from "../../components/ArchiveAds";
import ModerationAds from "../../components/ModerationAds";
import AccountMenu from "./AccountMenu";

const Banners = () => {
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
                        <div className="d-flex align-items-center f_11 mt-3 mt-sm-0">
                            <button
                                type="button"
                                className={section === 0 ? '' : 'l-gray'}
                                onClick={() => setSection(0)}>
                                <span>Баннеры</span>
                                <span className="l-gray ms-2"></span>
                            </button>
                            <button
                                type="button"
                                className={section === 1 ? 'ms-4' : 'l-gray ms-4'}
                                onClick={() => setSection(1)}
                            >
                                <span>Архив</span>
                                <span className="l-gray ms-2"></span>
                            </button>
                            <button
                                type="button"
                                className={section === 3 ? 'ms-4' : 'l-gray ms-4'}
                                onClick={() => setSection(3)}
                            >
                                <span>На модерации</span>
                                <span className="l-gray ms-2"></span>
                            </button>
                        </div>
                        <Link to="/account/advertising-section" className="btn_main btn_3">
                            Новый баннер
                        </Link>
                    </div>
                    <div className="tab-btns">
                        <button type="button" className={tab === 0 ? 'active' : ''} onClick={() => setTab(0)}>
                            Рекламный баннер (1200х400)
                        </button>
                        <button type="button" className={tab === 1 ? 'active' : ''} onClick={() => setTab(1)}>
                            Рекламный баннер (250х160)
                        </button>
                    </div>
                    {section === 0 ?
                        <NotArchiveAds bannersType={true} tab={tab} section={section}/>
                        : section === 1 ?
                            <ArchiveAds bannersType={true} tab={tab} section={section}/>
                            : <ModerationAds bannersType={true} tab={tab} section={section}/>
                    }
                </div>
            </>
            : <AccountMenu></AccountMenu>}
        </>

    )};

export default Banners;