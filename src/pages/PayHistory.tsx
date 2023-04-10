import React, {useEffect, useState} from 'react';
import {useAppSelector} from "../hooks/store";
import {Link} from "react-router-dom";
import {MdOutlineArrowBack} from "react-icons/md";
import Pagination from "../components/utils/Pagination";
import usePagination from "../hooks/pagination";
import {IUseStateItems} from "../types";
import {IOffersMeta} from "../types/offers";
import {getPayHistory} from "../services/PyaHistory";
import Loader from "../components/utils/Loader";
import PayItem from "../components/PayItem";

type PayHistoryType = {
    createdAtForUser: string,
    id: number,
    amount: number,
    method: string
}


const PayHistory = () => {
    const user = useAppSelector(state => state?.user?.user)
    const limit = 16
    const [offers, setOffers] = useState<IUseStateItems<PayHistoryType, IOffersMeta>>({
        isLoaded: true,
        items: null,
        meta: {
            "total": 322,
            "perPage": 36,
            "currentPage": 1,
            "lastPage": 1,
            "firstPage": 1,
            "firstPageUrl": "/?page=1&limit=36&category=1&orderBy=desc",
            "lastPageUrl": "/?page=1&limit=36&category=1&orderBy=desc",
            "nextPageUrl": '',
            "previousPageUrl": ''
        },
    })

    const {paginationItems, pageCount, selectedPage, handlePageClick, setSelectedPage} = usePagination(
        offers?.items,
        limit,
        offers?.meta?.total
    )

    useEffect(() => {
        getPayHistory(selectedPage + 1, limit)
            .then(res => {
                if (res)
                    setOffers({isLoaded: true, items: res?.data, meta: res?.meta})
                else{
                    setOffers({isLoaded: true, items: null, meta: null})
                }
            })
            .catch((error) => {
                setOffers({isLoaded: true, items: null, meta: null})
            })

    }, [selectedPage])

    return (
        <>
            <Link to="/account" className="color-1 f_11 fw_5 d-flex align-items-center d-lg-none mb-3 mb-sm-4">
                <MdOutlineArrowBack/> <span className="ms-2">Назад</span>
            </Link>
            <div className={'row-cols-1'}>
                <div className={'col'}><h4>История покупок</h4></div>
                {offers?.items &&
                    <>
                        <div className={'col'}>
                            <div className={'row row-cols-xl-4 fw-bold'}>
                                <div className={'col col-2 col-xl-2'}>Заказ</div>
                                <div className={'col col-3 col-xl-3'}>Дата</div>
                                <div className={'col col-4 col-xl-4'}>Способ оплаты</div>
                                <div className={'col col-3 col-xl-3'}>Цена</div>
                            </div>
                        </div>
                        {offers?.items?.map((element, index)=>
                            <PayItem key={index} {...element} />
                        )}
                        <div className={'col'}>
                            <div className="sort mb-4 d-flex">
                                <Pagination
                                    nextLabel="❯"
                                    onPageChange={handlePageClick}
                                    forcePage={selectedPage}
                                    pageRangeDisplayed={3}
                                    marginPagesDisplayed={1}
                                    pageCount={pageCount}
                                    previousLabel="❮"
                                />
                                <div className="flex-grow-1 d-flex justify-content-center">
                                <span
                                    className="d-none d-xl-inline">{`Показано ${paginationItems?.length} покупок из ${offers?.meta?.total}`}</span>
                                    <span
                                        className="d-inline d-xl-none">{`${paginationItems?.length} / ${offers?.meta?.total}`}</span>
                                </div>
                            </div>
                        </div>
                    </>}
                {!offers?.isLoaded &&
                    <div className="p-5 w-100 d-flex justify-content-center">
                        <Loader color="#343434" />
                    </div>
                }
                {offers?.isLoaded && !offers?.items &&
                    <h6 className="w-100 p-5 text-center">В истории покупок пока ничего нет</h6>
                }
            </div>


        </>
    );
};

export default PayHistory;