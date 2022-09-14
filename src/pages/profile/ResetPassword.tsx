import React from 'react';
import { Link } from 'react-router-dom';

export default function ResetPassword() {
    return (
        <main>
            <div className='container py-4 py-sm-5'>
                <div className='row justify-content-center'>
                    <div className='col-md-8 col-lg-6'>
                        <form className='pt fw_4'>
                            <h1 className='mb-4 mb-sm-5'>ВОССТАНОВЛЕНИЕ ПАРОЛЯ</h1>
                            <input type='email' placeholder='Введите почту'/>
                            <button type='button' className='btn_main btn_2 px-5 mx-auto mt-3 mt-sm-4'>Восстановить пароль</button>
                            <div className='mt-3'>Ещё нет аккаунта? <Link to="/registration" className='link color-2'>Регистрация</Link></div>
                            <div className='mt-1'>Вспомнили пароль? <Link to='/enter' className='link color-1'>Войти</Link></div>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    );
}