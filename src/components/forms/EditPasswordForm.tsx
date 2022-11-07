import React from 'react'
import {useForm} from 'react-hook-form'
import ValidateWrapper from '../utils/ValidateWrapper'

interface Props {
    onSubmit: (data: any) => void
}

const EditPasswordForm: React.FC<Props> = ({onSubmit}) => {
    const {
        register,
        formState: {errors},
        handleSubmit,
        watch,
    } = useForm({
        mode: 'onSubmit',
        reValidateMode: 'onSubmit',
        defaultValues: {
            oldPass: '',
            newPass: '',
            repeatNewPass: '',
        },
    })

    return (
        <form className="acc-box" noValidate onSubmit={handleSubmit(onSubmit)}>
            <div className="row">
                <div className="col-sm-8">
                    <h6>Старый пароль</h6>
                    <ValidateWrapper error={errors?.oldPass}>
                        <input
                            type="password"
                            className="mt-2"
                            placeholder="Введите старый пароль"
                            {...register('oldPass', {
                                required: 'поле обязательно к заполнению',
                            })}
                        />
                    </ValidateWrapper>
                    <h6 className="mt-3">Новый пароль</h6>
                    <ValidateWrapper error={errors?.newPass}>
                        <input
                            type="password"
                            className="mt-2"
                            placeholder="Придумайте новый пароль"
                            {...register('newPass', {
                                required: 'поле обязательно к заполнению',
                            })}
                        />
                    </ValidateWrapper>
                    <h6 className="mt-3">Повторите пароль</h6>
                    <ValidateWrapper error={errors?.repeatNewPass}>
                        <input
                            type="password"
                            className="mt-2"
                            placeholder="Повторите пароль"
                            {...register('repeatNewPass', {
                                required: 'поле обязательно к заполнению',
                                validate: (value) => {
                                    if (watch('newPass') !== value) {
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
