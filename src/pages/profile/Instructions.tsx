import React from 'react';
import { Link } from 'react-router-dom';
import { MdOutlineArrowBack } from "react-icons/md";

export default function Instructions() {
    return (
        <>
        <Link to="/account" className='color-1 f_11 fw_5 d-flex align-items-center d-lg-none mb-3 mb-sm-4'><MdOutlineArrowBack /> <span className='ms-2'>Назад</span></Link>
        <div className='acc-box'>
            <h4>Как загрузить объявление и пользоваться сайтом</h4>
            <div className='row row-cols-sm-2 row-cols-md-3 g-4'>
                <div>
                    <div className='acc-video'>
                        <video controls>
                            <source
                                src="/bml/video/video.mp4"
                                type="video/mp4"
                            />
                        </video>
                    </div>
                    <div className='mt-2'>Название видео</div>
                </div>
                <div>
                    <div className='acc-video'>
                        <iframe
                            src="https://www.youtube.com/embed/BMNwrrFTO7A"
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        />
                    </div>
                    <div className='mt-2'>Название видео</div>
                </div>
                <div>
                    <div className='acc-video'>
                        <video controls>
                            <source src="/bml/video/video.mp4" type="video/mp4" />
                        </video>
                    </div>
                    <div className='mt-2'>Название видео</div>
                </div>
            </div>
            <hr />
            <h4>Партнёры</h4>
            <div className='row row-cols-sm-2 row-cols-md-3 g-4'>
                <div>
                    <div className='acc-video'>
                        <iframe
                            src="https://www.youtube.com/embed/BMNwrrFTO7A"
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        />
                    </div>
                    <div className='mt-2'>Название видео</div>
                </div>
                <div>
                    <div className='acc-video'>
                        <video controls>
                            <source src="/bml/video/video.mp4" type="video/mp4" />
                        </video>
                    </div>
                    <div className='mt-2'>Название видео</div>
                </div>
                <div>
                    <div className='acc-video'>
                        <video controls>
                            <source src="/bml/video/video.mp4" type="video/mp4" />
                        </video>
                    </div>
                    <div className='mt-2'>Название видео</div>
                </div>
                <div>
                    <div className='acc-video'>
                        <video controls>
                            <source src="/bml/video/video.mp4" type="video/mp4" />
                        </video>
                    </div>
                    <div className='mt-2'>Название видео</div>
                </div>
                <div>
                    <div className='acc-video'>
                        <video controls>
                            <source src="/bml/video/video.mp4" type="video/mp4" />
                        </video>
                    </div>
                    <div className='mt-2'>Название видео</div>
                </div>
                <div>
                    <div className='acc-video'>
                        <video controls>
                            <source src="/bml/video/video.mp4" type="video/mp4" />
                        </video>
                    </div>
                    <div className='mt-2'>Название видео</div>
                </div>
            </div>
        </div>
        </>
    );
}