import React, {FC, useEffect, useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {useForm} from 'react-hook-form'
import {getVerifyCode, resetPassword} from '../../services/auth'
import ValidateWrapper from '../../components/utils/ValidateWrapper'
import {IResetPassword} from '../../types/resetPassword'
import {useAppDispatch} from '../../hooks/store'
import {resetAlert, showAlert} from '../../store/reducers/alertSlice'

const ResetPassword: FC = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const [text, setText] = useState('Подтвердить почту')

    const {
        register,
        formState: {errors},
        handleSubmit,
        getValues,
    } = useForm<IResetPassword>({mode: 'onChange', reValidateMode: 'onChange'})

    useEffect(() => {
        if (text.includes('Проверьте почту')) {
            setTimeout(() => {
                setText('Отправить заново')
            }, 10000)
        }
        if (text.includes('Произошла ошибка')) {
            setTimeout(() => {
                setText('Отправить заново')
            }, 10000)
        }
    }, [text])

    const onSubmit = (data: IResetPassword) => {
        resetPassword(data)
            .then(() => {
                dispatch(showAlert({message: 'Пароль успешно изменён! Переход на вход.', typeAlert: 'good'}))
                setTimeout(() => {
                    navigate('/enter')
                    dispatch(resetAlert())
                }, 2000)
            })
            .catch(() => {
                dispatch(showAlert({message: 'Произошла ошибка!', typeAlert: 'bad'}))
                setTimeout(() => {
                    dispatch(resetAlert())
                }, 2000)
            })
    }

    const emailVerify = () => {
        getVerifyCode(getValues('email'))
            .then(() => {
                setText('Проверьте почту')
            })
            .catch(() => {
                setText('Произошла ошибка')
            })
    }

    const classReturner = () => {
        if (text.includes('Проверьте почту')) {
            return 'btn_disabled'
        } else if (text.includes('Произошла ошибка')) {
            return 'btn_disabled'
        } else {
            return 'btn_1'
        }
    }

    return (
        <main>
            <div className="container py-4 py-sm-5">
                <div className="row justify-content-center">
                    <div className="col-md-8 col-lg-6">
                        <form className="pt fw_4" onSubmit={handleSubmit(onSubmit)}>
                            <h1 className="mb-4 mb-sm-5">ВОССТАНОВЛЕНИЕ ПАРОЛЯ</h1>
                            <div className="confirm_email">
                                <ValidateWrapper error={errors?.email}>
                                    <input
                                        type="email"
                                        placeholder="Введите почту"
                                        {...register('email', {
                                            required: 'Поле обязательно для заполнения',
                                        })}
                                    />
                                </ValidateWrapper>
                                <button
                                    style={{width: 100 + '%'}}
                                    type="button"
                                    className={`btn_main ms-4 ${classReturner()}`}
                                    disabled={text.includes('Проверьте почту') || text.includes('Произошла ошибка')}
                                    onClick={() => {
                                        if (getValues('email')) {
                                            emailVerify()
                                        }
                                    }}
                                >
                                    {text}
                                </button>
                            </div>
                            <ValidateWrapper error={errors.verifyCode}>
                                <input
                                    type="text"
                                    className="mt-3"
                                    placeholder="Код с почты"
                                    {...register('verifyCode', {
                                        required: 'Поле обязательно к заполнению',
                                    })}
                                />
                            </ValidateWrapper>
                            <ValidateWrapper error={errors.password}>
                                <input
                                    type="password"
                                    className="mt-3"
                                    placeholder="Пароль"
                                    autoComplete="new-password"
                                    {...register('password', {
                                        required: 'Поле обязательно к заполнению',
                                        minLength: {
                                            value: 8,
                                            message: 'Минимум 8 символов',
                                        },
                                        maxLength: {
                                            value: 15,
                                            message: 'Максимум 15 символов',
                                        },
                                        pattern: {
                                            value: /(.*[0-9].*[A-Z])|(.*[A-Z].*[0-9])/gm,
                                            message: 'Отсутствует заглавная буква или цифра',
                                        },
                                    })}
                                />
                            </ValidateWrapper>
                            <ValidateWrapper error={errors.passwordConfirm}>
                                <input
                                    type="password"
                                    className="mt-3"
                                    placeholder="Повторите пароль"
                                    {...register('passwordConfirm', {
                                        validate: {
                                            pass: (value) => value === getValues('password') || 'Пароли не совпадают',
                                        },
                                        required: 'Поле обязательно к заполнению',
                                        minLength: {
                                            value: 8,
                                            message: 'Минимум 8 символов',
                                        },
                                        maxLength: {
                                            value: 15,
                                            message: 'Максимум 15 символов',
                                        },
                                    })}
                                />
                            </ValidateWrapper>
                            <button type="submit" className="btn_main btn_2 px-5 mx-auto mt-3 mt-sm-4">
                                Восстановить пароль
                            </button>
                            <div className="mt-3">
                                Ещё нет аккаунта?{' '}
                                <Link to="/registration" className="link color-2">
                                    Регистрация
                                </Link>
                            </div>
                            <div className="mt-1">
                                Вспомнили пароль?{' '}
                                <Link to="/enter" className="link color-1">
                                    Войти
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default ResetPassword
