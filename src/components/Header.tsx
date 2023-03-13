import React, { BaseSyntheticEvent, FC, useEffect, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { MdClose, MdLogin, MdMenu, MdSearch, MdStarOutline } from 'react-icons/md'
import { IconContext } from 'react-icons'
import { useAppDispatch, useAppSelector } from '../hooks/store'
import { IUser } from '../types/user'
import { setInitialCount } from '../store/reducers/favoriteCountSlice'
import FunctionForPrice from "../helpers/FunctionForPrice"
import { setSearch } from '../store/reducers/searchHeader'

const Header: FC = () => {
    const { user }: { user: IUser | null } = useAppSelector((state) => state?.user)
    const count = useAppSelector((state) => state?.favoritesCount?.count || 0)
    const inputSearch: string = useAppSelector((state) => state?.search.input)
    const dispatch = useAppDispatch()
    const navigate = useNavigate();
    const [srcForProfile, setSrcForProfile] = useState<string>('')
    const notification = useAppSelector((state) => state?.notification)


    useEffect(() => {
        if (user) {
            dispatch(setInitialCount(+user?.favoriteOffersCount))

            if (user?.isFormCompleted)
                setSrcForProfile(`/account/profile/${user?.id}`);
            else
                setSrcForProfile(`/account/settings`);
        }
    }, [user])


    const searchOnSite = (e: BaseSyntheticEvent) => {
        e.preventDefault()
        navigate("/search")
    }
    return (
        <>
            <header>
                <section className="top">
                    <div className="container h-100 d-flex justify-content-between align-items-center">
                        <Link to="/" className="logo">
                            <img src="/images/logo.svg" alt="Бизнес My Life" />
                        </Link>
                        <form action="" className="header_search d-none d-lg-flex">
                            <input value={inputSearch} type="search" placeholder="Поиск по сайту" onChange={(e) => { dispatch(setSearch(e.target.value)) }
                            } />
                            <button type="submit" className="btn_main" onClick={(e) => searchOnSite(e)}>
                                <MdSearch />
                            </button>
                        </form>
                        {user && <NavLink
                            to="/account/wallet"
                            state={{ fromHeader: true }}
                            className="d-none d-md-block"
                        >
                            Баланс: {FunctionForPrice(user?.balance) || 0} руб
                        </NavLink>}

                        <NavLink to={user ? '/account/favorites' : '/enter'}
                            className={user ?
                                "btn-icon d-none d-md-block" :
                                "btn-icon2 d-none d-md-block"
                            }
                        >

                            <MdStarOutline />
                            {user && <span className="count notificationAll">{count}</span>}
                        </NavLink>

                        {user?.id ? (
                            <NavLink to={srcForProfile} className={"d-none d-md-block"}>
                                {window.innerWidth <= 400 ? (
                                    <img src="/images/icons/profile.svg" />
                                ) : (
                                    <div>
                                        <span>{user?.fullName}</span>
                                        {notification.unreadCount && <span className="notification  notificationAll">{notification.unreadCount}</span>}
                                    </div>
                                )}
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
                                        Поиск инвесторов
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to="category/1" className="nav-link">
                                        Предложения инвесторов
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to="category/2" className="nav-link">
                                        Поиск бизнес партнёров
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
                                    <div className="dropdown">
                                        <button className="dropbtn nav-link">
                                            {'Информация '}
                                            <svg
                                                width="11"
                                                height="6"
                                                viewBox="0 0 11 6"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M0.607422 0.329102L5.60742 5.3291L10.6074 0.329102H0.607422Z"
                                                    fill="#1F1F21"
                                                />
                                            </svg>
                                        </button>
                                        <div className="dropdown-content">
                                            <NavLink to="news" className="nav-link">
                                                Новости
                                            </NavLink>
                                            <NavLink to="contacts" className="nav-link">
                                                Контакты
                                            </NavLink>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </nav>
                        <button className="d-lg-none" type="button" data-bs-toggle="offcanvas" data-bs-target="#menu">
                            <IconContext.Provider value={{ className: 'f_20 color-2' }}>
                                <MdMenu />
                            </IconContext.Provider>
                        </button>
                    </div>
                </section>
            </header>

            <div className="offcanvas offcanvas-start" tabIndex={-1} id="menu" data-scroll>
                <div className="offcanvas-body p-5">
                    <button type="button" className="btn-close" data-bs-dismiss="offcanvas">
                        <MdClose />
                    </button>
                    <nav>
                        <ul className="list-unstyled" data-bs-dismiss="offcanvas">
                            <li>
                                <NavLink to="category/0">Поиск инвестоов</NavLink>
                            </li>
                            <li>
                                <NavLink to="category/1">Предложения инвесторов</NavLink>
                            </li>
                            <li>
                                <NavLink to="category/2">Поиск бизнес партнёров</NavLink>
                            </li>
                            <li>
                                <NavLink to="category/3">Продажа бизнеса</NavLink>
                            </li>
                            <li>
                                <NavLink to="category/4">Франшизы</NavLink>
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
