import React from 'react';
import { Link } from 'react-router-dom';
import { MdOutlineArrowBack, MdOutlineQuestionAnswer, MdReply, MdMoreHoriz } from "react-icons/md";

export default function ViewProfile() {
    return (
        <>
            <Link to="/account" className='color-1 f_11 fw_5 d-flex align-items-center d-lg-none mb-3 mb-sm-4'><MdOutlineArrowBack /> <span className='ms-2'>Назад</span></Link>
            <div class="acc-box">
                <div class="row">
                    <div class="col-md-4 mb-3 mb-sm-4 mb-md-0">
                        <h4 class="fw_7 text-center">Анна Петрова</h4>
                        <img src="/images/photo-replacer.jpg" alt="Анна Петрова" class="user-photo"/>
                        <div class="acc-box mt-3 mt-xl-4">
                            <button type='button' className='d-flex align-items-center blue fw_6'>
                                <MdOutlineQuestionAnswer className='f_17' />
                                <span className='ms-1 ms-sm-3 text-start'>Написать сообщение</span>
                            </button>
                            <hr className='my-3'/>
                            <button type='button' className='text-start color-1 f_09'>Добавить в бизнес-партнёры</button>
                            <hr className='my-3'/>
                            <button type='button' className='l-gray d-flex align-items-center'>
                                <MdReply className='f_17' />
                                <span className='f_09 text-start ms-3'>Поделиться</span>
                            </button>
                            <button type='button' className='l-gray mt-3'>
                                <MdMoreHoriz className='f_17' />
                                <span className='f_09 text-start ms-3'>Еще</span>
                            </button>
                        </div>
                    </div>
                    <div class="col-md-8">
                        <div className='acc-box'>
                            <div class="table-responsive">
                                <table class="table table-borderless acc-table mb-0">
                                    <tbody>
                                        <tr>
                                            <td class="l-gray">Дата рождения:</td>
                                            <td class="color-1">25 ноября 2020 г.</td>
                                        </tr>
                                        <tr>
                                            <td class="l-gray">Город:</td>
                                            <td class="color-1">Казань</td>
                                        </tr>
                                        <tr>
                                            <td class="l-gray">Место работы:</td>
                                            <td class="color-1">Предприниматель</td>
                                        </tr>
                                        <tr>
                                            <td class="l-gray">Хобби:</td>
                                            <td class="color-1">Бизнес</td>
                                        </tr>
                                        <tr>
                                            <td class="l-gray">Опыт в сферах:</td>
                                            <td class="color-1">Нет опыта</td>
                                        </tr>
                                        <tr>
                                            <td class="l-gray">Чем полезен ваш опыт:</td>
                                            <td class="color-1">Просто полезен</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        
                        <div class="acc-box mt-3 mt-m-4 mt-xl-5">
                            <div class="f_09 d-flex justify-content-between">
                                <div>Объявления <span class="l-gray">10</span></div>
                                <a href="/" class="color-1">Показать все</a>
                            </div>
                            <div className='row row-cols-3 g-1 g-sm-2 g-xl-4 text-center mt-1'>
                                <div>
                                    <div class="acc-box ads">
                                        <img src="/images/photo-replacer.jpg" alt="Франшиза" className='ads-img'/>
                                        <div class="fw_5 f_09 mt-2">Франшиза</div>
                                        <div class="gray f_09 mt-1">Образование</div>
                                    </div>
                                </div>
                                <div>
                                    <div class="acc-box ads">
                                        <img src="/images/photo-replacer.jpg" alt="Франшиза" className='ads-img'/>
                                        <div class="fw_5 f_09 mt-2">Франшиза</div>
                                        <div class="gray f_09 mt-1">Образование</div>
                                    </div>
                                </div>
                                <div>
                                    <div class="acc-box ads">
                                        <img src="/images/photo-replacer.jpg" alt="Франшиза" className='ads-img'/>
                                        <div class="fw_5 f_09 mt-2">Франшиза</div>
                                        <div class="gray f_09 mt-1">Образование</div>
                                    </div>
                                </div>
                                <div>
                                    <div class="acc-box ads">
                                        <img src="/images/photo-replacer.jpg" alt="Франшиза" className='ads-img'/>
                                        <div class="fw_5 f_09 mt-2">Франшиза</div>
                                        <div class="gray f_09 mt-1">Образование</div>
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