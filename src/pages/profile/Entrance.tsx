import React, {FC, useEffect, useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {useForm} from 'react-hook-form'
import {login} from '../../services/auth'
import {useAppDispatch} from '../../hooks/store'
import {setUser} from '../../store/reducers/userSlice'
import {showAlert} from '../../store/reducers/alertSlice'
import ValidateWrapper from '../../components/utils/ValidateWrapper'
import checkProfileForMenu from "../../helpers/checkProfileForMenu";

const Entrance: FC = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const {
        register,
        formState: {errors},
        handleSubmit,
    } = useForm({mode: 'onSubmit', reValidateMode: 'onChange'})

    const onSubmit = (data: any) => {
        login(data)
            .then((res) => {
                dispatch(setUser(res?.user))
                localStorage.setItem('token', res?.token)
                if (res?.user && checkProfileForMenu(res?.user))
                    navigate(`/account/profile/${res?.user?.id}`)
                else
                    navigate(`/account/settings`)
            })
            .catch(() => {
                dispatch(
                    showAlert({
                        message: 'Произошла ошибка, проверьте введенные данные или попробуйте позже',
                        typeAlert: 'bad',
                    })
                )
            })
    }

    useEffect(() => {}, [])

    return (
        <main>
            <div className="container py-4 py-sm-5">
                <div className="row justify-content-center">
                    <div className="col-md-8 col-lg-6">
                        <form className="pt fw_4" onSubmit={handleSubmit(onSubmit)}>
                            <h1 className="f_50 mb-4 mb-sm-5">ВХОД</h1>
                            <ValidateWrapper error={errors.email}>
                                <input
                                    type="email"
                                    placeholder="E-mail"
                                    {...register('email', {
                                        required: 'Введите email',
                                    })}
                                />
                            </ValidateWrapper>
                            <ValidateWrapper error={errors.password}>
                                <input
                                    type="password"
                                    placeholder="Пароль"
                                    className="mt-3"
                                    {...register('password', {
                                        required: 'Введите пароль',
                                    })}
                                />
                            </ValidateWrapper>
                            <button className="btn_main btn_2 px-5 mx-auto mt-3 mt-sm-4">Войти</button>
                            <div className="mt-3">
                                Ещё нет аккаунта?{' '}
                                <Link to="/registration" className="link color-2">
                                    Регистрация
                                </Link>
                            </div>
                            <div className="mt-1">
                                <Link to="/password-reset" className="link color-1">
                                    Забыли пароль
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Entrance
