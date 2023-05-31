import React, {useEffect, useState} from 'react'
import {NavLink, useParams} from 'react-router-dom'
import Breadcrumbs from './utils/Breadcrumbs'
import {MdArrowBack, MdDateRange, MdOutlineVisibility} from 'react-icons/md'
import Loader from './utils/Loader'
import {IOneNews} from '../types/news'
import {convertLocaleDate} from '../helpers/convertLocaleDate'
import {useGetOneNewQuery} from '../services/RTK/newsApi'
import {checkPhotoPath} from '../helpers/photoLoader'

const NewsItem = () => {
    const {slug} = useParams()
    const [newsItem, setNewsItem] = useState<IOneNews>({
        id: undefined,
        slug: undefined,
        title: undefined,
        description: undefined,
        viewsCount: undefined,
        suptitle: undefined,
        image: undefined,
        readingTimeFrom: undefined,
        readingTimeTo: undefined,
        createdAt: undefined,
        updatedAt: undefined,
    })


    const {data, error, isLoading} = useGetOneNewQuery(slug)

    useEffect(() => {
        !isLoading &&
        data &&
        setNewsItem({
            id: data?.body?.id,
            slug: data?.body?.slug,
            title: data?.body?.title,
            description: data?.body?.description,
            viewsCount: data?.body?.viewsCount,
            suptitle: data?.body?.suptitle,
            image: data?.body?.image,
            readingTimeFrom: data?.body?.readingTimeFrom,
            readingTimeTo: data?.body?.readingTimeTo,
            createdAt: data?.body?.createdAt,
            updatedAt: data?.body?.updatedAt,
        })
    }, [data, isLoading])

    if (isLoading)
        return <main className={'d-flex justify-content-center py-5'}><Loader color={'#2E5193'}/></main>
    else
        return (
        <main>
            <div className="container py-3 py-sm-4">
                <Breadcrumbs/>
                {!isLoading ? (
                    newsItem ? (
                        <article className="full">
                            <h1 className="h3 fw_5 rob my-3 my-sm-4 my-sm-5">{newsItem?.title}</h1>
                            <div className="short-info justify-content-start">
                                <time className="d-flex align-items-center">
                                    <MdDateRange/>
                                    <span className="ms-1 ms-sm-2">
                                        {newsItem?.createdAt && convertLocaleDate(newsItem?.createdAt)}
                                    </span>
                                </time>
                                <div className="d-flex align-items-center ms-3 ms-sm-4">
                                    <MdOutlineVisibility/>
                                    <span className="ms-1 ms-sm-2">{newsItem?.viewsCount}</span>
                                </div>
                            </div>
                            <hr/>
                            <div className="text">
                                <img className="new-page-img" src={checkPhotoPath(newsItem?.image)} onLoad={()=>window.scrollTo(0,0)} />
                                <div className="time">
                                    <div className="lh_1">
                                        {newsItem?.readingTimeFrom} - {newsItem?.readingTimeTo}
                                    </div>
                                    <div className="lh_1 gray">мин</div>
                                </div>
                                <h3>{newsItem?.suptitle}</h3>
                                <div
                                    dangerouslySetInnerHTML={{__html: newsItem?.description ? newsItem?.description : ''}}>
                                </div>
                            </div>
                            <NavLink className="return" to="/news">
                                <MdArrowBack/>
                                <span>Вернуться к остальным новоcтям</span>
                            </NavLink>
                        </article>
                    ) : (
                        <h6 className="w-100 p-5 text-center">Ничего нет</h6>
                    )
                ) : (
                    <div className="p-5 w-100 d-flex justify-content-center">
                        <Loader color="#343434"/>
                    </div>
                )}
            </div>
        </main>
    )
}

export default NewsItem
