import React from "react";
import { useRoutes, useLocation } from "react-router-dom";
import { useLayoutEffect } from "react";

import Home from '../pages/Home';
import Contacts from '../pages/Contacts';
import Service from '../pages/Service';
import AdvPage from '../pages/AdvPage';
import News from '../pages/News';
import NewsItem from '../components/NewsItem';
import Entrance from '../pages/profile/Entrance';
import Registration from '../pages/profile/Registration';
import ResetPassword from '../pages/profile/ResetPassword';
import PersonalAccount from '../pages/profile/PersonalAccount';
import Layout from '../components/Layout';
import NotFound from '../pages/NotFound';

export const routeList = [
  {
    path: '/',
    element: <Layout />,
    children: [
      {index: true, element: <Home/>, breadcrumb: 'Главная'},
      {path: 'contacts', element: <Contacts/>, breadcrumb: 'Контакты'},
      {path: 'category', element: <Service/>, breadcrumb: 'Услуга'},
      {path: 'category/:categoryId', element: <Service/>, breadcrumb: 'Услуга'},
      {path: 'adv-page', element: <AdvPage/>, breadcrumb: 'Объявление'},
      {path: 'news', element: <News/>, breadcrumb: 'Новости и статьи'},
      {path: 'news/:newsId', element: <NewsItem/>, breadcrumb: 'Новость'},
      {path: 'enter', element: <Entrance/>, breadcrumb: 'Вход'},
      {path: 'registration', element: <Registration/>, breadcrumb: 'Регистрация'},
      {path: 'password-reset', element: <ResetPassword/>, breadcrumb: 'Сброс пароля'},
      {path: 'account/*', element: <PersonalAccount/>, breadcrumb: 'Личный аккаунт'},
      {path: '*', element: <NotFound />},
    ],
  },
];

export default function AppRouter() {
  const Wrapper = ({ children }) => {
    const {pathname} = useLocation();
    useLayoutEffect(() => document.documentElement.scrollTo(0, 0), [pathname])
    return children
  }

  const element = useRoutes(routeList)

  return (
    <Wrapper>
        {element}
    </Wrapper>
  );
}
