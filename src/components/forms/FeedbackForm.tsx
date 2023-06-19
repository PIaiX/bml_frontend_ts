import React, {FC, useEffect, useState} from 'react'
import {useForm} from 'react-hook-form'
import {IFeedBackForm} from '../../types/feedback'
import {sendFeedBack} from '../../services/feedback'
import ValidateWrapper from '../utils/ValidateWrapper'
import {showAlert} from "../../store/reducers/alertSlice";
import {useDispatch} from "react-redux";

const FeedbackForm: FC = () => {
    const [proPerData, setProPerData] = useState<boolean>(false)
    const dispatch = useDispatch()

    const {
        register,
        formState: {errors},
        handleSubmit,
        reset,
    } = useForm<IFeedBackForm>({
        mode: 'onSubmit',
        reValidateMode: 'onChange',
    })

    const onSubmit = (data: IFeedBackForm) => {
        sendFeedBack(data)
            .then(() => {
                dispatch(showAlert({message: 'Вопрос успешно отправлен!', typeAlert: 'good'}))
                setProPerData(false)
                reset()
            })
            .catch(() => {
                dispatch(showAlert({message: 'Произошла ошибка, попробуйте позже!', typeAlert: 'bad'}))
                setProPerData(false)
            })
    }

    return (
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="client-name" className="mb-1">
                Ваше имя
            </label>
            <ValidateWrapper error={errors.name}>
                <input
                    type="text"
                    id="client-name"
                    placeholder="имя"
                    className="mb-3"
                    {...register('name', {
                        required: 'Поле обязательно к заполнению',
                        minLength: {
                            value: 2,
                            message: 'Минимум 2 символа',
                        },
                        maxLength: {
                            value: 50,
                            message: 'Максимум 50 символов',
                        },
                    })}
                />
            </ValidateWrapper>
            <label htmlFor="email" className="mb-1">
                Ваша почта
            </label>
            <ValidateWrapper error={errors.email}>
                <input
                    type="email"
                    id="email"
                    placeholder="почта"
                    className="mb-3"
                    {...register('email', {
                        required: 'Поле обязательно к заполнению',
                        pattern: {
                            value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                            message: 'Некорректный email адрес',
                        },
                    })}
                />
            </ValidateWrapper>
            <label htmlFor="question" className="mb-1">
                Ваш вопрос
            </label>
            <ValidateWrapper error={errors.question}>
                <textarea
                    id="question"
                    rows={3}
                    placeholder="Ваш вопрос"
                    className="mb-3"
                    {...register('question', {
                        required: 'Поле обязательно к заполнению',
                        minLength: {
                            value: 5,
                            message: 'Минимум 5 символов',
                        },
                        maxLength: {
                            value: 255,
                            message: 'Максимум 255 символов',
                        },
                    })}
                />
            </ValidateWrapper>
            <label className="mt-2 mb-2">
                <input type="checkbox" id="yes-register" onClick={() => setProPerData(!proPerData)} />
                <span className="f_08 ms-2">
                    Я соглашаюсь с правилами сайта и даю согласие на{' '}
                    <a href="/politic.php" target="_blank" className="bb_1">
                        обработку персональных данных
                    </a>
                    .
                </span>
            </label>
            <button
                type="submit"
                className={`btn_main ${!proPerData ? 'btn_disabled' : 'btn_1'} mt-3`}
                disabled={!proPerData}
            >
                Отправить
            </button>
        </form>
    )
}

export default FeedbackForm
