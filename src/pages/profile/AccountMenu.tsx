import React, {useState} from 'react';
import { NavLink } from 'react-router-dom';

export default function AccountMenu() {
    const [auth, setAuth] = useState(false);

    return (
        <nav className="acc-menu">
            {
                (auth)
                ? <ul className='list-unstyled mb-0'>
                    <li><NavLink to="profile">Профиль</NavLink></li>
                    <li><NavLink to="instructions">Как загрузить объявление</NavLink></li>
                    <li><NavLink to="my-ads">Мои объявления</NavLink></li>
                    <li><NavLink to="chat">Онлайн чат</NavLink></li>
                    <li><NavLink to="favorites">Избранные объявления</NavLink></li>
                    <li><NavLink to="wallet">Мой кошелек</NavLink></li>
                    <li><NavLink to="advertising-section">Рекламный раздел</NavLink></li>
                    <li><NavLink to="cart">Мои покупки</NavLink></li>
                    <li><NavLink to="settings">Настройки профиля</NavLink></li>
                    <li><button type='button'>Выйти из профиля</button></li>
                </ul>
                :<ul className='list-unstyled mb-0'>
                    <li><button type='button' className='active' onClick={()=>setAuth(true)}>Войти в личный кабинет</button></li>
                </ul>
            }
            
        </nav>
    );
}