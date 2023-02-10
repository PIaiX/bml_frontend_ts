import React, {FC, useEffect, useState} from 'react'
import { IUser } from '../../types/user'
import { useAppDispatch, useAppSelector } from '../../hooks/store'
import { useForm } from 'react-hook-form'
import { updateUserInfo } from '../../services/profileSettings'
import { showAlert } from '../../store/reducers/alertSlice'
import ValidateWrapper from '../utils/ValidateWrapper'
import { setUser } from '../../store/reducers/userSlice'
import CitiesForm from "./CitiesForm";

type Props = {
    avatar: File
}

type FormInfo = {
    companyName: string
    firstName: string
    lastName: string
    taxpayerIdentificationNumber: number | null
    mainStateRegistrationNumber: number | null
    legalAddress: string
    email: string
    phone: string
    city: string
    isShowEmail: false
    isShowPhone: false
    type: number
}

const EditProfileFormForOoo: FC<Props> = ({ avatar }) => {
    const user: IUser | null = useAppSelector((state) => state?.user?.user)
    const [city, setCity] = useState(user?.city)
    const [cityError, setCityError] = useState('')

    const dispatch = useAppDispatch()
    const {
        register,
        formState: { errors },
        handleSubmit,
        setValue,
        setError,
        getValues,
    } = useForm<FormInfo>({
        mode: 'onSubmit',
        reValidateMode: 'onChange',
        defaultValues: {
            companyName: '',
            firstName: '',
            lastName: '',
            taxpayerIdentificationNumber: null,
            mainStateRegistrationNumber: null,
            legalAddress: '',
            email: '',
            phone: '',
            city: '',
            isShowEmail: false,
            isShowPhone: false,
            type: 2,
        },
    })

    useEffect(() => {
        if (user) {
            setValue('companyName', user?.companyName)
            setValue('firstName', user?.firstName)
            setValue('lastName', user?.lastName)
            setValue('taxpayerIdentificationNumber', user?.taxpayerIdentificationNumber)
            setValue('mainStateRegistrationNumber', user?.mainStateRegistrationNumber)
            setValue('legalAddress', user?.legalAddress)
            setValue('phone', user?.phone)
            setValue('email', user?.email)
        }
    }, [user])

    const submitUpdateUserInfo = (data: any) => {
        let req

        if (user?.city !== city) {
            req = { ...data, avatar: avatar ? avatar : '', city: city}
        } else req = { ...data, avatar: avatar ? avatar : ''}


        const formData = new FormData()
        for (const key in req) {
            formData.append(key, req[key])
        }
        if (user) {
            updateUserInfo(user?.id, formData)
                .then((res) => {
                    dispatch(setUser(res))
                    dispatch(showAlert({ message: 'Информация успешно изменена', typeAlert: 'good' }))
                })
                .catch((error) => {
                    error?.response?.data?.body?.errors?.forEach((i: any) => {
                        if (
                            i?.field === 'phone' &&
                            i?.message?.toLowerCase().includes('должно быть в формате телефона')
                        ) {
                            setError('phone', { type: 'custom', message: 'Должно быть в формате телефона' })
                        } else if (i?.field === 'phone' && i?.message?.toLowerCase().includes('значение уже занято')) {
                            setError('phone', { type: 'custom', message: 'Значение уже занято' })
                        }
                        if (i?.field === 'mainStateRegistrationNumber') {
                            setError('mainStateRegistrationNumber', { type: 'custom', message: 'Значение уже занято' })
                        }
                        if (i?.field === 'taxpayerIdentificationNumber') {
                            setError('taxpayerIdentificationNumber', { type: 'custom', message: 'Значение уже занято' })
                        }
                    })
                })
        }
    }

    useEffect(() => {
        if (city === '') setCityError('поле обязательно к заполнению')
        else if(city && city.length<2)setCityError('поле должно содержать от 2 символов')
        else setCityError('')
    }, [city])

    const beforeSubmit = (data: any) => {
        if(city==null)setCity('')
        else if (cityError === '') submitUpdateUserInfo(data)

    }

    const [phone, setPhone]=useState('');

    return (
        <form className="acc-box" noValidate onSubmit={handleSubmit(beforeSubmit)}>
            <div className="row  align-items-center g-3">
                <div className="col-sm-4">
                    <h6>
                        Название ООО<span className="red">*</span>
                    </h6>
                </div>
                <div className="col-sm-8">
                    <ValidateWrapper error={errors?.companyName}>
                        <input
                            type="text"
                            placeholder="Название ООО"
                            {...register('companyName', {
                                required: 'поле обязательно к заполнению',
                                minLength: {
                                    value: 1,
                                    message: 'необходимо ввести минимум 1 символ',
                                },
                                maxLength: {
                                    value: 50,
                                    message: 'максимальное количество символов - 50',
                                },
                            })}
                        />
                    </ValidateWrapper>
                </div>
                <div className="col-sm-4">
                    <h6>
                        Имя ответственного лица<span className="red">*</span>
                    </h6>
                </div>
                <div className="col-sm-8">
                    <ValidateWrapper error={errors?.firstName}>
                        <input
                            type="text"
                            placeholder="Имя ответственного лица"
                            {...register('firstName', {
                                required: 'поле обязательно к заполнению',
                                minLength: {
                                    value: 1,
                                    message: 'необходимо ввести минимум 1 символ',
                                },
                                maxLength: {
                                    value: 50,
                                    message: 'максимальное количество символов - 50',
                                },
                            })}
                        />
                    </ValidateWrapper>
                </div>
                <div className="col-sm-4">
                    <h6>
                        Фамилия ответственного лица<span className="red">*</span>
                    </h6>
                </div>
                <div className="col-sm-8">
                    <ValidateWrapper error={errors?.lastName}>
                        <input
                            type="text"
                            placeholder="Фамилия ответственного лица"
                            {...register('lastName', {
                                required: 'поле обязательно к заполнению',
                                minLength: {
                                    value: 1,
                                    message: 'необходимо ввести минимум 1 символ',
                                },
                                maxLength: {
                                    value: 50,
                                    message: 'максимальное количество символов - 50',
                                },
                            })}
                        />
                    </ValidateWrapper>
                </div>
                <div className="col-sm-4">
                    <h6>
                        ОГРН<span className="red">*</span>
                    </h6>
                </div>
                <div className="col-sm-8">
                    <ValidateWrapper error={errors?.mainStateRegistrationNumber}>
                        <input
                            type="text"
                            placeholder="ОГРНИП"
                            {...register('mainStateRegistrationNumber', {
                                required: 'поле обязательно к заполнению',
                                minLength: {
                                    value: 13,
                                    message: 'Необходимо ввести минимум 13 символ',
                                },
                                maxLength: {
                                    value: 13,
                                    message: 'Максимальное количество символов 13',
                                },
                            })}
                        />
                    </ValidateWrapper>
                </div>
                <div className="col-sm-4">
                    <h6>ИНН</h6>
                </div>
                <div className="col-sm-8">
                    <ValidateWrapper error={errors?.taxpayerIdentificationNumber}>
                        <input
                            type="text"
                            placeholder="ИНН"
                            {...register('taxpayerIdentificationNumber', {
                                minLength: {
                                    value: 10,
                                    message: 'Минимум 10 символов',
                                },
                                maxLength: {
                                    value: 12,
                                    message: 'Максимальное количество символов 12',
                                },
                            })}
                        />
                    </ValidateWrapper>
                </div>
                <div className="col-sm-4">
                    <h6>Юридический адрес</h6>
                </div>
                <div className="col-sm-8">
                    <ValidateWrapper error={errors?.legalAddress}>
                        <input
                            type="text"
                            placeholder="Юридический адрес"
                            {...register('legalAddress', {
                                minLength: {
                                    value: 10,
                                    message: 'Минимум 10 символов',
                                },
                                maxLength: {
                                    value: 50,
                                    message: 'Максимальное количество символов 50',
                                },
                            })}
                        />
                    </ValidateWrapper>
                </div>
                <div className="col-sm-4">
                    <h6>
                        Адрес электронной почты<span className="red">*</span>
                    </h6>
                    <div className="f_08 color-1">Не показывается в профиле</div>
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
                    <div className="f_08 color-1">Не показывается в профиле</div>
                </div>
                <div className="col-sm-8">
                    <ValidateWrapper error={errors?.phone}>
                        <input
                            type="tel"
                            placeholder="+79000000000"
                            onFocus={()=>{setPhone('+7')}}
                            {...register('phone', {
                                required: 'поле обязательно к заполнению',
                                minLength: {
                                    value: 12,
                                    message: 'Минимальная длина 12 символов',
                                },
                                maxLength: {
                                    value: 12,
                                    message: 'Максимальная длина 12 символов',
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
                    <ValidateWrapper error={errors?.city}>
                        <ValidateWrapper error={{message: cityError}}>
                            <CitiesForm val={city} setVal={setCity} />
                        </ValidateWrapper>
                    </ValidateWrapper>
                </div>
            </div>
            <button type="submit" className="btn_main btn_1 mt-4">
                Cохранить
            </button>
        </form>
    )
}

export default EditProfileFormForOoo
