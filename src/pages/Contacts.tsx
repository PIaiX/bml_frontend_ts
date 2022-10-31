import React, {FC, useEffect, useRef} from 'react'
import Breadcrumbs from '../components/utils/Breadcrumbs'
import Partners from '../components/Partners'
import {useLocation} from 'react-router-dom'
import FeedbackForm from '../components/forms/FeedbackForm'

const Contacts: FC = () => {
    const loc: any = useLocation()

    const ref = useRef<HTMLHeadingElement>(null)

    useEffect(() => {
        if (loc?.state?.fromHeader && ref.current) {
            window.scrollTo(0, ref?.current?.offsetTop - 150)
        }
    }, [loc?.state?.fromHeader])

    return (
        <main>
            <div className="container pt-4">
                <Breadcrumbs />
            </div>

            <section className="container">
                <h1 className="inner">Контакты</h1>
                <div className="pt f_11">
                    <img src="/images/logo-black.svg" alt="Бизнес My Life" className="mb-4" />
                    <div className="fw_7 mb-2 mb-sm-3">Прием звонков:</div>
                    <div className="mb-4 mb-sm-5">Пн.-Пт.: 9:00 - 19:00 (по Москве)</div>
                    <div className="fw_7 mb-2 mb-sm-3">Реквизиты:</div>
                    <div className="mb-2">ИП. Найденов Р.А.</div>
                    <div className="mb-2">ОГРНИП 313502929500012</div>
                    <div className="mb-4 mb-sm-5">ИНН 890604287041</div>
                    <div className="mb-4 mb-sm-5">
                        Если у вас остались вопросы, напишите нам на{' '}
                        <span className="blue">
                            <a href="mailto:biznessmylife@mail.ru">biznessmylife@mail.ru</a>
                        </span>
                    </div>
                </div>
                <h2 ref={ref}>ФОРМА ОБРАТНОЙ СВЯЗИ</h2>
                <FeedbackForm />
            </section>

            <Partners />
        </main>
    )
}

export default Contacts
