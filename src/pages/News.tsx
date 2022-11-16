import React, {FC, useEffect, useState} from 'react'
import NewsPreview from '../components/NewsPreview'
import NewsMini from '../components/NewsMini'
import PartnersSite from '../components/PartnersSite'
import Breadcrumbs from '../components/utils/Breadcrumbs'
import usePagination from '../hooks/pagination'
import Pagination from '../components/utils/Pagination'
import Loader from '../components/utils/Loader'
import {onSelectHandler} from '../helpers/formHandlers'
import {INewsItems, INewsUseState} from '../types/news'
import {useGetAllNewsQuery} from '../services/RTK/newsApi'

const News: FC = () => {
    const [sorting, setSorting] = useState<any>({byPublicationDate: 'desc'})
    const [showedCount, setShowedCount] = useState<number>(24)
    const [news, setNews] = useState<INewsUseState>({
        items: null,
        meta: null,
    })
    const {paginationItems, pageCount, selectedPage, setSelectedPage, handlePageClick} = usePagination(
        news?.items,
        showedCount,
        news?.meta?.total
    )

    const {data, error, isLoading} = useGetAllNewsQuery({
        page: selectedPage + 1,
        limit: showedCount,
        orderBy: sorting?.byPublicationDate,
    })

    useEffect(() => {
        !isLoading && data && setNews({meta: data?.body?.meta, items: data?.body?.data})
    }, [isLoading, data])

    return (
        <main>
            <div className="container py-4">
                <Breadcrumbs />

                <section>
                    <div className="sort">
                        {/*<button onClick={handleClick}/>*/}
                        <Pagination
                            nextLabel="❯"
                            onPageChange={handlePageClick}
                            forcePage={selectedPage}
                            pageRangeDisplayed={3}
                            marginPagesDisplayed={1}
                            pageCount={pageCount}
                            previousLabel="❮"
                        />
                        <div className="mr-2 mr-sm-0">
                            Показано {paginationItems?.length}
                            <span className="d-none d-lg-inline"> статьи и новости</span>
                        </div>
                        <div className="d-flex align-items-center">
                            <span className="f_09 d-none d-lg-block">Сортировать:</span>
                            <select
                                className="f_08 ms-3 pe-4"
                                name="byPublicationDate"
                                value={sorting['byPublicationDate']}
                                onChange={(e) => onSelectHandler(e, setSorting)}
                            >
                                <option value={'desc'}>сначала новые</option>
                                <option value={'asc'}>сначала старые</option>
                            </select>
                        </div>
                    </div>
                    <div className="mt-5" id="block_4">
                        <div className="row">
                            <div className="col-md-4 col-lg-3 mb-4 mb-md-0">
                                {!isLoading ? (
                                    news?.items?.length ? (
                                        paginationItems?.map((item: INewsItems) => (
                                            <NewsMini
                                                key={item.id}
                                                className={'mb-3 mb-md-4'}
                                                url={item?.slug}
                                                date={item?.createdAt}
                                                title={item?.title}
                                            />
                                        ))
                                    ) : (
                                        <p className="w-100 p-2 text-center">Ничего нет</p>
                                    )
                                ) : (
                                    <div className="p-2 w-100 d-flex justify-content-center">
                                        <Loader color="#343434" />
                                    </div>
                                )}
                            </div>
                            <div className="col-md-8 col-lg-9">
                                <div className="row row-cols-sm-2 row-cols-lg-3 g-3 g-xl-4">
                                    {!isLoading ? (
                                        news?.items?.length ? (
                                            paginationItems?.map((item: INewsItems) => (
                                                <div key={item?.id}>
                                                    <NewsPreview
                                                        url={item?.slug}
                                                        imgUrl={item?.image}
                                                        title={item?.title}
                                                        text={item?.description}
                                                        readingTimeTo={item?.readingTimeTo}
                                                        readingTimeFrom={item?.readingTimeFrom}
                                                    />
                                                </div>
                                            ))
                                        ) : (
                                            <h6 className="w-100 p-5 text-center">Ничего нет</h6>
                                        )
                                    ) : (
                                        <div className="p-5 w-100 d-flex justify-content-center">
                                            <Loader color="#343434" />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="sort mt-5">
                        <Pagination
                            nextLabel="❯"
                            onPageChange={handlePageClick}
                            forcePage={selectedPage}
                            pageRangeDisplayed={3}
                            marginPagesDisplayed={1}
                            pageCount={pageCount}
                            previousLabel="❮"
                        />
                        <div className="me-2 me-sm-0">
                            Показано {paginationItems?.length}
                            <span className="d-none d-lg-inline"> статьи и новости</span>
                        </div>
                        <button
                            className="btn_main btn_3"
                            onClick={() => {
                                setShowedCount((prevShowedCount: number) => prevShowedCount + 20)
                                setSelectedPage(0)
                            }}
                        >
                            Смотреть еще 20
                        </button>
                    </div>
                </section>
            </div>

            <PartnersSite />
        </main>
    )
}

export default News
