import React from 'react';
import { Link } from 'react-router-dom';
import { MdAddCircle, MdOutlineArrowBack } from "react-icons/md";

export default function UserProfile() {
    return (
        <>
            <Link to="/account" className='color-1 f_11 fw_5 d-flex align-items-center d-lg-none mb-3 mb-sm-4'><MdOutlineArrowBack /> <span className='ms-2'>Назад</span></Link>
            <div className="acc-box">
                <div className="row">
                    <div className="col-md-4 mb-3 mb-sm-4 mb-md-0">
                        <h4 className="fw_7 text-center">Анна Петрова</h4>
                        <img src="/images/photo-replacer.jpg" alt="Анна Петрова" className="user-photo"/>
                        <div className="acc-box acc-friends mt-3 mt-xl-4">
                            <div className='d-flex d-md-block d-xl-flex align-items-center justify-content-between'>
                                <Link to="/account/profile/partners">
                                    <span>Бизнес-партнёры</span> 
                                    <span className="l-gray ms-2">0</span>
                                </Link>
                                <button type='button' className='blue mx-md-auto mx-xl-0 mt-md-2 mt-xl-0'>
                                    <MdAddCircle className='f_12'/>
                                    <span className='ms-1'>Добавить</span>
                                </button>
                            </div>
                            
                            <div className="row row-cols-3 g-3 mt-1">
                                <div>
                                    <img src="/images/photo-replacer.jpg" alt="Саша Петров"/>
                                    <div>Саша Петров</div>
                                </div>
                                <div>
                                    <img src="/images/photo-replacer.jpg" alt="Саша Петров"/>
                                    <div>Саша Петров</div>
                                </div>
                                <div>
                                    <img src="/images/photo-replacer.jpg" alt="Саша Петров"/>
                                    <div>Саша Петров</div>
                                </div>
                                <div>
                                    <img src="/images/photo-replacer.jpg" alt="Саша Петров"/>
                                    <div>Саша Петров</div>
                                </div>
                                <div>
                                    <img src="/images/photo-replacer.jpg" alt="Саша Петров"/>
                                    <div>Саша Петров</div>
                                </div>
                                <div>
                                    <img src="/images/photo-replacer.jpg" alt="Саша Петров"/>
                                    <div>Саша Петров</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-8">
                        <div className='acc-box'>
                            <Link to='/account/settings' className='d-block blue f_09 mb-2 mb-sm-4'>Редактировать информацию</Link>
                            <div className="table-responsive">
                                <table className="table table-borderless acc-table mb-0">
                                    <tbody>
                                        <tr>
                                            <td className="l-gray">Дата рождения:</td>
                                            <td className="color-1">25 ноября 2020 г.</td>
                                        </tr>
                                        <tr>
                                            <td className="l-gray">Город:</td>
                                            <td className="color-1">Казань</td>
                                        </tr>
                                        <tr>
                                            <td className="l-gray">Место работы:</td>
                                            <td className="color-1">Предприниматель</td>
                                        </tr>
                                        <tr>
                                            <td className="l-gray">Хобби:</td>
                                            <td className="color-1">Бизнес</td>
                                        </tr>
                                        <tr>
                                            <td className="l-gray">Опыт в сферах:</td>
                                            <td className="color-1">Нет опыта</td>
                                        </tr>
                                        <tr>
                                            <td className="l-gray">Чем полезен ваш опыт:</td>
                                            <td className="color-1">Просто полезен</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        
                        <div className="acc-box mt-3 mt-m-4 mt-xl-5">
                            <div className="f_09 d-flex justify-content-between">
                                <div>Объявления <span className="l-gray">10</span></div>
                                <a href="/" className="color-1">Показать все</a>
                            </div>
                            <div className='row row-cols-3 g-1 g-sm-2 g-xl-4 text-center mt-1'>
                                <div>
                                    <div className="acc-box ads">
                                        <img src="/images/photo-replacer.jpg" alt="Франшиза" className='ads-img'/>
                                        <div className="fw_5 f_09 mt-2">Франшиза</div>
                                        <div className="gray f_09 mt-1">Образование</div>
                                    </div>
                                </div>
                                <div>
                                    <div className="acc-box ads">
                                        <img src="/images/photo-replacer.jpg" alt="Франшиза" className='ads-img'/>
                                        <div className="fw_5 f_09 mt-2">Франшиза</div>
                                        <div className="gray f_09 mt-1">Образование</div>
                                    </div>
                                </div>
                                <div>
                                    <div className="acc-box ads">
                                        <img src="/images/photo-replacer.jpg" alt="Франшиза" className='ads-img'/>
                                        <div className="fw_5 f_09 mt-2">Франшиза</div>
                                        <div className="gray f_09 mt-1">Образование</div>
                                    </div>
                                </div>
                                <div>
                                    <div className="acc-box ads">
                                        <img src="/images/photo-replacer.jpg" alt="Франшиза" className='ads-img'/>
                                        <div className="fw_5 f_09 mt-2">Франшиза</div>
                                        <div className="gray f_09 mt-1">Образование</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}