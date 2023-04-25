import React, {FC, useEffect, useState} from 'react'
import {useForm} from 'react-hook-form'
import ValidateWrapper from '../utils/ValidateWrapper'
import {IUser} from '../../types/user'
import {useAppDispatch, useAppSelector} from '../../hooks/store'
import {updateUserInfo} from '../../services/profileSettings'
import {convertLocaleDate} from '../../helpers/convertLocaleDate'
import {showAlert} from '../../store/reducers/alertSlice'
import {setUser} from '../../store/reducers/userSlice'
import CitiesForm from './CitiesForm'
import {selectToEnd} from "../../helpers/selectToEndForPhoneInput";

type Props = {
    avatar: File
}

type UserForm = {
    firstName: string
    lastName: string
    birthday: string
    email: string
    phone: string
    city: string
    isShowEmail: boolean
    isShowPhone: boolean
    type: number
}

const EditProfileForm: FC<Props> = ({avatar}) => {
    const user: IUser | null = useAppSelector((state) => state?.user?.user)
    const dispatch = useAppDispatch()
    const {
        register,
        formState: {errors},
        handleSubmit,
        setValue,
        watch,
        setError,
        getValues,
    } = useForm<UserForm>({
        mode: 'onSubmit',
        reValidateMode: 'onChange',
        defaultValues: {
            firstName: '',
            lastName: '',
            birthday: '',
            email: '',
            phone: '',
            city: '',
            isShowEmail: false,
            isShowPhone: false,
            type: 0,
        },
    })

    useEffect(() => {
        if (user) {
            setValue('firstName', user?.firstName)
            setValue('lastName', user?.lastName)
            setValue('phone', user?.phone?user.phone:'')
            setValue('email', user?.email)
            setValue('birthday', user?.birthday)
        }
    }, [user])

    const submitUpdateUserInfo = (data: any) => {
        let req
        const newDate = getValues('birthday') ? convertLocaleDate(getValues('birthday')) : ''

        if (user?.city !== city)
            req = {...data, birthday: newDate, avatar: avatar ? avatar : '', city: city}
        else req = {...data, birthday: newDate, avatar: avatar ? avatar : ''}

        const formData = new FormData()
        for (const key in req) {
            formData.append(key, req[key])
        }
        if (user) {
            updateUserInfo(user?.id, formData)
                .then((res) => {
                    dispatch(setUser(res))
                    dispatch(showAlert({message: 'Информация успешно изменена', typeAlert: 'good'}))
                })
                .catch((error) => {
                    error?.response?.data?.body?.errors?.forEach((i: any) => {
                        if (
                            i?.field === 'phone' &&
                            i?.message?.toLowerCase().includes('должно быть в формате телефона')
                        ) {
                            setError('phone', {type: 'custom', message: 'Должно быть в формате телефона'})
                        } else if (i?.field === 'phone' && i?.message?.toLowerCase().includes('значение уже занято')) {
                            setError('phone', {type: 'custom', message: 'Значение уже занято'})
                        }
                    })
                })
        }
    }
    const [city, setCity] = useState(user?.city)
    const [cityError, setCityError] = useState('')

    useEffect(() => {
        if (city === '') setCityError('поле обязательно к заполнению')
        else if(city && city.length<2)setCityError('поле должно содержать от 2 символов')
        else setCityError('')
    }, [city])

    const beforeSubmit = (data: any) => {
        if(city==null)setCity('')
        else if (cityError === '') submitUpdateUserInfo(data)
    }

    return (
        <form className="acc-box" noValidate onSubmit={handleSubmit(beforeSubmit)}>
            <div className="row  align-items-center g-3">
                <div className="col-sm-4">
                    <h6>
                        Фамилия<span className="red">*</span>
                    </h6>
                </div>
                <div className="col-sm-8">
                    <ValidateWrapper error={errors?.lastName}>
                        <input
                            type="text"
                            placeholder="Фамилия"
                            {...register('lastName', {
                                required: 'поле обязательно к заполнению',
                                maxLength: {
                                    value: 50,
                                    message: 'Максимум 50 символов',
                                },
                            })}
                        />
                    </ValidateWrapper>
                </div>
                <div className="col-sm-4">
                    <h6>
                        Имя<span className="red">*</span>
                    </h6>
                </div>
                <div className="col-sm-8">
                    <ValidateWrapper error={errors?.firstName}>
                        <input
                            type="text"
                            placeholder="Имя"
                            {...register('firstName', {
                                required: 'поле обязательно к заполнению',
                                maxLength: {
                                    value: 50,
                                    message: 'Максимум 50 символов',
                                },
                            })}
                        />
                    </ValidateWrapper>
                </div>
                <div className="col-sm-4">
                    <h6>Дата рождения</h6>
                </div>
                <div className="col-sm-8">
                    <ValidateWrapper error={errors?.birthday}>
                        <input type="date" min="1950-01-01" {...register('birthday')} />
                    </ValidateWrapper>
                </div>
                <div className="col-sm-4">
                    <h6>
                        Адрес электронной почты<span className="red">*</span>
                    </h6>
                    <div className="f_08 color-1">Не виден для других пользователей</div>
                </div>
                <div className="col-sm-8">
                    <ValidateWrapper error={errors?.email}>
                        <input
                            type="email"
                            placeholder="Введите почту"
                            {...register('email', {
                                required: 'поле обязательно к заполнению',
                                pattern: {
                                    value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                    message: 'укажите правильный формат электронной почты',
                                },
                            })}
                        />
                    </ValidateWrapper>
                </div>
                <div className="col-sm-4">
                    <h6>
                        Номер телефона<span className="red">*</span>
                    </h6>
                    <div className="f_08 color-1">Не виден для других пользователей</div>
                </div>
                <div className="col-sm-8">
                    <ValidateWrapper error={errors?.phone}>
                        <input
                            type="tel"
                            onClick={(e)=>{
                                if(!getValues('phone') || getValues('phone').length===0)
                                    setValue('phone', '+7')
                                selectToEnd(e)
                            }}
                            placeholder="+79000000000"
                            {...register('phone', {
                                required: 'поле обязательно к заполнению',
                                minLength: {
                                    value: 12,
                                    message: 'Минимум 12 символов',
                                },
                                onChange:(e)=>e.target.value.length<3 && setValue('phone', '+7'),
                                maxLength: {
                                    value: 12,
                                    message: 'Максимум 12 символов',
                                },
                                pattern: {
                                    value: /\+[7][0-9]{10}/,
                                    message: 'Не верный формат',
                                },
                            })}
                        />
                    </ValidateWrapper>
                </div>
                <div className="col-sm-4">
                    <h6>
                        Город<span className="red">*</span>
                    </h6>
                </div>
                <div className="col-sm-8">
                    <ValidateWrapper  forCity={true} error={{message: cityError}}>
                        <CitiesForm val={city} setVal={setCity} />
                    </ValidateWrapper>
                </div>
            </div>
            <button type="submit" className="btn_main btn_1 mt-4">
                Cохранить
            </button>
        </form>
    )
}

export default EditProfileForm
