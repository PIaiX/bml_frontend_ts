import React, {FC, useCallback, useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import {MdOutlineArrowBack} from 'react-icons/md'
import AdvPreview from '../../components/AdvPreview'
import {IPagination, IUseStateItems} from '../../types'
import {IOffersItem, IOffersMeta} from '../../types/offers'
import {getFavorites} from '../../services/favorites'
import {IUser} from '../../types/user'
import {useAppDispatch, useAppSelector} from '../../hooks/store'
import usePagination from '../../hooks/pagination'
import Loader from '../../components/utils/Loader'
import Pagination from '../../components/utils/Pagination'
import AccountMenu from "./AccountMenu";
import {setInitialCount} from "../../store/reducers/favoriteCountSlice";

const Favorites: FC = () => {
    const token = localStorage.getItem('token')
    const [favoriteOffers, setFavoriteOffers] = useState<IUseStateItems<IOffersItem, IOffersMeta>>({
        isLoaded: false,
        items: null,
        meta: null,
    })
    const generalLimit = 6
    const [click, setClick] = useState(false)
    const user: IUser | null = useAppSelector((state) => state?.user?.user)
    const dispatch = useAppDispatch()

    const {paginationItems, pageCount, selectedPage, setSelectedPage, handlePageClick}: IPagination<IOffersItem> =
        usePagination(favoriteOffers?.items, generalLimit, favoriteOffers?.meta?.total)

    useEffect(() => {
        if (user?.id) {
            getFavorites(user?.id, selectedPage + 1, generalLimit)
                .then((res) => {
                    if(res){
                        dispatch(setInitialCount(res?.data.length))
                        setFavoriteOffers({isLoaded: true, items: res?.data, meta: res?.meta})
                    }
                })
                .catch((error) => setFavoriteOffers({isLoaded: true, items: null, meta: null}))
        }
    }, [user?.id, selectedPage, click, token])

    const clickInDeleteFavorite = useCallback(() => {
        if (user) {
            getFavorites(user?.id, selectedPage + 1, generalLimit)
                .then((res) => {
                    res && setFavoriteOffers({isLoaded: true, items: res?.data, meta: res?.meta})
                })
                .catch((error) => setFavoriteOffers({isLoaded: true, items: null, meta: null}))
        }
    }, [selectedPage, user?.id])

    useEffect(() => {
        if (paginationItems?.length === 0) {
            setSelectedPage(0)
        }
    }, [paginationItems?.length])

    return (
        <>{user?<>
            <Link to="/account" className="color-1 f_11 fw_5 d-flex align-items-center d-lg-none mb-3 mb-sm-4">
                <MdOutlineArrowBack /> <span className="ms-2">Назад</span>
            </Link>
            <div className="row row-cols-2 row-cols-md-3 g-2 g-sm-3 g-xl-4">
                {favoriteOffers?.isLoaded ? (
                    paginationItems?.length > 0 ? (
                        paginationItems?.map((i) => (
                            <div key={i.id} style={{position:"relative"}}>
                                <AdvPreview
                                    id={i.id}
                                    image={i.image}
                                    title={i.title}
                                    investments={i.investments}
                                    favorite={true}
                                    callbackClick={clickInDeleteFavorite}
                                />
                            </div>
                        ))
                    ) : (
                        <h6 className="w-100 p-5 text-center">В избранных пока ничего нет</h6>
                    )
                ) : (<div className="p-5 w-100 d-flex justify-content-center">
                        <Loader color="#343434" />
                    </div>
                )}
            </div>
            {paginationItems?.length > 0 ? (
                <div className="acc-box p-0 mt-3 d-flex justify-content-center">
                    <Pagination
                        nextLabel="❯"
                        onPageChange={handlePageClick}
                        pageRangeDisplayed={3}
                        marginPagesDisplayed={1}
                        pageCount={pageCount}
                        previousLabel="❮"
                        forcePage={selectedPage}
                    />
                </div>
            ) : (
                ''
            )}
        </>:<AccountMenu></AccountMenu>}

        </>
    )
}

export default Favorites
