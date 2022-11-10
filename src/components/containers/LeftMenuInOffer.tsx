import React, {FC, ReactElement} from 'react'
import {Link} from 'react-scroll'

type Props = {
    category?: number
}

const LeftMenuInOfferContainer: FC<Props> = ({category}) => {
    if (category === 0) {
        return (
            <nav className="anchor-menu d-none d-md-block">
                <ul>
                    <li>
                        <Link
                            activeClass="active"
                            to="anchor_description"
                            spy={true}
                            smooth={true}
                            hashSpy={true}
                            offset={-130}
                            duration={300}
                            isDynamic={true}
                        >
                            Описание объявления
                        </Link>
                    </li>
                    <li>
                        <Link
                            activeClass="active"
                            to="anchor_terms_coop"
                            spy={true}
                            smooth={true}
                            hashSpy={true}
                            offset={-130}
                            duration={300}
                            isDynamic={true}
                        >
                            Условия сотрудничества
                        </Link>
                    </li>
                    <li>
                        <Link
                            activeClass="active"
                            to="anchor_business_plan"
                            spy={true}
                            smooth={true}
                            hashSpy={true}
                            offset={-130}
                            duration={300}
                            isDynamic={true}
                        >
                            Бизнес-план
                        </Link>
                    </li>
                    <li>
                        <Link
                            activeClass="active"
                            to="anchor_about_me"
                            spy={true}
                            smooth={true}
                            hashSpy={true}
                            offset={-130}
                            duration={300}
                            isDynamic={true}
                        >
                            О себе
                        </Link>
                    </li>
                    <li>
                        <Link
                            activeClass="active"
                            to="anchor_little_info"
                            spy={true}
                            smooth={true}
                            hashSpy={true}
                            offset={-130}
                            duration={300}
                            isDynamic={true}
                        >
                            Краткая информация
                        </Link>
                    </li>
                    <li>
                        <Link
                            activeClass="active"
                            to="anchor_photo"
                            spy={true}
                            smooth={true}
                            hashSpy={true}
                            offset={-130}
                            duration={300}
                            isDynamic={true}
                        >
                            Фотогалерея
                        </Link>
                    </li>
                    <li>
                        <Link
                            activeClass="active"
                            to="anchor_like"
                            spy={true}
                            smooth={true}
                            hashSpy={true}
                            offset={0}
                            duration={300}
                            isDynamic={true}
                        >
                            Похожие франшизы
                        </Link>
                    </li>
                </ul>
            </nav>
        )
    } else if (category === 1) {
        return (
            <nav className="anchor-menu d-none d-md-block">
                <ul>
                    <li>
                        <Link
                            activeClass="active"
                            to="anchor_description"
                            spy={true}
                            smooth={true}
                            hashSpy={true}
                            offset={-130}
                            duration={300}
                            isDynamic={true}
                        >
                            Описание объявления
                        </Link>
                    </li>
                    <li>
                        <Link
                            activeClass="active"
                            to="anchor_terms_coop"
                            spy={true}
                            smooth={true}
                            hashSpy={true}
                            offset={-130}
                            duration={300}
                            isDynamic={true}
                        >
                            Условия сотрудничества
                        </Link>
                    </li>
                    <li>
                        <Link
                            activeClass="active"
                            to="anchor_about_me"
                            spy={true}
                            smooth={true}
                            hashSpy={true}
                            offset={-130}
                            duration={300}
                            isDynamic={true}
                        >
                            О себе
                        </Link>
                    </li>
                    <li>
                        <Link
                            activeClass="active"
                            to="anchor_little_info"
                            spy={true}
                            smooth={true}
                            hashSpy={true}
                            offset={-130}
                            duration={300}
                            isDynamic={true}
                        >
                            Краткая информация
                        </Link>
                    </li>
                    <li>
                        <Link
                            activeClass="active"
                            to="anchor_photo"
                            spy={true}
                            smooth={true}
                            hashSpy={true}
                            offset={-130}
                            duration={300}
                            isDynamic={true}
                        >
                            Фотогалерея
                        </Link>
                    </li>
                    <li>
                        <Link
                            activeClass="active"
                            to="anchor_like"
                            spy={true}
                            smooth={true}
                            hashSpy={true}
                            offset={0}
                            duration={300}
                            isDynamic={true}
                        >
                            Похожие франшизы
                        </Link>
                    </li>
                </ul>
            </nav>
        )
    } else if (category === 2) {
        return (
            <nav className="anchor-menu d-none d-md-block">
                <ul>
                    <li>
                        <Link
                            activeClass="active"
                            to="anchor_description"
                            spy={true}
                            smooth={true}
                            hashSpy={true}
                            offset={-130}
                            duration={300}
                            isDynamic={true}
                        >
                            Описание объявления
                        </Link>
                    </li>
                    <li>
                        <Link
                            activeClass="active"
                            to="anchor_terms_coop"
                            spy={true}
                            smooth={true}
                            hashSpy={true}
                            offset={-130}
                            duration={300}
                            isDynamic={true}
                        >
                            Условия сотрудничества
                        </Link>
                    </li>
                    <li>
                        <Link
                            activeClass="active"
                            to="anchor_business_plan"
                            spy={true}
                            smooth={true}
                            hashSpy={true}
                            offset={-130}
                            duration={300}
                            isDynamic={true}
                        >
                            Бизнес-план
                        </Link>
                    </li>
                    <li>
                        <Link
                            activeClass="active"
                            to="anchor_about_me"
                            spy={true}
                            smooth={true}
                            hashSpy={true}
                            offset={-130}
                            duration={300}
                            isDynamic={true}
                        >
                            О себе
                        </Link>
                    </li>
                    <li>
                        <Link
                            activeClass="active"
                            to="anchor_little_info"
                            spy={true}
                            smooth={true}
                            hashSpy={true}
                            offset={-130}
                            duration={300}
                            isDynamic={true}
                        >
                            Краткая информация
                        </Link>
                    </li>
                    <li>
                        <Link
                            activeClass="active"
                            to="anchor_photo"
                            spy={true}
                            smooth={true}
                            hashSpy={true}
                            offset={-130}
                            duration={300}
                            isDynamic={true}
                        >
                            Фотогалерея
                        </Link>
                    </li>
                    <li>
                        <Link
                            activeClass="active"
                            to="anchor_like"
                            spy={true}
                            smooth={true}
                            hashSpy={true}
                            offset={0}
                            duration={300}
                            isDynamic={true}
                        >
                            Похожие франшизы
                        </Link>
                    </li>
                </ul>
            </nav>
        )
    } else if (category === 3) {
        return (
            <nav className="anchor-menu d-none d-md-block">
                <ul>
                    <li>
                        <Link
                            activeClass="active"
                            to="anchor_description"
                            spy={true}
                            smooth={true}
                            hashSpy={true}
                            offset={-130}
                            duration={300}
                            isDynamic={true}
                        >
                            Описание бизнеса
                        </Link>
                    </li>
                    <li>
                        <Link
                            activeClass="active"
                            to="anchor_terms_sale"
                            spy={true}
                            smooth={true}
                            hashSpy={true}
                            offset={-130}
                            duration={300}
                            isDynamic={true}
                        >
                            Условия продажи
                        </Link>
                    </li>
                    <li>
                        <Link
                            activeClass="active"
                            to="anchor_business_plan"
                            spy={true}
                            smooth={true}
                            hashSpy={true}
                            offset={-130}
                            duration={300}
                            isDynamic={true}
                        >
                            Бизнес-план
                        </Link>
                    </li>
                    <li>
                        <Link
                            activeClass="active"
                            to="anchor_little_info"
                            spy={true}
                            smooth={true}
                            hashSpy={true}
                            offset={-130}
                            duration={300}
                            isDynamic={true}
                        >
                            Краткая информация
                        </Link>
                    </li>
                    <li>
                        <Link
                            activeClass="active"
                            to="anchor_photo"
                            spy={true}
                            smooth={true}
                            hashSpy={true}
                            offset={-130}
                            duration={300}
                            isDynamic={true}
                        >
                            Фотогалерея
                        </Link>
                    </li>
                    <li>
                        <Link
                            activeClass="active"
                            to="anchor_like"
                            spy={true}
                            smooth={true}
                            hashSpy={true}
                            offset={0}
                            duration={300}
                            isDynamic={true}
                        >
                            Похожие франшизы
                        </Link>
                    </li>
                </ul>
            </nav>
        )
    } else if (category === 4) {
        return (
            <nav className="anchor-menu d-none d-md-block">
                <ul>
                    <li>
                        <Link
                            activeClass="active"
                            to="anchor_company_info"
                            spy={true}
                            smooth={true}
                            hashSpy={true}
                            offset={-130}
                            duration={300}
                            isDynamic={true}
                        >
                            Описание компании
                        </Link>
                    </li>
                    <li>
                        <Link
                            activeClass="active"
                            to="anchor_description"
                            spy={true}
                            smooth={true}
                            hashSpy={true}
                            offset={-130}
                            duration={300}
                            isDynamic={true}
                        >
                            Описание франшизы
                        </Link>
                    </li>
                    <li>
                        <Link
                            activeClass="active"
                            to="anchor_benefits"
                            spy={true}
                            smooth={true}
                            hashSpy={true}
                            offset={-130}
                            duration={300}
                            isDynamic={true}
                        >
                            Преимущества франшизы
                        </Link>
                    </li>
                    <li>
                        <Link
                            activeClass="active"
                            to="anchor_terms_coop"
                            spy={true}
                            smooth={true}
                            hashSpy={true}
                            offset={-130}
                            duration={300}
                            isDynamic={true}
                        >
                            Условия сотрудничества
                        </Link>
                    </li>
                    <li>
                        <Link
                            activeClass="active"
                            to="anchor_business_plan"
                            spy={true}
                            smooth={true}
                            hashSpy={true}
                            offset={-130}
                            duration={300}
                            isDynamic={true}
                        >
                            Бизнес-план
                        </Link>
                    </li>
                    <li>
                        <Link
                            activeClass="active"
                            to="anchor_little_info"
                            spy={true}
                            smooth={true}
                            hashSpy={true}
                            offset={-130}
                            duration={300}
                            isDynamic={true}
                        >
                            Краткая информация
                        </Link>
                    </li>
                    <li>
                        <Link
                            activeClass="active"
                            to="anchor_photo"
                            spy={true}
                            smooth={true}
                            hashSpy={true}
                            offset={-130}
                            duration={300}
                            isDynamic={true}
                        >
                            Фотогалерея
                        </Link>
                    </li>
                    <li>
                        <Link
                            activeClass="active"
                            to="anchor_like"
                            spy={true}
                            smooth={true}
                            hashSpy={true}
                            offset={-130}
                            duration={300}
                            isDynamic={true}
                        >
                            Похожие франшизы
                        </Link>
                    </li>
                </ul>
            </nav>
        )
    } else {
        return <></>
    }
}

export default LeftMenuInOfferContainer
