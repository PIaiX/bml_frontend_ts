import React, {BaseSyntheticEvent, createContext, useContext, useEffect, useState} from 'react';
import {IUser} from "../../types/user";
import {useAppSelector} from "../../hooks/store";
import {Link, useLocation} from "react-router-dom";
import {MdOutlineArrowBack} from "react-icons/md";
import AccountMenu from "./AccountMenu";
import ModerationBanners from "../../components/ModerationBanners";
import ActiveBanners from "../../components/ActiveBanners";
import ArchiveBanners from "../../components/ArchiveBanners";
import CustomModal from "../../components/utils/CustomModal";
import {IBannerCard} from "../../types/Banner";

export type BannerContent = {
    setBanner:(value:IBannerCard)=>void
}
export const MyBannerContext = createContext<BannerContent | null>(null)
export const useBannerContext = () => useContext(MyBannerContext)


const Banners = () => {
    const {state} = useLocation()
    const [section, setSection] = useState<number>(state?.section?state?.section:0)
    const [isShowMessageModal, setIsShowMessageModal] = useState(false)

    const [banner, setBanner] = useState<IBannerCard>()
    const user: IUser | null = useAppSelector((state) => state?.user?.user)

    useEffect(()=>{
        setIsShowMessageModal(banner?true:false)
    }, [banner])

    const DelBanner = (e:BaseSyntheticEvent) =>{
        e.preventDefault()
    }
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
                    <MyBannerContext.Provider value={{setBanner}}>
                        {/* Тут нужно прокинуть контекст, чтобы можно было удалять */}
                        {section === 0 ?
                            <ActiveBanners/>
                            : section === 1 ?
                                <ArchiveBanners/>
                                : <ModerationBanners/>
                        }
                    </MyBannerContext.Provider>
                </div>
                <CustomModal
                    isShow={isShowMessageModal}
                    setIsShow={()=>setBanner(undefined)}
                    centered={false}
                    closeButton={true}
                    className="modal__messages"
                >
                    <form>
                        <div>Вы уверены, что хотите удалить рекламный баннер?</div>
                        <div>На счёт будет возращено 500 рублей.</div>
                        <div className="d-flex justify-content-center mt-5">
                            <button
                                className="btn_main btn_1"
                                onClick={(event: BaseSyntheticEvent) =>
                                    DelBanner(event)
                                }
                            >
                                Удалить
                            </button>
                        </div>
                    </form>
                </CustomModal>

            </>
            : <AccountMenu></AccountMenu>}
        </>

    )};

export default Banners;