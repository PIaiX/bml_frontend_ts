import React, {Dispatch, FC, SetStateAction, useEffect, useState} from 'react'
import {IUser} from '../../types/user'
import {useAppDispatch, useAppSelector} from '../../hooks/store'
import {useForm} from 'react-hook-form'
import {convertLocaleDate} from '../../helpers/convertLocaleDate'
import {updateUserInfo} from '../../services/profileSettings'
import {showAlert} from '../../store/reducers/alertSlice'
import ValidateWrapper from '../utils/ValidateWrapper'
import {setUser} from '../../store/reducers/userSlice'
import CitiesForm from "./CitiesForm";
import {selectToEnd} from "../../helpers/selectToEndForPhoneInput";

type Props = {
    avatar: File
    setImageError: Dispatch<SetStateAction<string | undefined>>
}

type FormInfo = {
    companyName: string
    firstName: string
    lastName: string
    taxpayerIdentificationNumber: number | null
    mainStateRegistrationNumber: number | null
    email: string
    phone: string
    city: string
    isShowEmail: false
    isShowPhone: false
    type: 1
    avatar:string
}
const EditProfileFormForIe: FC<Props> = ({avatar, setImageError}) => {
    const user: IUser | null = useAppSelector((state) => state?.user?.user)
    const [city, setCity] = useState(user?.city)
    const [cityError, setCityError] = useState('')
    const dispatch = useAppDispatch()
    const {
        register,
        formState: {errors},
        handleSubmit,
        setValue,
        setError,
        clearErrors,
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
            email: '',
            phone: '',
            city: '',
            isShowEmail: false,
            isShowPhone: false,
            type: 1,
        },
    })
    useEffect(() => {
        if (user) {
            setValue('companyName', user?.companyName)
            setValue('firstName', user?.firstName)
            setValue('lastName', user?.lastName)
            setValue('taxpayerIdentificationNumber', user?.taxpayerIdentificationNumber)
            setValue('mainStateRegistrationNumber', user?.mainStateRegistrationNumber)
            setValue('email', user?.email)
            setValue('phone', user?.phone?user.phone:'')
        }
    }, [user])
    const submitUpdateUserInfo = (data: any) => {

        const formData = new FormData()
        console.log(data)

        for (const key in data) {
            formData.append(key, data[key])
        }
        if (city)
            formData.append('city', city)
        if(avatar)
            formData.append('avatar', avatar)
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
                        if (i?.field === 'mainStateRegistrationNumber') {
                            setError('mainStateRegistrationNumber', {type: 'custom', message: 'Значение уже занято'})
                        }
                        if (i?.field === 'taxpayerIdentificationNumber') {
                            setError('taxpayerIdentificationNumber', {type: 'custom', message: 'Значение уже занято'})
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

    return (
        <form className="acc-box" noValidate onSubmit={handleSubmit(beforeSubmit)}>
            <div className="row  align-items-center g-3">
                <div className="col-sm-4">
                    <h6>
                        Название ИП<span className="red">*</span>
                    </h6>
                </div>
                <div className="col-sm-8">
                    <ValidateWrapper error={errors?.companyName}>
                        <input
                            type="text"
                            placeholder="Название ИП"
                            {...register('companyName', {
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
                        ОГРНИП<span className="red">*</span>
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
                                    value: 11,
                                    message: 'Минимум 11 символ',
                                },
                                maxLength: {
                                    value: 16,
                                    message: 'Максимум символов 16',
                                }
                            })}
                        />
                    </ValidateWrapper>
                </div>
                <div className="col-sm-4">
                    <h6>ИНН<span className="red">*</span></h6>
                </div>
                <div className="col-sm-8">
                    <ValidateWrapper error={errors?.taxpayerIdentificationNumber}>
                        <input
                            type="text"
                            placeholder="ИНН"
                            {...register('taxpayerIdentificationNumber', {
                                required: 'поле обязательно к заполнению',
                                minLength: {
                                    value: 8,
                                    message: 'Минимум 8 символов',
                                },
                                maxLength: {
                                    value: 16,
                                    message: 'Максимум 16 символов',
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
                            onClick={(e)=>{
                                if(!getValues('phone') || getValues('phone').length===0)
                                    setValue('phone', '+7')
                                selectToEnd(e)
                            }}
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
            <button type="submit" className="btn_main btn_1 mt-4"
                    onClick={()=>{
                        if(!avatar && !user?.avatar){
                            setError('avatar', {message:'Поле обязательно к заполнению'})
                            setImageError('Поле обязательно к заполнению')
                            window.scrollTo(0, 0)
                        }
                        else{
                            clearErrors('avatar')
                            setImageError(undefined)
                        }
                    }}
            >
                Сохранить
            </button>
        </form>
    )
}

export default EditProfileFormForIe
