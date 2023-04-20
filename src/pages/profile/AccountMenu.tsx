import React, {useEffect, useState} from 'react'
import {NavLink, useNavigate} from 'react-router-dom'
import {logout} from '../../services/auth'
import {useAppDispatch, useAppSelector} from '../../hooks/store'
import {resetUser} from '../../store/reducers/userSlice'
import {IUser} from '../../types/user'

export default function AccountMenu() {
    const [auth, setAuth] = useState(false)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const {user}: { user: IUser | null } = useAppSelector((state) => state?.user)
    const notification = useAppSelector((state) => state?.notification)

    const onSubmitLogout = () => {
        logout()
            .then((res) => {
                if (res?.status === 200) {
                    localStorage.removeItem('token')
                    dispatch(resetUser())
                    navigate('/')
                }
            })
            .catch((error) => console.log(error))
            .finally(() => {
                localStorage.removeItem('token')
                dispatch(resetUser())
                navigate('/')
            })
    }

    useEffect(() => {
        if (localStorage.getItem('token')) {
            setAuth(true)
        }
    }, [])
    return (
        <nav className="acc-menu">
            {auth ? (
                <ul className="list-unstyled mb-0">
                    <li>
                        <NavLink to={`profile/${user?.id}`}>Профиль</NavLink>
                    </li>
                    <li>
                        <NavLink to="instructions">Как загрузить объявление</NavLink>
                    </li>
                    {user?.isFormCompleted && <>
                        <li>
                            <NavLink to="my-ads">Мои объявления</NavLink>
                        </li>
                        <li>
                            <NavLink to="favorites">Избранные объявления</NavLink>
                        </li>

                        <li>
                            <NavLink to="chat">
                                <div>
                                    <div className={"d-inline"}>
                                        Онлайн чат
                                    </div>
                                    {notification.unreadCount &&
                                        <div className="notificationAll d-inline mx-2">{notification.unreadCount}</div>}
                                </div>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="advertising-section">Рекламный раздел</NavLink>
                        </li>
                        <li>
                            <NavLink to="banners">Баннеры</NavLink>
                        </li>
                        <li>
                            <NavLink to="wallet">Мой кошелек</NavLink>
                        </li>
                        <li>
                            <NavLink to="pay-history">История покупок</NavLink>
                        </li>
                    </>}
                    <li>
                        <NavLink to="settings">Настройки профиля</NavLink>
                    </li>
                    <li>
                        <button type="button" onClick={() => onSubmitLogout()}>
                            Выйти из профиля
                        </button>
                    </li>
                </ul>
            ) : (
                <ul className="list-unstyled mb-0">
                    <li>
                        <NavLink to={'/enter'} className="active">
                            Войти в личный кабинет
                        </NavLink>
                    </li>
                </ul>
            )}
        </nav>
    )
}
