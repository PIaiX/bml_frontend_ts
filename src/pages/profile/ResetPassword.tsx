import React, {FC} from 'react'
import {Link} from 'react-router-dom'
import {useForm} from 'react-hook-form'
import {resetPassword} from '../../services/auth'
import ValidateWrapper from '../../components/utils/ValidateWrapper'

type Data = {
    email: string
}

const ResetPassword: FC = () => {
    const {
        register,
        formState: {errors},
        handleSubmit,
    } = useForm<Data>({mode: 'onSubmit', reValidateMode: 'onChange'})

    const onSubmit = (data: any) => {
        resetPassword(data.email)
            .then((res) => console.log(res))
            .catch((error) => console.log(error))
    }

    return (
        <main>
            <div className="container py-4 py-sm-5">
                <div className="row justify-content-center">
                    <div className="col-md-8 col-lg-6">
                        <form className="pt fw_4" onSubmit={handleSubmit(onSubmit)}>
                            <h1 className="mb-4 mb-sm-5">ВОССТАНОВЛЕНИЕ ПАРОЛЯ</h1>
                            <ValidateWrapper error={errors?.email}>
                                <input
                                    type="email"
                                    placeholder="Введите почту"
                                    {...register('email', {
                                        required: 'Поле обязательно для заполнения',
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
