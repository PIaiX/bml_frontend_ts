import React, {FC, useEffect} from 'react'
import {useForm} from 'react-hook-form'
import ValidateWrapper from '../utils/ValidateWrapper'
import {User} from '../../types'
import {IUser} from '../../types/user'
import {useAppDispatch, useAppSelector} from '../../hooks/store'
import {updateUserInfo} from '../../services/profileSettings'
import {getValue} from '@testing-library/user-event/dist/utils'
import {convertLocaleDate} from '../../helpers/convertLocaleDate'
import {showAlert} from '../../store/reducers/alertSlice'
import {setUser} from '../../store/reducers/userSlice'

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
    const cities: Array<string> = useAppSelector((state) => state?.cities?.cities)
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
            setValue('phone', user?.phone)
            setValue('email', user?.email)
            setValue('city', user?.city)
            setValue('birthday', user?.birthday)
        }
    }, [user])

    const submitUpadateUserInfo = (data: any) => {
        const newDate = getValues('birthday') ? convertLocaleDate(getValues('birthday')) : ''
        const req = {...data, birthday: newDate, avatar: avatar ? avatar : ''}
        const formData = new FormData()
        for (const key in req) {
            formData.append(key, req[key])
        }
        if (user) {
            updateUserInfo(user?.id, formData)
                .then((res) => {
                    dispatch(setUser(res))
                    dispatch(showAlert({message: '???????????????????? ?????????????? ????????????????', typeAlert: 'good'}))
                })
                .catch((error) => {
                    error?.response?.data?.body?.errors?.forEach((i: any) => {
                        if (
                            i?.field === 'phone' &&
                            i?.message?.toLowerCase().includes('???????????? ???????? ?? ?????????????? ????????????????')
                        ) {
                            setError('phone', {type: 'custom', message: '???????????? ???????? ?? ?????????????? ????????????????'})
                        } else if (i?.field === 'phone' && i?.message?.toLowerCase().includes('???????????????? ?????? ????????????')) {
                            setError('phone', {type: 'custom', message: '???????????????? ?????? ????????????'})
                        }
                    })
                })
        }
    }

    return (
        <form className="acc-box" noValidate onSubmit={handleSubmit(submitUpadateUserInfo)}>
            <div className="row  align-items-center g-3">
                <div className="col-sm-4">
                    <h6>
                        ??????????????<span className="red">*</span>
                    </h6>
                </div>
                <div className="col-sm-8">
                    <ValidateWrapper error={errors?.lastName}>
                        <input
                            type="text"
                            placeholder="??????????????"
                            {...register('lastName', {
                                required: '???????? ?????????????????????? ?? ????????????????????',
                                minLength: {
                                    value: 1,
                                    message: '???????????????????? ???????????? ?????????????? 1 ????????????',
                                },
                                maxLength: {
                                    value: 50,
                                    message: '???????????????????????? ???????????????????? ???????????????? - 50',
                                },
                            })}
                        />
                    </ValidateWrapper>
                </div>
                <div className="col-sm-4">
                    <h6>
                        ??????<span className="red">*</span>
                    </h6>
                </div>
                <div className="col-sm-8">
                    <ValidateWrapper error={errors?.firstName}>
                        <input
                            type="text"
                            placeholder="??????"
                            {...register('firstName', {
                                required: '???????? ?????????????????????? ?? ????????????????????',
                                minLength: {
                                    value: 1,
                                    message: '???????????????????? ???????????? ?????????????? 1 ????????????',
                                },
                                maxLength: {
                                    value: 50,
                                    message: '???????????????????????? ???????????????????? ???????????????? - 50',
                                },
                            })}
                        />
                    </ValidateWrapper>
                </div>
                <div className="col-sm-4">
                    <h6>???????? ????????????????</h6>
                </div>
                <div className="col-sm-8">
                    <ValidateWrapper error={errors?.birthday}>
                        <input type="date" min="1950-01-01" {...register('birthday')} />
                    </ValidateWrapper>
                </div>
                <div className="col-sm-4">
                    <h6>
                        ?????????? ?????????????????????? ??????????<span className="red">*</span>
                    </h6>
                    <div className="f_08 color-1">???? ???????????????????????? ?? ??????????????</div>
                </div>
                <div className="col-sm-8">
                    <ValidateWrapper error={errors?.email}>
                        <input
                            type="email"
                            placeholder="?????????????? ??????????"
                            {...register('email', {
                                required: '???????? ?????????????????????? ?? ????????????????????',
                                pattern: {
                                    value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                    message: '?????????????? ???????????????????? ???????????? ?????????????????????? ??????????',
                                },
                            })}
                        />
                    </ValidateWrapper>
                </div>
                <div className="col-sm-4">
                    <h6>
                        ?????????? ????????????????<span className="red">*</span>
                    </h6>
                    <div className="f_08 color-1">???? ???????????????????????? ?? ??????????????</div>
                </div>
                <div className="col-sm-8">
                    <ValidateWrapper error={errors?.phone}>
                        <input
                            type="tel"
                            placeholder="+79000000000"
                            {...register('phone', {
                                required: '???????? ?????????????????????? ?? ????????????????????',
                                minLength: {
                                    value: 12,
                                    message: '?????????????????????? ?????????? 12 ????????????????',
                                },
                                maxLength: {
                                    value: 12,
                                    message: '???????????????????????? ?????????? 12 ????????????????',
                                },
                                pattern: {
                                    value: /\+[7][0-9]{10}/,
                                    message: '???? ???????????? ????????????',
                                },
                            })}
                        />
                    </ValidateWrapper>
                </div>
                <div className="col-sm-4">
                    <h6>
                        ??????????<span className="red">*</span>
                    </h6>
                </div>
                <div className="col-sm-8">
                    <ValidateWrapper error={errors?.city}>
                        <select defaultValue={''} {...register('city', {required: '???????????????????????? ????????'})}>
                            <option value={''} disabled>
                                ??????????
                            </option>
                            {cities?.map((city, index) => (
                                <option key={index} value={city} selected={user?.city === city}>
                                    {city}
                                </option>
                            ))}
                        </select>
                    </ValidateWrapper>
                </div>
            </div>
            <button type="submit" className="btn_main btn_1 mt-4">
                C????????????????
            </button>
        </form>
    )
}

export default EditProfileForm
