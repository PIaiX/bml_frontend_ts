import React, {useEffect, useState} from 'react'
import NewsPreview from '../components/NewsPreview'
import NewsMini from '../components/NewsMini'
import Partners from '../components/Partners'
import Breadcrumbs from '../components/utils/Breadcrumbs'
import usePagination from '../hooks/pagination'
import {getImages} from '../services/temp'
import Pagination from '../components/utils/Pagination'
import Loader from '../components/utils/Loader'
import {onSelectHandler} from '../helpers/formHandlers'

const News = () => {
    const [sorting, setSorting] = useState<any>({byPublicationDate: 0})
    const [showedCount, setShowedCount] = useState<any>(24)
    const [data, setData] = useState<any>({
        isLoading: false,
        error: null,
        items: [],
    })
    const {paginationItems, pageCount, selectedPage, handlePageClick} = usePagination(data.items, showedCount)

    // ! continue working after creating backend services
    useEffect(() => {
        getImages()
            .then((items) => setData({isLoading: true, foundCount: items.length, items}))
            .catch((error) => setData({isLoading: true, error}))
    }, [sorting])

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
                            Показано {paginationItems.length}
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
                                <option value={0} disabled hidden>
                                    по дате публикации
                                </option>
                                <option value={'desc'}>сначала новые</option>
                                <option value={'asc'}>сначала старые</option>
                            </select>
                        </div>
                    </div>
                    <div className="mt-5" id="block_4">
                        <div className="row">
                            <div className="col-md-4 col-lg-3 mb-4 mb-md-0">
                                {data.isLoading ? (
                                    data.items.length ? (
                                        paginationItems.map((item: any) => (
                                            <NewsMini
                                                key={item.id}
                                                className={'mb-3 mb-md-4'}
                                                url={item.id}
                                                date={'28.09.2020'}
                                                title={item.title}
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
                                    {data.isLoading ? (
                                        data.items.length ? (
                                            paginationItems.map((item: any) => (
                                                <div key={item.id}>
                                                    <NewsPreview
                                                        url={item.id}
                                                        imgUrl={item.url}
                                                        title={item.title}
                                                        text={
                                                            'Сейчас бесконтактные бизнес-процедуры — оптимальный вариант ведения бизнеса.'
                                                        }
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
                            Показано {paginationItems.length}
                            <span className="d-none d-lg-inline"> статьи и новости</span>
                        </div>
                        <button
                            className="btn_main btn_3"
                            onClick={() => setShowedCount((prevShowedCount: any) => prevShowedCount + 20)}
                        >
                            Смотреть еще 20
                        </button>
                    </div>
                </section>
            </div>

            <Partners />
        </main>
    )
}

export default News
