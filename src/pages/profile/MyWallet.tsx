import React from 'react';
import { Link } from 'react-router-dom';
import { MdOutlineArrowBack } from "react-icons/md";

function MyWallet() {
    return (
        <>
            <Link to="/account" className='color-1 f_11 fw_5 d-flex align-items-center d-lg-none mb-3 mb-sm-4'><MdOutlineArrowBack /> <span className='ms-2'>Назад</span></Link>
            <h4>Мой кошелёк:</h4>
            <div className="acc-box py-sm-5 d-flex flex-column justify-content-center align-items-center">
                <button type='button' className='btn_main btn_1'>Пополнить</button>
                <div className='f_11 fw_7 pt mt-3'>Баланс: 0 ₽</div>
                <form className='promo mt-3'>
                    <input type='text' />
                    <button type='button' className='btn_main btn_3 w-100 mt-2'>Ввести промокод</button>
                </form>
                <div className='l-gray text-center mt-3'>Для пополнения счета по безналичному расчету<br/> необходимо скачать и заполнить форму.<br/> После этого отправить нам на почту .....@.......<br/> наш менеджер с Вами свяжется. </div>
                <a href="/" className='btn_main btn_3 mt-4' download>Скачать форму</a>
            </div>
        </>
    );
}

export default MyWallet;