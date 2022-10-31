import React, {ChangeEvent, FC, useEffect, useState} from 'react'
import {onCheckboxHandler, onInputHandler, onSelectHandler} from '../../helpers/formHandlers'
import {Link} from 'react-router-dom'
import {useForm} from 'react-hook-form'
import ValidateWrapper from '../utils/ValidateWrapper'
import {IRegistrationForm} from '../../types/registration'
import {confirmEmail, registration} from '../../services/auth'
import {useDispatch} from 'react-redux'
import {setUser} from '../../store/reducers/userSlice'
import CustomModal from '../utils/CustomModal'
import {showAlert} from '../../store/reducers/alertSlice'
import Alert from '../utils/Alert'

const RegistrationForm: FC = () => {
    const [profileType, setProfileType] = useState<number | string>('start')
    const [confirmRadio, setConfirmRadio] = useState<boolean>(false)
    const [buttonText, setButtonText] = useState<string>('Подтвердить')
    const [errorsFromServ, setErrorsFromServ] = useState<any>({})
    const dispatch = useDispatch()

    const {
        register,
        formState: {errors},
        handleSubmit,
        reset,
        getValues,
    } = useForm<IRegistrationForm>({
        mode: 'onSubmit',
        reValidateMode: 'onChange',
    })

    useEffect(() => {
        if (buttonText.includes('Проверьте почту')) {
            setTimeout(() => {
                setButtonText('Отправить заново')
            }, 10000)
        }
        if (buttonText.includes('Значение уже занято')) {
            setTimeout(() => {
                setButtonText('Отправить заново')
            }, 10000)
        }
        if (buttonText.includes('Произошла ошибка')) {
            setTimeout(() => {
                setButtonText('Отправить заново')
            }, 10000)
        }
    }, [buttonText])

    useEffect(() => {
        if (errors && errorsFromServ?.email?.includes('Значение уже занято')) {
            setButtonText(errorsFromServ?.email)
        }
    }, [errors, errorsFromServ?.email])

    const onSubmit = (data: IRegistrationForm) => {
        registration(data, profileType)
            .then((res) => {
                localStorage.setItem('token', `${res?.token}`)
                dispatch(setUser(res?.user))
                dispatch(
                    showAlert({message: 'Вы успешно зарегистрировались, переход в ваш аккаунт...', typeAlert: 'good'})
                )
                reset()
            })
            .catch((error) => {
                dispatch(showAlert({message: 'Произошла ошибка, попробуйте позже.', typeAlert: 'bad'}))
            })
    }

    const onSubmitConfirmEmail = (email: string) => {
        confirmEmail(email)
            .then(() => {
                setButtonText('Проверьте почту')
            })
            .catch((error) => {
                setButtonText('Произошла ошибка')
                error &&
                    error.forEach((i: any) => {
                        setErrorsFromServ({[i.field]: i.message})
                    })
            })
    }

    return (
        <form className="pt fw_4" autoComplete="disabled" onSubmit={handleSubmit(onSubmit)}>
            <h1 className="f_50 mb-4 mb-sm-5">РЕГИСТРАЦИЯ</h1>
            <div className="row align-items-center">
                <div className="col-sm-4 mb-1 mb-sm-0">
                    <div>Тип профиля</div>
                </div>
                <div className="col-sm-8">
                    <select
                        name="profileType"
                        defaultValue={'start'}
                        onChange={(e) => {
                            setProfileType(+e.target.value)
                        }}
                    >
                        <option value={'start'} disabled>
                            Выберите тип профиля
                        </option>
                        <option value={0}>Физ лицо</option>
                        <option value={1}>ИП (Больше рекламных возможностей)</option>
                        <option value={2}>ООО (Больше рекламных возможностей)</option>
                    </select>
                </div>
            </div>
            {(profileType === 2 || profileType === 1) && (
                <ValidateWrapper error={errors.companyName}>
                    <input
                        type="text"
                        placeholder={profileType === 1 ? 'Введите название ИП' : 'Введите название компании'}
                        className="mt-3"
                        {...register('companyName', {
                            required: 'Поле обязательно к заполнению',
                            minLength: {
                                value: 5,
                                message: 'Минимум 5 символов',
                            },
                            maxLength: {
                                value: 15,
                                message: 'Максимум 15 символов',
                            },
                        })}
                    />
                </ValidateWrapper>
            )}

            {(profileType === 0 || profileType === 1 || profileType === 2) && (
                <>
                    <ValidateWrapper error={errors.firstName}>
                        <input
                            type="text"
                            className="mt-3"
                            placeholder={profileType === 1 ? 'Введите Имя' : 'Введите Имя ответственного лица'}
                            {...register('firstName', {
                                required: 'Поле обязательно к заполнению',
                                minLength: {
                                    value: 5,
                                    message: 'Минимум 5 символов',
                                },
                                maxLength: {
                                    value: 50,
                                    message: 'Максимум 50 символов',
                                },
                            })}
                        />
                    </ValidateWrapper>
                    <ValidateWrapper error={errors.lastName}>
                        <input
                            type="text"
                            className="mt-3"
                            placeholder={profileType === 1 ? 'Введите Фамилию' : 'Введите Фамилию ответственного лица'}
                            {...register('lastName', {
                                required: 'Поле обязательно к заполнению',
                                minLength: {
                                    value: 5,
                                    message: 'Минимум 5 символов',
                                },
                                maxLength: {
                                    value: 50,
                                    message: 'Максимум 50 символов',
                                },
                            })}
                        />
                    </ValidateWrapper>
                    <div className="confirm_email">
                        <ValidateWrapper error={errors.email}>
                            <input
                                type="email"
                                className="mt-3"
                                placeholder="Введите почту"
                                {...register('email', {
                                    required: 'Поле обязательно к заполнению',
                                    pattern: {
                                        value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                        message: 'Введен некорректный email',
                                    },
                                })}
                            />
                        </ValidateWrapper>
                        <button
                            style={{width: 100 + '%'}}
                            type="button"
                            className={`btn_main btn_1 ms-4 
                            ${buttonText.includes('Проверьте почту') && 'btn_disabled'} 
                            ${buttonText.includes('Значение уже занято') && 'btn_disabled'}
                            ${buttonText.includes('Произошла ошибка') && 'btn_disabled'}`}
                            disabled={
                                buttonText.includes('Проверьте почту') ||
                                buttonText.includes('Значение уже занято') ||
                                buttonText.includes('Произошла ошибка')
                            }
                            onClick={() => {
                                onSubmitConfirmEmail(getValues('email'))
                            }}
                        >
                            {buttonText}
                        </button>
                    </div>
                    <ValidateWrapper error={errors.verifyCode}>
                        <input
                            autoComplete="disabled"
                            className="mt-3"
                            placeholder="Код с почты"
                            {...register('verifyCode', {
                                required: 'Обязательное поле',
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
                                    value: /([A-Z])([0-9])/,
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
                </>
            )}
            <label className="color-1 mt-3 mt-sm-4">
                <input
                    name="offer"
                    type="checkbox"
                    defaultChecked={false}
                    onClick={() => setConfirmRadio(!confirmRadio)}
                />
                <span className="ms-3">
                    Я соглашаюсь с правилами сайта и даю согласие на обработку персональных данных.
                </span>
            </label>
            <div className="row flex-sm-row-reverse align-items-center mt-3 mt-sm-4">
                <div className="col-sm-8">
                    <button
                        type="submit"
                        disabled={!confirmRadio}
                        className={`btn_main px-5 mx-auto mx-sm-0 ${!confirmRadio ? 'btn_disabled' : 'btn_2'}`}
                    >
                        Регистрация
                    </button>
                </div>
                <div className="col-sm-4 mt-4 mt-sm-0">
                    <div>
                        Есть аккаунт?{' '}
                        <Link to="/enter" className="link color-1">
                            Войти
                        </Link>
                    </div>
                </div>
            </div>
        </form>
    )
}

export default RegistrationForm
