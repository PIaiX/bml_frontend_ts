import React, {FC, useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import {MdOutlineArrowBack} from 'react-icons/md'
import {useQuery} from 'react-query'
import {getPartners, getTutorials} from '../../services/instructions'
import {checkPhotoPath} from '../../helpers/photoLoader'
import Loader from '../../components/utils/Loader'
import {IPartnersItem, ITutorialsItem} from "../../types/instructions";

const Instructions: FC = () => {

    const [partners, setPartners] = useState<Array<IPartnersItem>>()
    const [tutorial, setTutorial] = useState<Array<ITutorialsItem>>()

    useEffect(()=>{
        getTutorials(1, 100)
            .then(res=>{if(res)setTutorial(res)})
    }, [])

    useEffect(()=>{
        if(tutorial)
            getPartners(1, 100).then(res=>{if(res)setPartners(res)})
    }, [tutorial])

    return (
        <>
            <Link to="/account" className="color-1 f_11 fw_5 d-flex align-items-center d-lg-none mb-3 mb-sm-4">
                <MdOutlineArrowBack/> <span className="ms-2">Назад</span>
            </Link>
            <div className="acc-box">
                <h4>Как загрузить объявление и пользоваться сайтом</h4>
                <div className="row row-cols-sm-2 row-cols-md-3 g-4">
                    {tutorial? (
                        tutorial?.map(i =>
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
                                        <a href={i?.link} target="_blank" rel="noopener noreferrer">{i?.title}</a>
                                    ) : (
                                        <div className="mt-2">{i?.title}</div>
                                    )}
                                </div>
                            ) : (
                                <div key={i?.id} className="acc-video-block">
                                    <div className="acc-video">
                                        <video controls playsInline>
                                            <source src={checkPhotoPath(i?.media)}/>
                                        </video>
                                    </div>
                                    {i?.isTitleLink ? (
                                        <a href={i?.link} target="_blank" rel="noopener noreferrer">{i?.title}</a>
                                    ) : (
                                        <div className="mt-2">{i?.title}</div>
                                    )}
                                </div>
                            )
                        )
                    ) : (
                        <div className="p-2 w-100 d-flex justify-content-center">
                            <Loader color="#343434"/>
                        </div>
                    )}
                </div>
                <hr/>
                <h4>Партнёры</h4>
                <div className="row row-cols-sm-2 row-cols-md-3 g-4">
                    {partners ? (
                        partners?.map((i) =>
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
                                        <a href={i?.link} target="_blank" rel="noopener noreferrer">{i?.title}</a>
                                    ) : (
                                        <div className="mt-2">{i?.title}</div>
                                    )}
                                </div>
                            ) : (
                                <div key={i?.id}>
                                    <div className="acc-video">
                                        <img src={checkPhotoPath(i?.media)} height={100 + '%'} width={100 + '%'}/>
                                    </div>
                                    {i?.isTitleLink ? (
                                        <a href={i?.link} target="_blank" rel="noopener noreferrer">{i?.title}</a>
                                    ) : (
                                        <div className="mt-2">{i?.title}</div>
                                    )}
                                </div>
                            )
                        )
                    ) : (
                        <div className="p-2 w-100 d-flex justify-content-center">
                            <Loader color="#343434"/>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default Instructions
