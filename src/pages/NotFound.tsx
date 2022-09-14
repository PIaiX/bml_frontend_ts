import React from 'react';
import {NavLink} from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="not-found">
            <h1 className="not-found__title">К сожалению, такой страницы не существует</h1>
            <NavLink className="not-found__link" to="/">Перейти на главную</NavLink>
        </div>
    );
};

export default NotFound;