import React, {FC} from 'react'
import {useForm} from 'react-hook-form'
import ValidateWrapper from '../utils/ValidateWrapper'
import {useAppDispatch, useAppSelector} from '../../hooks/store'
import {IUser} from '../../types/user'
import {updatePasswordUser} from '../../services/profileSettings'
import {showAlert} from '../../store/reducers/alertSlice'

export type Passwords = {
    oldPassword: string
    password: string
    passwordConfirm: string
}

const EditPasswordForm: FC = () => {
    const user: IUser | null = useAppSelector((state) => state?.user?.user)
    const dispatch = useAppDispatch()
    const {
        register,
        formState: {errors},
        handleSubmit,
        watch,
        reset,
    } = useForm<Passwords>({
        mode: 'onSubmit',
        reValidateMode: 'onChange',
        defaultValues: {
            oldPassword: '',
            password: '',
            passwordConfirm: '',
        },
    })

    const submitUpdatePassword = (data: Passwords) => {
        if (user) {
            updatePasswordUser(user?.id, data)
                .then(() => {
                    dispatch(showAlert({message: 'Пароль успешно изменен', typeAlert: 'good'}))
                    reset()
                })
                .catch(() => dispatch(showAlert({message: 'Произошла ошибка', typeAlert: 'bad'})))
        }
    }

    return (
        <form className="acc-box" noValidate onSubmit={handleSubmit(submitUpdatePassword)}>
            <div className="row">
                <div className="col-sm-8">
                    <h6>Старый пароль</h6>
                    <ValidateWrapper error={errors?.oldPassword}>
                        <input
                            type="password"
                            className="mt-2"
                            placeholder="Введите старый пароль"
                            {...register('oldPassword', {
                                required: 'Поле обязательно к заполнению',
                                pattern: {
                                    value: /(.*[0-9].*[A-Z])|(.*[A-Z].*[0-9])/gm,
                                    message: 'Отсутствует заглавная буква или цифра',
                                },
                                minLength: {
                                    value: 8,
                                    message: 'Минимальная длина 8 символов',
                                },
                            })}
                        />
                    </ValidateWrapper>
                    <h6 className="mt-3">Новый пароль</h6>
                    <ValidateWrapper error={errors?.password}>
                        <input
                            type="password"
                            className="mt-2"
                            placeholder="Придумайте новый пароль"
                            {...register('password', {
                                required: 'Поле обязательно к заполнению',
                                pattern: {
                                    value: /(.*[0-9].*[A-Z])|(.*[A-Z].*[0-9])/gm,
                                    message: 'Отсутствует заглавная буква или цифра',
                                },
                                minLength: {
                                    value: 8,
                                    message: 'Минимальная длина 8 символов',
                                },
                            })}
                        />
                    </ValidateWrapper>
                    <h6 className="mt-3">Повторите пароль</h6>
                    <ValidateWrapper error={errors?.passwordConfirm}>
                        <input
                            type="password"
                            className="mt-2"
                            placeholder="Повторите пароль"
                            {...register('passwordConfirm', {
                                required: 'Поле обязательно к заполнению',
                                validate: (value) => {
                                    if (watch('password') !== value) {
                                        return 'пароли не совпадают'
                                    }
                                },
                            })}
                        />
                    </ValidateWrapper>
                </div>
            </div>
            <button type="submit" className="btn_main btn_1 mt-3">
                Cохранить
            </button>
        </form>
    )
}

export default EditPasswordForm
