import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import { MdOutlineArrowBack } from 'react-icons/md'
import { useQuery } from 'react-query'
import { getPartners, getTutorials } from '../../services/instructions'
import { checkPhotoPath } from '../../helpers/photoLoader'
import Loader from '../../components/utils/Loader'

const Instructions: FC = () => {
    const partners = useQuery({
        queryKey: ['partners'],
        queryFn: () => getPartners(1, 100),
        cacheTime: 10 * 60 * 1000,
        staleTime: 10 * 60 * 1000,
    })
    const tutorial = useQuery({
        queryKey: ['tutor'],
        queryFn: () => getTutorials(1, 100),
        cacheTime: 10 * 60 * 1000,
        staleTime: 10 * 60 * 1000,
    })

    return (
        <>
            <Link to="/account" className="color-1 f_11 fw_5 d-flex align-items-center d-lg-none mb-3 mb-sm-4">
                <MdOutlineArrowBack /> <span className="ms-2">Назад</span>
            </Link>
            <div className="acc-box">
                <h4>Как загрузить объявление и пользоваться сайтом</h4>
                <div className="row row-cols-sm-2 row-cols-md-3 g-4">
                    {!tutorial?.isLoading ? (
                        tutorial?.data?.data?.map((i) =>
                            i?.isEmbed ? (
                                <div key={i?.id}>
                                    <div className="acc-video">
                                        <iframe
                                            src={i?.media?.replace('/watch?v=', '/embed/')}
                                            title="YouTube video player"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                        />
                                    </div>
                                    {i?.isTitleLink ? (
                                        <a href={i?.media} target="_blank" rel="noopener noreferrer" >{i?.title}</a>
                                    ) : (
                                        <div className="mt-2">{i?.title}</div>
                                    )}
                                </div>
                            ) : (
                                <div key={i?.id} className="acc-video-block">
                                    <div className="acc-video">
                                        <video controls playsInline>
                                            <source src={checkPhotoPath(i?.media)} />
                                        </video>
                                    </div>
                                    {i?.isTitleLink ? (
                                        <a href={i?.media} target="_blank" rel="noopener noreferrer">{i?.title}</a>
                                    ) : (
                                        <div className="mt-2">{i?.title}</div>
                                    )}
                                </div>
                            )
                        )
                    ) : (
                        <div className="p-2 w-100 d-flex justify-content-center">
                            <Loader color="#343434" />
                        </div>
                    )}
                </div>
                <hr />
                <h4>Партнёры</h4>
                <div className="row row-cols-sm-2 row-cols-md-3 g-4">
                    {!partners?.isLoading ? (
                        partners?.data?.data?.map((i) =>
                            i?.mediaType ? (
                                <div key={i?.id}>
                                    <div className="acc-video">
                                        <iframe
                                            src={i?.media?.replace('/watch?v=', '/embed/')}
                                            title="YouTube video player"
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                        />
                                    </div>
                                    {i?.isTitleLink ? (
                                        <a href={i?.media} target="_blank" rel="noopener noreferrer">{i?.title}</a>
                                    ) : (
                                        <div className="mt-2">{i?.title}</div>
                                    )}
                                </div>
                            ) : (
                                <div key={i?.id}>
                                    <div className="acc-video">
                                        <img src={checkPhotoPath(i?.media)} height={100 + '%'} width={100 + '%'} />
                                    </div>
                                    {i?.isTitleLink ? (
                                        <a href={i?.media} target="_blank" rel="noopener noreferrer">{i?.title}</a>
                                    ) : (
                                        <div className="mt-2">{i?.title}</div>
                                    )}
                                </div>
                            )
                        )
                    ) : (
                        <div className="p-2 w-100 d-flex justify-content-center">
                            <Loader color="#343434" />
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default Instructions
