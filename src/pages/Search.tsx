import React, {useEffect, useState} from 'react';
import {getOffersFromHeader} from "../services/offers";
import {useAppDispatch, useAppSelector} from "../hooks/store";
import {IOffersItem, IOffersMeta, IPayloadsFilter} from "../types/offers";
import AdvPreview from "../components/AdvPreview";
import {useSearch} from "../hooks/useSearch";
import Loader from "../components/utils/Loader";
import {IUseStateItems2} from "../types";
import ServicePagination from "../components/utils/Pagination";
import usePagination from "../hooks/pagination";
import {setSearch} from "../store/reducers/searchHeader";

const Search = () => {
    const input = useAppSelector((state) => state?.search.input)
    const inputSearch = useSearch(input)
    const limit = 16
    const [loading, setLoading] = useState<boolean>(false);
    const [filters, setFilters] = useState<string>('desc')
    const dispatch = useAppDispatch()

    const [offers, setOffers] = useState<IUseStateItems2<IOffersItem, IOffersMeta>>({
        items: null,
        meta: null,
    })

    const {paginationItems, pageCount, selectedPage, handlePageClick, setSelectedPage} = usePagination(
        offers?.items,
        limit,
        offers?.meta?.total
    )
    useEffect(() => {
        getOffersFromHeader(inputSearch, filters, limit, selectedPage+1).then(res => {
            res && setOffers({meta: res.meta, items: res.data})
            setLoading(false)
        })
    }, [inputSearch, filters, selectedPage])

    useEffect(()=>setLoading(true), [filters, selectedPage])

    useEffect(() => {
        if (input !== inputSearch)
            setLoading(true)
        else
            setLoading(false)
    }, [input])

    useEffect(() =>
        setLoading(true), [])

    useEffect(()=>{
        return ()=>{
            dispatch(setSearch(""))
        }
    }, [])

    return (
        <main>
            <section className={"block_3 container"}>
                <h2 className="mt-4">Результаты поиска</h2>
                {offers?.items
                    && offers?.items.length>0
                    && <div className="sort mb-4">
                        <ServicePagination
                            nextLabel="❯"
                            onPageChange={handlePageClick}
                            forcePage={selectedPage}
                            pageRangeDisplayed={3}
                            marginPagesDisplayed={1}
                            pageCount={pageCount}
                            previousLabel="❮"
                        />
                        <div className="mr-2 mr-sm-0">
                            Показано {offers?.items && offers?.items.length}{' '}
                            <span className="d-none d-xl-inline">предложений из</span>
                            <span className="d-inline d-xl-none">/</span> {offers?.items && offers?.meta?.total}
                        </div>
                        <div className="d-flex align-items-center">
                            <span className="f_09 d-none d-lg-block">Сортировать:</span>
                            <select
                                name="orderBy"
                                value={filters}
                                className="f_08 ms-2 pe-4"
                                onChange={(e) => setFilters(e.target.value)}
                            >
                                <option value={''} disabled>
                                    по дате публикации
                                </option>
                                <option value={'desc'}>сначала новые</option>
                                <option value={'asc'}>сначала старые</option>
                            </select>
                        </div>
                    </div>}


                <div className="row g-2 g-sm-3 g-xl-4">
                    {
                        !loading ? (offers?.items && offers.items.length > 0 ? offers.items.map(item =>
                                <div className="col-6 col-md-4 col-lg-3" key={item.id}>
                                    <AdvPreview
                                        id={item.id}
                                        image={item.image}
                                        title={item.title}
                                        investments={item.investments}
                                        favorite={item?.isFavorite}
                                    />
                                </div>) : <h3 style={{textAlign: "center"}}>Не найдено</h3>
                        ) : <div style={{textAlign: "center"}}><Loader color={"black"}/></div>
                    }
                </div>
            </section>
        </main>
    );
};

export default Search;