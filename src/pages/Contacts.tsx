import React, {useEffect} from 'react';
import Breadcrumbs from '../components/utils/Breadcrumbs';
import Partners from '../components/Partners';
import {useLocation} from "react-router-dom";

const Contacts = () => {

    const loc: any = useLocation()

    useEffect(() => {
        loc?.state?.fromHeader && window.scroll(0, 550)
    }, [])

    return (
        <main>
        <div className="container pt-4">
            <Breadcrumbs />
        </div>

        <section className="container">
            <h1 className="inner">Контакты</h1>
            <div className="pt f_11">
                <img src="/images/logo-black.svg" alt="Бизнес My Life" className='mb-4'/>
                <div className="fw_7 mb-2 mb-sm-3">Прием звонков:</div>
                <div className="mb-4 mb-sm-5">Пн.-Пт.: 9:00 - 19:00 (по Москве)</div>
                <div className="fw_7 mb-2 mb-sm-3">Реквизиты:</div>
                <div className="mb-2">ИП. Найденов Р.А.</div>
                <div className="mb-2">ОГРНИП 313502929500012</div>
                <div className="mb-4 mb-sm-5">ИНН 890604287041</div>
                <div className="mb-4 mb-sm-5">Если у вас остались вопросы, напишите нам на <span className='blue'><a href="mailto:biznessmylife@mail.ru">biznessmylife@mail.ru</a></span></div>
            </div>
            <h2>ФОРМА ОБРАТНОЙ СВЯЗИ</h2>
            <form>
                <label htmlFor="client-name" className="mb-1">Ваше имя</label>
                <input type="text" id="client-name" placeholder="имя" className="mb-3"/>
                <label htmlFor="email" className="mb-1">Ваша почта</label>
                <input type="email" id="email" placeholder="почта" className="mb-3"/>
                <label htmlFor="question" className="mb-1">Ваш вопрос</label>
                <textarea id="question" rows={3} placeholder="Ваш вопрос" className="mb-3"/>
                <label className="mt-2 mb-2">
                    <input type="checkbox" id="yes-register" required={true}/>
                    <span className='f_08 ms-2'>Я соглашаюсь с правилами сайта и даю согласие на <a href="/politic.php" target="_blank" className="bb_1">обработку персональных данных</a>.</span>
                </label>
                <button type="submit" className="btn_main btn_1 mt-3">Отправить</button>
            </form>
        </section>

        <Partners />
    </main>
    );
}

export default Contacts