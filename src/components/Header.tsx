import React, {FC, useEffect, useState} from 'react'
import {NavLink, Link} from 'react-router-dom'
import {MdStarOutline, MdOutlineShoppingCart, MdLogin, MdSearch, MdMenu, MdClose} from 'react-icons/md'
import {IconContext} from 'react-icons'
import {useAppSelector} from '../hooks/store'
import {IUser} from '../types/user'

const Header: FC = () => {
    const user: IUser | null = useAppSelector((state) => state?.user?.user)

    return (
        <>
            <header>
                <section className="top">
                    <div className="container h-100 d-flex justify-content-between align-items-center">
                        <Link to="/" className="logo">
                            <img src="/images/logo.svg" alt="Бизнес My Life" />
                        </Link>
                        <form action="" className="header_search d-none d-lg-flex">
                            <input type="search" placeholder="Поиск по сайту" />
                            <button type="submit" className="btn_main">
                                <MdSearch />
                            </button>
                        </form>
                        <NavLink
                            to="/contacts"
                            state={{fromHeader: true}}
                            className="d-none d-md-block color-2 bb_1 lh_1"
                        >
                            Обратная связь
                        </NavLink>
                        <a href="/" className="btn-icon">
                            <MdStarOutline />
                            <span className="count">3</span>
                        </a>
                        <a href="/" className="btn-icon">
                            <MdOutlineShoppingCart />
                            <span className="count">3</span>
                        </a>
                        {localStorage.getItem('token') ? (
                            <NavLink to={`/account/profile/${user?.id}`}>
                                <img src="/images/icons/profile.svg" />
                            </NavLink>
                        ) : (
                            <Link to="/enter" className="link d-flex align-items-center">
                                <span className="d-none d-sm-inline f_12 me-2">Войти</span>
                                <MdLogin className="f_15" />
                            </Link>
                        )}
                    </div>
                </section>
                <section className="bottom">
                    <div className="container h-100 d-flex align-items-center justify-content-between py-1 py-lg-0">
                        <nav id="main-menu" className="d-none d-lg-block">
                            <ul className="mt-3 mt-md-0 ml-auto mr-auto">
                                <li className="nav-item">
                                    <NavLink to="category/0" className="nav-link">
                                        Поиск инвестора
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to="category/1" className="nav-link">
                                        Предложения инвесторов
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to="category/2" className="nav-link">
                                        Поиск бизнес парнёров
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to="category/3" className="nav-link">
                                        Продажа бизнеса
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to="category/4" className="nav-link">
                                        Франшизы
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to="/news" className="nav-link">
                                        Новости
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to="/contacts" className="nav-link">
                                        Контакты
                                    </NavLink>
                                </li>
                            </ul>
                        </nav>
                        <button className="d-lg-none" type="button" data-bs-toggle="offcanvas" data-bs-target="#menu">
                            <IconContext.Provider value={{className: 'f_20 color-2'}}>
                                <MdMenu />
                            </IconContext.Provider>
                        </button>
                        <form action="" className="header_search d-flex d-lg-none">
                            <input type="search" placeholder="Поиск по сайту" className="py-2 px-2 px-sm-3" />
                            <button type="submit" className="btn_main">
                                <MdSearch />
                            </button>
                        </form>
                    </div>
                </section>
            </header>

            <div className="offcanvas offcanvas-start" tabIndex={-1} id="menu" data-scroll>
                <div className="offcanvas-body p-5">
                    <button type="button" className="btn-close" data-bs-dismiss="offcanvas">
                        <MdClose />
                    </button>
                    <nav>
                        <ul className="list-unstyled">
                            <li>
                                <NavLink to="category/1">Поиск инвестора</NavLink>
                            </li>
                            <li>
                                <NavLink to="category/2">Предложения инвесторов</NavLink>
                            </li>
                            <li>
                                <NavLink to="category/3">Поиск бизнес парнёров</NavLink>
                            </li>
                            <li>
                                <NavLink to="category/4">Продажа бизнеса</NavLink>
                            </li>
                            <li>
                                <NavLink to="category/5">Франшизы</NavLink>
                            </li>
                            <li>
                                <NavLink to="news">Новости</NavLink>
                            </li>
                            <li>
                                <NavLink to="contacts">Контакты</NavLink>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </>
    )
}

export default Header
