import React from 'react';
import { Link } from 'react-router-dom';
import { MdOutlineKeyboardArrowLeft, MdPhoneAndroid } from "react-icons/md";

export default function ChatWindow(props) {
    return (
        <div class="acc-box p-0 chat-window">
            <div class="top py-1 px-2 px-sm-4">
                <Link to="/account/chat" class="d-flex align-items-center l-gray">
                    <MdOutlineKeyboardArrowLeft className='f_15'/>
                    <span class="d-none d-md-block ms-2">Назад</span>
                </Link>
                <div class="text-center">
                    <div class="fw_5">Данил Сокуров</div>
                    <div class="d-none d-sm-block l-gray f_09 mt-1">
                        <span>был в сети 2 часа назад</span>
                        <MdPhoneAndroid />									
                    </div>
                </div>
                <Link to="/account/profile/view" class="user">
                    <img src="/images/photo.png" alt="Данил Сокуров"/>
                </Link>
            </div>
            <div class="middle p-2 p-sm-4">
                <div class="text-center l-gray my-4">15 марта</div>
                <div class="message">
                    <div class="d-flex align-items-center mb-1 mb-sm-3">
                        <Link to="/account/profile/view" class="user">
                            <img src="/images/photo.png" alt="Данил Сокуров"/>
                        </Link>
                        <span class="f_09 l-gray ms-3">16:00</span>
                    </div>
                    <div>
                        <p>Привет! Как дела?</p>
                    </div>
                </div>
                <div class="message">
                    <div class="d-flex align-items-center mb-1 mb-sm-3">
                        <Link to="/account/profile/view" class="user">
                            <img src="/images/photo.png" alt="Данил Сокуров"/>
                        </Link>
                        <span class="f_09 l-gray ms-3">16:00</span>
                    </div>
                    <div>
                        <p>Хотел уточнить, что там по тексту для презентации? </p>
                    </div>
                </div>
                <div class="reply">
                    <div class="d-flex align-items-center mb-1 mb-sm-3">
                        <div class="user">
                            <img src="/images/photo-replacer.jpg" alt="Саша Белокуров"/>
                        </div>
                        <span class="f_09 l-gray ms-3">16:54</span>
                    </div>
                    <div>
                        <p>Привет! Все отлично, как сам?</p>
                        <p>С другой стороны, консультация с широким активом позволяет выполнить важные задания по разработке направлений прогрессивного развития. Господа, высококачественный прототип будущего проекта однозначно определяет каждого участника как способного принимать собственные решения касаемо своевременного выполнения сверхзадачи.</p>
                    </div>
                </div>
                <div class="reply">
                    <div class="d-flex align-items-center mb-1 mb-sm-3">
                        <div class="user">
                            <img src="/images/photo-replacer.jpg" alt="Саша Белокуров"/>
                        </div>
                        <span class="f_09 l-gray ms-3">16:54</span>
                    </div>
                    <div>
                        <p>Как тебе текст?</p>
                    </div>
                </div>
                <div class="message">
                    <div class="d-flex align-items-center mb-1 mb-sm-3">
                        <Link to="/account/profile/view" class="user">
                            <img src="/images/photo.png" alt="Данил Сокуров"/>
                        </Link>
                        <span class="f_09 l-gray ms-3">16:00</span>
                    </div>
                    <div>
                        <p>Меня все устраивает. Спасибо!</p>
                    </div>
                </div>

                <div class="text-center l-gray my-4">17 марта</div>
                <div class="reply">
                    <div class="d-flex align-items-center mb-1 mb-sm-3">
                        <div class="user">
                            <img src="/images/photo-replacer.jpg" alt="Саша Белокуров"/>
                        </div>
                        <span class="f_09 l-gray ms-3">16:54</span>
                    </div>
                    <div>
                        <p>Привет! Ну как прошла презентация?</p>
                    </div>
                </div>
                <div class="message">
                    <div class="d-flex align-items-center mb-1 mb-sm-3">
                        <Link to="/account/profile/view" class="user">
                            <img src="/images/photo.png" alt="Данил Сокуров"/>
                        </Link>
                        <span class="f_09 l-gray ms-3">16:00</span>
                    </div>
                    <div>
                        <p>Привет! <br/> Все круто, спасибо за помощь.</p>
                    </div>
                </div>
                <div class="reply">
                    <div class="d-flex align-items-center mb-1 mb-sm-3">
                        <div class="user">
                            <img src="/images/photo-replacer.jpg" alt="Саша Белокуров"/>
                        </div>
                        <span class="f_09 l-gray ms-3">16:54</span>
                    </div>
                    <div>
                        <p>Всегда рад помочь!</p>
                        <p>Безусловно, синтетическое тестирование, в своём классическом представлении, допускает внедрение существующих финансовых и административных условий. Значимость этих проблем настолько очевидна, что постоянное информационно-пропагандистское обеспечение нашей деятельности в значительной степени обусловливает важность своевременного выполнения сверхзадачи.</p>
                    </div>
                </div>
            </div>
            <div class="bottom p-2 px-sm-4 py-sm-3">
                <form action="">
                    <textarea rows="6" placeholder="Напишите сообщение..."></textarea>
                    <button type="submit" class="btn_main btn_4 mt-3 ms-auto me-0">Отправить</button>
                </form>
            </div>
        </div>
    );
}