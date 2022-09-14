import React from 'react';
import { Link } from 'react-router-dom';
import { MdOutlineArrowBack } from "react-icons/md";
import CartItem from './CartItem';

export default function ShoppingCart() {
    return (
        <>
            <Link to="/account" className='color-1 f_11 fw_5 d-flex align-items-center d-lg-none mb-3 mb-sm-4'><MdOutlineArrowBack /> <span className='ms-2'>Назад</span></Link>
            <h4>Объявления:</h4>
            <div>
                <CartItem imgURL={"/images/photo-replacer.jpg"} variant={'1'} price={'12314125'} />
                <CartItem imgURL={"/images/photo-replacer.jpg"} variant={'0'} price={'100000'} />
                <CartItem imgURL={"/images/photo-replacer.jpg"} variant={'2'} price={'9836500000'} />
            </div>
            <div className='row row-cols-sm-2 gy-2 gx-sm-4 gx-xl-5 gy-sm-4 mt-1'>
                <div>
                    <div class="acc-box p-3 p-md-4">
                        <div className='d-sm-flex align-items-center justify-content-between'>
                            <div>Рекламный баннер</div>
                            <div className='text-sm-end color-1 mt-2 mt-sm-0 ms-sm-4'>Стоимость: <span className='fw_9'>12314125&nbsp;₽</span></div>
                        </div>
                        <button type='button' className='btn_main btn_2 f_09 mt-3'>Убрать</button>
                    </div>
                </div>
                <div>
                    <div class="acc-box p-3 p-md-4">
                        <div className='d-sm-flex align-items-center justify-content-between'>
                            <div>Рекламный баннер</div>
                            <div className='text-sm-end color-1 mt-2 mt-sm-0 ms-sm-4'>Стоимость: <span className='fw_9'>12314125&nbsp;₽</span></div>
                        </div>
                        <button type='button' className='btn_main btn_2 f_09 mt-3'>Убрать</button>
                    </div>
                </div>
            </div>
            <h4 className='mt-5'>Общая сумма:</h4>
            <div className='acc-box p-3 p-md-4 d-md-flex align-items-center'>
                <div className='f_11 fw_5 flex-1'>Текст теккст текст текттст тектсттктеткеткте</div>
                <div className='color-1 mt-3 mt-md-0 ms-md-4'>Стоимость: <span className='fw_9'>12314125&nbsp;₽</span></div>
                <button type='button' className='btn_main btn_1 f_09 mt-3 mt-md-0 ms-md-4'>Оплатить</button>
            </div>
            <h4 className='mt-5'>Добавить баннер:</h4>
            <div className='row row-cols-sm-2 gy-2 gx-sm-4 gx-xl-5 gy-sm-4'>
                <div>
                    <div class="acc-box p-3 p-md-4">
                        <div className='d-sm-flex align-items-center justify-content-between'>
                            <div>Рекламный баннер</div>
                            <div className='text-sm-end color-1 mt-2 mt-sm-0 ms-sm-4'>Стоимость: <span className='fw_9'>12314125&nbsp;₽</span></div>
                        </div>
                        <button type='button' className='btn_main btn_1 f_09 mt-3'>Добавить</button>
                    </div>
                </div>
                <div>
                    <div class="acc-box p-3 p-md-4">
                        <div className='d-sm-flex align-items-center justify-content-between'>
                            <div>Рекламный баннер</div>
                            <div className='text-sm-end color-1 mt-2 mt-sm-0 ms-sm-4'>Стоимость: <span className='fw_9'>12314125&nbsp;₽</span></div>
                        </div>
                        <button type='button' className='btn_main btn_1 f_09 mt-3'>Добавить</button>
                    </div>
                </div>
            </div>
        </>
    );
}