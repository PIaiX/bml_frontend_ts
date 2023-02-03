import React from 'react'
import { createBrowserRouter, NavLink, RouterProvider, useLoaderData } from 'react-router-dom'
import Home from '../pages/Home'
import Contacts from '../pages/Contacts'
import Service from '../pages/Service'
import AdvPage from '../pages/AdvPage'
import News from '../pages/News'
import NewsItem from '../components/NewsItem'
import Entrance from '../pages/profile/Entrance'
import Registration from '../pages/profile/Registration'
import ResetPassword from '../pages/profile/ResetPassword'
import PersonalAccount from '../pages/profile/PersonalAccount'
import Layout from '../layouts/Layout'
import NotFound from '../pages/NotFound'
import { Link } from 'react-router-dom'
import PrivacyPolicy from '../pages/profile/PrivacyPolicy'
import Search from "../pages/Search";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        handle: { crumb: () => <Link to="/">Главная</Link> },
        children: [
            { index: true, element: <Home />, handle: { crumb: () => <Link to="/">Главная</Link> } },
            {
                path: 'contacts',
                element: <Contacts />,
                handle: { crumb: () => <span>Контакты</span> },
            },
            {
                path: 'category/:categoryId',
                element: <Service />,
                handle: { crumb: () => <span>Категории</span> },
            },
            {
                path: 'adv-page/:id',
                element: <AdvPage />,
                handle: { crumb: () => <span>Пост</span> },
            },
            {
                path: 'news',
                element: <News />,
                handle: { crumb: () => <span>Новости</span> },
            },
            {
                path: 'privacy',
                element: <PrivacyPolicy />,
                handle: { crumb: () => <span>Политика</span> },
            },
            {
                path: 'news/:slug',
                element: <NewsItem />,
                handle: { crumb: () => <span>Новость</span> },
            },
            {
                path: 'enter',
                element: <Entrance />,
                handle: { crumb: () => <span>Вход</span> },
            },
            {
                path: 'registration',
                element: <Registration />,
                handle: { crumb: () => <span>Регистрация</span> },
            },
            {
                path: 'password-reset',
                element: <ResetPassword />,
                handle: { crumb: () => <span>Сброс пароля</span> },
            },
            {
                path: 'account/*',
                element: <PersonalAccount />,
            },
            {
                path: 'search',
                element: <Search />,
            },
            { path: '*', element: <NotFound /> },
        ],
    },
])

const AppRouter = () => {
    return <RouterProvider router={router} />
}

export default AppRouter
