import React, {useEffect, useRef, useState} from 'react'
import {onImageHandler} from '../../helpers/formHandlers'
import {Link, useNavigate, useParams} from 'react-router-dom'
import {MdOutlineArrowBack} from 'react-icons/md'
import {useImageViewer} from '../../hooks/imageViewer'
import {useImagesViewer} from '../../hooks/imagesViewer'
import CustomModal from '../../components/utils/CustomModal'
import {getCity} from '../../services/city'
import {
    createOffer,
    deleteImageOffer,
    getAllAreas,
    getAllSubsections,
    getOneOffer,
    setPremiumSlot,
    updateOffer,
} from '../../services/offers'
import {IOfferForm, IOfferItem, IOffersAreaItem, IOffersSubSectionsItem} from '../../types/offers'
import {useAppDispatch, useAppSelector} from '../../hooks/store'
import {IUser} from '../../types/user'
import ValidateWrapper from '../../components/utils/ValidateWrapper'
import {useForm, Controller} from 'react-hook-form'
import {convertLocaleDate} from '../../helpers/convertLocaleDate'
import {showAlert} from '../../store/reducers/alertSlice'
import {IUseStateItem} from '../../types'
import {checkPhotoPath} from '../../helpers/photoLoader'
import {FromStringToNumber} from '../../helpers/FromStringToNumber'
import FunctionForPrice from '../../helpers/FunctionForPrice'
import CitiesForm from '../../components/forms/CitiesForm'
import Premium from "./Premium";
import {setBalance} from "../../store/reducers/userSlice";
import {GetPromo} from "../../services/Promo";
import {getBalance} from "../../services/users";
import {MyEditor} from "../../components/MyEditor/MyEditor";
import useAnchor from "../../hooks/useAnchor";

const NewAd = () => {
    const [category, setCategory] = useState<number | undefined>(0)
    const [formInfo, setFormInfo] = useState<any>({
        category: 0,
    })
    const [anchor, functionForAnchor]: any = useAnchor()
    const user: IUser | null = useAppSelector((state) => state?.user?.user)
    const [loadPhotoModal, setLoadPhotoModal] = useState<boolean>(false)
    const photoInfo = useImageViewer(formInfo?.image)
    const [dragActive, setDragActive] = useState<boolean>(false)
    const inputRef = useRef(null)
    const [files, setFiles] = useState<any>([])
    const imageViewer = useImagesViewer(files)
    const [adCover, setAdCover] = useState<any>([])
    const [adCover2, setAdCover2] = useState<any>([])
    const adCoverViewer = useImagesViewer(adCover)
    const adCoverViewer2 = useImagesViewer(adCover2)
    const [cities, setCities] = useState<Array<string> | undefined>([])
    const [areas, setAreas] = useState<Array<IOffersAreaItem | undefined>>([])
    const [subSections, setSubSections] = useState<Array<IOffersSubSectionsItem | undefined>>([])
    const [currentArea, setCurrentArea] = useState<number | undefined>(undefined)
    const navigate = useNavigate()
    const [promo, setPromo] = useState<string>()
    const [promoData, setPromoData] = useState<any>()
    const dispatch = useAppDispatch()
    const {id} = useParams()
    const [textPhoto, setTextPhoto] = useState({
        text: '',
        size: '',
        isInValidSize: true,
        isInValidSizeMB: true,
    })
    const [currentOffer, setCurrentOffer] = useState<IUseStateItem<IOfferItem>>({
        isLoaded: false,
        item: null,
    })
    const getPromo = (value: string) => {
        GetPromo(value)
            .then((res: any) => {
                if (res) {
                    setPromoData(res)
                    dispatch(showAlert({
                        message: 'Промокод активирован!',
                        typeAlert: 'good'
                    }))
                }})
            .catch(e => {
                setPromo('')
                dispatch(showAlert({
                    message: 'Промокод не найден!',
                    typeAlert: 'bad'
                }))
            })
    }
    const [imagesFromServer, setImagesFromServer] = useState<any>(null)
    const [isPricePerMonthAbsolute, setRoaloty] = useState<boolean>(true)
    const [placedForMonths, setPlacedForMonths] = useState(3)
    const [premiumInf, setPremiumInf] = useState<any>(null)
    const [paymentType, setPaymentType] = useState('INTERNAL');

    useEffect(() => {
        const val = getValues('pricePerMonth')
        if (!isPricePerMonthAbsolute) {
            if (val > 100) setError('pricePerMonth', {message: 'Не больше 100%'})
            clearErrors('profitPerMonth')
        } else clearErrors('pricePerMonth')
    }, [isPricePerMonthAbsolute])

    const {
        register,
        setValue,
        watch,
        formState: {errors},
        handleSubmit,
        setError,
        getValues,
        clearErrors,
        control
    } = useForm<IOfferForm>({
        mode: 'onSubmit',
        reValidateMode: 'onChange',
        defaultValues: {
            about: '',
            area: '',
            businessPlan: '',
            category: '',
            city: '',
            cooperationTerms: '',
            description: '',
            investments: '',
            paybackTime: '',
            profitPerMonth: '',
            projectStage: '',
            subsectionId: '',
            title: '',
            aboutCompany: '',
            benefits: '',
            branchCount: '',
            dateOfCreation: '',
            price: '',
            pricePerMonth: '',
            soldBranchCount: '',
            video: '',
            profit: '',
        },
    })
    useEffect(() => {
        getCity().then((res) => setCities(res))
    }, [])

    useEffect(() => {
        getAllAreas().then((res) => res && setAreas(res))
    }, [])

    useEffect(() => {
        if (currentArea) {
            getAllSubsections(currentArea).then((res) => res && setSubSections(res))
        }
    }, [currentArea])

    useEffect(() => {
        if (adCoverViewer[0]?.info?.data_url) {
            clearErrors('image')
        }
    }, [adCoverViewer[0]?.info?.data_url])

    useEffect(() => {
        if (id) {
            getOneOffer(id)
                .then((res) => {
                    if (res) {
                        setCity(res.city)
                        setCurrentOffer({isLoaded: true, item: res})
                        setValue('title', res?.title)
                        setValue('about', res?.about || '')
                        setValue('area', res?.subsection?.area?.id)
                        setValue('businessPlan', res?.businessPlan)
                        setValue('category', res?.category)
                        setValue('cooperationTerms', res?.cooperationTerms)
                        setValue('description', res?.description)
                        setValue('investments', FunctionForPrice(res?.investments))
                        setValue('paybackTime', FunctionForPrice(res?.paybackTime))
                        setValue('profitPerMonth', FunctionForPrice(res?.profitPerMonth))
                        setValue('projectStage', res?.projectStage == null ? '' : res?.projectStage)
                        setValue('subsectionId', res?.subsectionId)
                        setValue('aboutCompany', res?.aboutCompany || '')
                        setValue('benefits', res?.benefits || '')
                        setValue('branchCount', FunctionForPrice(res?.branchCount) || '')
                        setValue('dateOfCreation', res?.dateOfCreation)
                        setValue('price', FunctionForPrice(res?.price) || '')
                        setValue('pricePerMonth', FunctionForPrice(res?.pricePerMonth) || '')
                        setValue('soldBranchCount', FunctionForPrice(res?.soldBranchCount) || '')
                        setValue('video', res?.video || '')
                        setValue('profit', FunctionForPrice(res?.profit) || '')
                        setValue('city', res?.city || '')
                        setValue('image', res?.image)
                        setValue('videoThumbnail', res?.videoThumbnail)
                        setCurrentArea(res?.subsection?.area?.id)
                        setRoaloty(res?.isPricePerMonthAbsolute)
                    }
                })
                .catch()
        }
    }, [id])

    useEffect(() => {
        if (id) {
            setCategory(currentOffer?.item?.category)
            setFormInfo({
                category: currentOffer?.item?.category,
                city: currentOffer?.item?.city,
            })
            setImagesFromServer(currentOffer?.item?.images)
        }
    }, [currentOffer, id])

    const handleDrag = (e: any) => {
        e.preventDefault()
        e.stopPropagation()
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setDragActive(true)
        } else if (e.type === 'dragleave') {
            setDragActive(false)
        }
    }

    const handleDrop = (e: any) => {
        e.preventDefault()
        e.stopPropagation()
        setDragActive(false)
        if (e.dataTransfer.files && e.dataTransfer.files[0] && e.dataTransfer?.files?.length <= 10) {
            setFiles([...e.dataTransfer.files])
        } else {
            alert('Меньше 10 шт.')
        }
    }

    const deletePhoto = (name: string) => {
        setFiles(files.filter((i: any) => i.name !== name))
    }

    useEffect(() => {
        if (photoInfo && formInfo?.image) {
            const sizeMB = formInfo?.image?.size / 1000000
            if (sizeMB > 5) {
                setTextPhoto((prevState) => ({
                    ...prevState,
                    size: `Файл не загружен, вес не подходит ${sizeMB.toFixed(2)} МБ`,
                    isInValidSizeMB: true,
                }))
            } else {
                setTextPhoto((prevState) => ({
                    ...prevState,
                    size: `Файл загружен, вес подходит ${sizeMB.toFixed(2)} МБ`,
                    isInValidSizeMB: false,
                }))
            }
        }
    }, [formInfo?.image, photoInfo])

    useEffect(() => {
    }, [textPhoto?.isInValidSize, textPhoto?.isInValidSizeMB])

    const createNewOffer = (data: IOfferForm) => {
        const formData = new FormData()
        let dateNew
        if (data?.dateOfCreation) {
            dateNew = convertLocaleDate(data?.dateOfCreation)?.replaceAll('/', '.')
            if (dateNew) {
                if (dateNew[1] == '.')
                    dateNew = '0' + dateNew
                if (dateNew[4] == '.')
                    dateNew = dateNew.slice(0, 3) + '0' + dateNew.slice(3, 9)
            }
        }
        let req: any = {
            ...data,
            dateOfCreation: dateNew ? dateNew : '',
            userId: user?.id,
            image: formInfo?.image || '',
            category: formInfo?.category,
            isPricePerMonthAbsolute,
            placedForMonths,
            paymentType
        }
        if(formInfo?.videoThumbnail)
            req={...req, videoThumbnail:formInfo?.videoThumbnail}

        for (const key in req) {
            formData.append(key, req[key])
        }
        imageViewer.forEach((image: any) => {
            formData.append('images[]', image?.initialFile)
        })
        createOffer(formData)
            .then((res) => {
                if (premium) setPremiumSlot({
                    paymentMethod: paymentType,
                    offerId: res.id,
                    slot: premiumInf?.slot,
                    placedForMonths: premiumInf?.placedForMonths * 3
                })
                    .then(res => {
                        if (res) {
                            getBalance().then(res => {
                                dispatch(setBalance(res))
                                dispatch(showAlert({
                                    message: 'Объявление успешно создано! Ждите одобрения модерации...',
                                    typeAlert: 'good'
                                }))
                                setTimeout(() => {
                                    navigate(-1)
                                }, 1000)
                            })
                        }
                    }).catch(() => {
                        getBalance().then(res => {
                            dispatch(setBalance(res))
                            dispatch(showAlert({message: 'Ошибка с премиум размещением!', typeAlert: 'bad'}))
                            setTimeout(() => {
                                navigate(-1)
                            }, 1000)
                        })
                    })
                else {
                    getBalance().then(res => {
                        dispatch(setBalance(res))
                        dispatch(showAlert({
                            message: 'Объявление успешно создано! Ждите одобрения модерации...',
                            typeAlert: 'good'
                        }))
                        setTimeout(() => {
                            navigate(-1)
                        }, 1000)
                    })
                }
            })
            .catch((error) => {
                dispatch(showAlert({message: 'Произошла ошибка!', typeAlert: 'bad'}))
            })
    }

    const saveChanges = (props:IOfferForm) => {
        const {videoThumbnail, video, ...data}= props
        const formData = new FormData()
        let dateNew
        if (data?.dateOfCreation) {
            dateNew = convertLocaleDate(data?.dateOfCreation)
        }
        let req: any = {
            ...data,
            dateOfCreation: dateNew ? dateNew : '',
            userId: user?.id,
            image: formInfo?.image || '',
            isPricePerMonthAbsolute
        }
        if(video!=currentOffer?.item?.video){
            if(video){
                req={...req, videoThumbnail:formInfo?.videoThumbnail, video}
            }
            else{
                alert(2)
                console.log('-'+video+'-')
                req={...req, video:null}
            }
        }

        for (const key in req) {
            formData.append(key, req[key])
        }
        imageViewer.forEach((image: any) => {
            formData.append('images[]', image?.initialFile)
        })
        updateOffer(id && id, formData)
            .then(() => {
                dispatch(
                    showAlert({
                        message: 'Объявление успешно отредактировано! Переход на страницу объявлений...',
                        typeAlert: 'good',
                    })
                )
                setTimeout(() => {
                    navigate(-1)
                }, 1000)
            })
            .catch((error) => {
                dispatch(showAlert({message: 'Произошла ошибка!', typeAlert: 'bad'}))
            })
    }

    const [city, setCity] = useState<string>('')
    const [cityEr, setCityEr] = useState<string>('')

    const funcForCityEr = (city: string) => {
        if (city === '') setCityEr('Обязательное поле')
        else setCityEr('')
        setCity(city)
    }

    const filterFunc = (data: any) => {
        if (city === '') return 0

        let ValuesFroPrice: Array<Array<any>> = [
            ['branchCount'],
            ['price'],
            ['investments'],
            ['pricePerMonth'],
            ['profitPerMonth'],
            ['profit'],
            ['isoldBranchCount'],
        ]

        ValuesFroPrice.forEach((i) => i.push(FromStringToNumber(watch(i[0])) ?? ''))

        data = {
            ...data,
            [ValuesFroPrice[0][0]]: ValuesFroPrice[0][1],
            [ValuesFroPrice[1][0]]: ValuesFroPrice[1][1],
            [ValuesFroPrice[2][0]]: ValuesFroPrice[2][1],
            [ValuesFroPrice[3][0]]: ValuesFroPrice[3][1],
            [ValuesFroPrice[4][0]]: ValuesFroPrice[4][1],
            [ValuesFroPrice[5][0]]: ValuesFroPrice[5][1],
            [ValuesFroPrice[6][0]]: ValuesFroPrice[6][1],
            city: city,
            promoCode: promoData ? promoData?.code : ''
        }
        if (id) {
            saveChanges(data)
        } else {
            if (!premium || user?.balance && user?.balance >= ((placedForMonths === 3 ? 6000 : 11000) + premiumInf.sum))
                createNewOffer(data)
            else
                dispatch(showAlert({message: 'Оплата не прошла', typeAlert: 'bad'}))
        }
    }
    const returnText = () => {
        if (id) {
            return 'Сохранить изменения'
        } else if (category !== 4) {
            return 'Отправить на модерацию'
        } else {
            return 'Создать и перейти к оплате'
        }
    }

    const deletePhotosChanges = (id: number) => {
        deleteImageOffer(id)
            .then(() => {
                setImagesFromServer(imagesFromServer?.filter((i: any) => i?.id !== id))
                dispatch(showAlert({message: 'Фото успешно удалено', typeAlert: 'good'}))
            })
            .catch(() => {
                dispatch(showAlert({message: 'Произошла ошибка', typeAlert: 'bad'}))
            })
    }
    const GoodLook = (o: any) => {
        let val = FromStringToNumber(o.target.value)
        setValue(o.target.name, FunctionForPrice(val))
    }


    useEffect(() => {
        formInfo?.image && setAdCover([formInfo.image])
        formInfo?.videoThumbnail && setAdCover2([formInfo.videoThumbnail])
    }, [formInfo])

    const [premium, setPremium] = useState(false)

    return (
        <>
            <Link to="/account/my-ads" className="color-1 f_11 fw_5 d-flex align-items-center d-lg-none mb-3 mb-sm-4">
                <MdOutlineArrowBack/>
                <span className="ms-2">Назад</span>
            </Link>
            <h4>{id ? 'Редактирование объявления' : 'Новое объявление'}</h4>
            <form onDragEnter={handleDrag} onSubmit={handleSubmit(filterFunc)}>
                <fieldset className="row align-items-center mb-4 mb-sm-5">
                    <div className="col-sm-6 col-lg-4">
                        <div className="fw_7 text-uppercase mb-2 mb-sm-0">Категория</div>
                    </div>
                    <div className="col-sm-6 col-lg-8">
                        <select
                            value={formInfo?.category || ''}
                            {...register('category', {
                                onChange: (e) => {
                                    setCategory(+e?.target?.value)
                                    setFormInfo({category: +e.target.value})
                                },
                            })}
                        >
                            <option value={0}>Поиск инвесторов</option>
                            <option value={1}>Предложения инвесторов</option>
                            <option value={2}>Поиск бизнес партнёров</option>
                            <option value={3}>Продажа готового бизнеса</option>
                            {user?.type !== 0 && <option value={4}>Франшизы</option>}
                        </select>
                    </div>
                </fieldset>
                <fieldset>
                    <legend className="fw_7 f_10 text-uppercase mb-3 mb-sm-4">Параметры</legend>

                    <div className="row align-items-center mb-3 mb-sm-4">
                        <div className="col-sm-6 col-lg-4 mb-1 mb-sm-0">
                            <div>
                                {category === 4 ? 'Название франшизы' : 'Название объявления'}
                                <span className="red">*</span>
                            </div>
                        </div>
                        <div className="col-sm-6 col-lg-8">
                            <ValidateWrapper error={errors?.title}>
                                <input
                                    type="text"
                                    {...register('title', {
                                        required: 'Обязательное поле',
                                        minLength: {value: 2, message: 'Минимальная длина 2 символа'},
                                    })}
                                    placeholder="Например, продажа офисных помещений"
                                />
                            </ValidateWrapper>
                        </div>
                    </div>

                    <div className="row mb-3 mb-sm-4">
                        <div className="col-sm-6 col-lg-4 mb-1 mb-sm-0 pt-sm-2">
                            <div>
                                {category === 0 || category === 1 || category === 2
                                    ? 'Описание объявления'
                                    : category === 3
                                        ? 'Описание бизнеса'
                                        : 'Описание компании'}
                                <span className="red">*</span>
                            </div>
                        </div>
                        <div className="col-sm-6 col-lg-8">
                            <ValidateWrapper error={errors.description} textarea={true}>
                                <Controller
                                    name="description"
                                    control={control}
                                    rules={{required: 'Обязательное поле'}}
                                    render={({field: {value, onChange}}: any) =>
                                        <MyEditor value={value} onChange={onChange} placeholder={
                                            category === 0 || category === 1 || category === 2
                                                ? 'Описание объявления'
                                                : category === 3
                                                    ? 'Описание бизнеса'
                                                    : 'Описание компании'
                                        }/>
                                    }
                                />
                            </ValidateWrapper>
                        </div>
                    </div>
                    {category === 4 && (
                        <>
                            <div className="row mb-3 mb-sm-4">
                                <div className="col-sm-6 col-lg-4 mb-1 mb-sm-0 pt-sm-2">
                                    <div>
                                        Описание франшизы<span className="red">*</span>
                                    </div>
                                </div>
                                <div className="col-sm-6 col-lg-8">
                                    <ValidateWrapper error={errors.aboutCompany} textarea={true}>
                                        <Controller
                                            name="aboutCompany"
                                            control={control}
                                            rules={{required: 'Обязательное поле'}}
                                            render={({field: {value, onChange}}: any) =>
                                                <MyEditor value={value} onChange={onChange}
                                                          placeholder="Описание франшизы"/>
                                            }
                                        />
                                    </ValidateWrapper>
                                </div>
                            </div>
                            <div className="row mb-3 mb-sm-4">
                                <div className="col-sm-6 col-lg-4 mb-1 mb-sm-0 pt-sm-2">
                                    <div>Преимущества франшизы</div>
                                </div>
                                <div className="col-sm-6 col-lg-8">
                                    <ValidateWrapper error={errors.benefits} textarea={true}>
                                        <Controller
                                            name="benefits"
                                            control={control}
                                            rules={{required: 'Обязательное поле'}}
                                            render={({field: {value, onChange}}: any) =>
                                                <MyEditor value={value} onChange={onChange}
                                                          placeholder="Преимущества франшизы"/>
                                            }
                                        />
                                    </ValidateWrapper>

                                </div>
                            </div>
                        </>
                    )}
                    <div className="row mb-3 mb-sm-4">
                        <div className="col-sm-6 col-lg-4 mb-1 mb-sm-0 pt-sm-2">
                            <div>
                                {category === 0 || category === 2 || category === 4 ?
                                    'Условия сотрудничества'
                                    : category === 1 ?
                                        'Предполагаемые условия сотрудничества'
                                        : 'Условия продажи'
                                }
                                <span className="red">*</span>
                            </div>
                        </div>
                        <div className="col-sm-6 col-lg-8">
                            <ValidateWrapper error={errors.cooperationTerms} textarea={true}>
                                <Controller
                                    name="cooperationTerms"
                                    control={control}
                                    rules={{required: 'Обязательное поле'}}
                                    render={({field: {value, onChange}}: any) =>
                                        <MyEditor value={value} onChange={onChange} placeholder={
                                            category === 0 || category === 2 || category === 4
                                                ? 'Условия сотрудничества'
                                                : category === 1
                                                    ? 'Предполагаемые условия сотрудничества'
                                                    : 'Условия продажи'
                                        }/>
                                    }
                                />
                            </ValidateWrapper>
                        </div>
                    </div>
                    {(category === 0 || category === 2 || category === 3 || category === 4) && (
                        <div className="row mb-3 mb-sm-4">
                            <div className="col-sm-6 col-lg-4 mb-1 mb-sm-0 pt-sm-2">
                                <div>Бизнес-план</div>
                            </div>
                            <div className="col-sm-6 col-lg-8">
                                <Controller
                                    name="businessPlan"
                                    control={control}
                                    render={({field: {value, onChange}}: any) =>
                                        <MyEditor value={value} onChange={onChange} placeholder="Бизнес-план"/>
                                    }
                                />
                            </div>
                        </div>
                    )}
                    {(category === 0 || category === 1 || category === 2) && (
                        <div className="row mb-3 mb-sm-4">
                            <div className="col-sm-6 col-lg-4 mb-1 mb-sm-0 pt-sm-2">
                                <div>О себе</div>
                            </div>
                            <div className="col-sm-6 col-lg-8" ref={anchor}>
                                <Controller
                                    name="about"
                                    control={control}
                                    render={({field: {value, onChange}}: any) =>
                                        <MyEditor value={value} onChange={onChange} placeholder="О себе"/>
                                    }
                                />
                            </div>
                        </div>
                    )}
                    <div className="row mb-3 mb-sm-4">
                        <div className="col-sm-6 col-lg-4 mb-1 mb-sm-0">
                            <div>Обложка объявления<span className="red">*</span></div>
                            <div className="l-gray f_09 mt-1">
                                Рекомендуемый размер 600х400, размер файла не более 5 мб.
                            </div>
                        </div>
                        <div className="col-sm-6 col-lg-8">
                            <div className="file-upload">
                                <button className="btn_main btn_2 fw_4"
                                        style={errors?.image ? {color: 'red', border: '2px solid red'} : {}}>Загрузить
                                </button>
                                <input
                                    type="file"
                                    onChange={(e) => {
                                        onImageHandler(e, setFormInfo, 'image')
                                    }}
                                />
                            </div>
                            {(adCoverViewer?.length > 0 || getValues('image')) &&
                                <div className="photos-window">
                                    <div className="photos-items-preview">
                                        <img
                                            src={
                                                adCoverViewer[0]?.info?.data_url ?
                                                    adCoverViewer[0]?.info?.data_url
                                                    : checkPhotoPath(getValues('image'))
                                            }
                                        />
                                    </div>
                                </div>}
                            {textPhoto?.text}
                            {textPhoto?.size}
                        </div>
                    </div>
                    <div className="row mb-3 mb-sm-4">
                        <div className="col-sm-6 col-lg-4 mb-1 mb-sm-0">
                            <div>Фотогалерея</div>
                            <div className="l-gray f_09 mt-1">Не более 10</div>
                        </div>
                        <div className="col-sm-6 col-lg-8">
                            <div className="file-upload">
                                <button
                                    type="button"
                                    className="btn_main btn_2 fw_4"
                                    onClick={() => setLoadPhotoModal(true)}
                                >
                                    Загрузить
                                </button>
                                {id ? (
                                    imagesFromServer?.map((i: any, index: number) => (
                                        <div className="photos-window preview" key={index}>
                                            <div className="photos-items-preview">
                                                <img src={checkPhotoPath(i?.image)}/>
                                            </div>
                                            <button type='button' onClick={() => deletePhotosChanges(i?.id)}>
                                                <div>x</div>
                                            </button>
                                        </div>
                                    ))
                                ) : (
                                    imageViewer?.length > 0 && imageViewer?.map((photos: any, index: any) => (
                                        <div className="photos-window preview" key={index}>
                                            <div className="photos-items-preview">
                                                <img src={photos?.info?.data_url}/>
                                            </div>
                                            <button type='button' onClick={() => deletePhoto(photos?.info?.name)}>
                                                <div>x</div>
                                            </button>
                                        </div>
                                    ))
                                )}
                                <CustomModal
                                    className="modal__photosAdd"
                                    isShow={loadPhotoModal}
                                    setIsShow={setLoadPhotoModal}
                                    closeButton={true}
                                    size="lg"
                                    titleHead={'Фотографии'}
                                >
                                    <div className="mainModalPhotos">
                                        <div
                                            className={`itemsModalPhotos ${imageViewer?.length !== 0 ? 'view-items' : ''
                                            } ${id ? 'view-items' : ''}`}
                                            onDragEnter={handleDrag}
                                            onSubmit={(e) => e.preventDefault()}
                                        >
                                            {id ? (
                                                imagesFromServer?.map((i: any, index: number) => (
                                                    <div className="photos-window" key={index}>
                                                        <div className="photos-items">
                                                            <img
                                                                src={checkPhotoPath(i?.image)}
                                                                className="for-photos-dragAndDrop"
                                                            />
                                                            <span>{i?.image?.split('/')[2]}</span>
                                                        </div>
                                                        <button onClick={() => deletePhotosChanges(i?.id)}>
                                                            Удалить
                                                        </button>
                                                    </div>
                                                ))
                                            ) : imageViewer?.length === 0 ? (
                                                <div className="dragAndDropInItems">
                                                    <input
                                                        ref={inputRef}
                                                        type="file"
                                                        id="input-file-upload"
                                                        multiple
                                                        onChange={(e: any) => {
                                                            e.target?.files?.length <= 10
                                                                ? setFiles((prevState: any) => [
                                                                    ...prevState,
                                                                    ...e.target.files,
                                                                ])
                                                                : alert('Не более 10 шт.')
                                                        }}
                                                    />
                                                    <label
                                                        id="label-file-upload"
                                                        htmlFor="input-file-upload"
                                                        className={dragActive ? 'drag-active' : ''}
                                                    >
                                                        <div>
                                                            <p>Перетащите сюда файлы для загрузки</p>
                                                        </div>
                                                    </label>
                                                </div>
                                            ) : (
                                                imageViewer?.map((photos: any, index: any) => (
                                                    <div className="photos-window" key={index}>
                                                        <div className="photos-items">
                                                            <img
                                                                src={photos?.info?.data_url}
                                                                className="for-photos-dragAndDrop"
                                                            />
                                                            <span>{photos?.info?.name}</span>
                                                        </div>
                                                        <button onClick={() => deletePhoto(photos?.info?.name)}>
                                                            Удалить
                                                        </button>
                                                    </div>
                                                ))
                                            )}
                                            {dragActive && (
                                                <div
                                                    id="drag-file-element"
                                                    onDragEnter={handleDrag}
                                                    onDragLeave={handleDrag}
                                                    onDragOver={handleDrag}
                                                    onDrop={handleDrop}
                                                />
                                            )}
                                        </div>
                                        <div className="buttonsModalPhotos">
                                            <div className="miniGroup">
                                                <div className="file-upload">
                                                    <label>
                                                        <button className="btn_main btn_2 fw_4">Загрузить</button>
                                                        <input
                                                            type="file"
                                                            multiple
                                                            onInput={(e: any) => {
                                                                if (e.target?.files?.length <= 10) {
                                                                    if (imageViewer?.length <= 10) {
                                                                        setFiles([...e.target.files])
                                                                    } else {
                                                                        alert('Меньше 10 шт. кнопка файлы')
                                                                    }
                                                                } else {
                                                                    alert('Меньше 10 шт. кнопка таргет')
                                                                }
                                                            }}
                                                        />
                                                    </label>
                                                </div>
                                                <span>Не более 10 фотографий</span>
                                            </div>
                                            <button className="btn_main btn_1" onClick={() => setLoadPhotoModal(false)}>
                                                Сохранить
                                            </button>
                                        </div>
                                    </div>
                                </CustomModal>
                            </div>
                        </div>
                    </div>
                    {category === 4 && (
                        <>
                            <div className="row mb-3 mb-sm-4">
                                <div className="col-sm-6 col-lg-4 mb-1 mb-sm-0">
                                    <div>Загрузить видео</div>
                                </div>
                                <div className="col-sm-6 col-lg-8">
                                    <ValidateWrapper error={errors?.video}>
                                        <input type="text" placeholder="Вставить ссылку" {
                                            ...register('video', {
                                                onChange: (e) => {
                                                    const link: string = e.target.value;
                                                    link.indexOf('v=') !== -1 && setValue('video', link.replace('/watch?v=', '/embed/'))
                                                }
                                            })
                                        } />
                                    </ValidateWrapper>
                                </div>
                            </div>
                            <div className="row mb-3 mb-sm-4">
                                <div className="col-sm-6 col-lg-4 mb-1 mb-sm-0">
                                    <div>
                                        Загрузить обложку к видео
                                        {getValues('video')?.length>0?
                                            <span className="red">*</span>
                                            :<></>
                                        }
                                    </div>
                                </div>
                                <div className="col-sm-6 col-lg-8">
                                    <div className="file-upload">
                                        <button className="btn_main btn_2 fw_4"
                                                style={getValues('video')?.length>0 && !getValues('videoThumbnail') ? {color: 'red', border: '2px solid red'}:{}}>Загрузить
                                        </button>
                                        <input
                                            type="file"
                                            onChange={(e) => {
                                                onImageHandler(e, setFormInfo, 'videoThumbnail')
                                            }}
                                        />
                                    </div>
                                    {(adCoverViewer2?.length > 0 || getValues('videoThumbnail')) &&
                                        <div className="photos-window">
                                            <div className="photos-items-preview">
                                                <img
                                                    src={
                                                        adCoverViewer2[0]?.info?.data_url ?
                                                            adCoverViewer2[0]?.info?.data_url
                                                            : checkPhotoPath(getValues('videoThumbnail'))
                                                    }
                                                />
                                            </div>
                                        </div>}
                                    {textPhoto?.text}
                                    {textPhoto?.size}

                                </div>
                            </div>

                        </>
                    )}
                    <div className="row align-items-center mb-3 mb-sm-4">
                        <div className="col-sm-6 col-lg-4 mb-1 mb-sm-0">
                            <div>
                                Город<span className="red">*</span>
                            </div>
                        </div>
                        <div className="col-sm-6 col-lg-8">
                            <ValidateWrapper forCity={true} error={{message: cityEr}}>
                                <CitiesForm val={city} setVal={funcForCityEr}/>
                            </ValidateWrapper>
                        </div>
                    </div>
                    <div className="row align-items-center mb-3 mb-sm-4">
                        <div className="col-sm-6 col-lg-4 mb-1 mb-sm-0">
                            <div>
                                Сфера<span className="red">*</span>
                            </div>
                        </div>
                        <div className="col-sm-6 col-lg-8">
                            <ValidateWrapper error={errors?.area}>
                                <select
                                    defaultValue={''}
                                    {...register('area', {
                                        required: 'Обязательное поле',
                                        onChange: (e) => {
                                            setCurrentArea(+e.target.value)
                                            setValue('subsectionId', '')
                                        },
                                    })}
                                >
                                    <option value={''} disabled>
                                        Сфера
                                    </option>
                                    {areas?.map((area) => (
                                        <option key={area?.id} value={area?.id}>
                                            {area?.name}
                                        </option>
                                    ))}
                                </select>
                            </ValidateWrapper>
                        </div>
                    </div>
                    <div className="row align-items-center mb-3 mb-sm-4">
                        <div className="col-sm-6 col-lg-4 mb-1 mb-sm-0">
                            <div>
                                Подраздел<span className="red">*</span>
                            </div>
                        </div>
                        <div className="col-sm-6 col-lg-8">
                            <ValidateWrapper error={errors?.subsectionId}>
                                <select
                                    defaultValue={''}
                                    {...register('subsectionId', {
                                        required: 'Обязательное поле',
                                    })}
                                >
                                    <option value={''} disabled>
                                        Подраздел
                                    </option>
                                    {subSections?.map((subsection) => (
                                        <option key={subsection?.id} value={subsection?.id}>
                                            {subsection?.name}
                                        </option>
                                    ))}
                                </select>
                            </ValidateWrapper>
                        </div>
                    </div>
                    {category === 3 && (
                        <>
                            <div className="row align-items-center mb-3 mb-sm-4">
                                <div className="col-sm-6 col-lg-4 mb-1 mb-sm-0">
                                    <div>
                                        Количество точек<span className="red">*</span>
                                    </div>
                                </div>
                                <div className="col-sm-6 col-lg-4">
                                    <ValidateWrapper error={errors?.branchCount}>
                                        <input
                                            type="text"
                                            placeholder="0"
                                            className="f_09"
                                            {...register('branchCount', {
                                                required: 'Обязательное поле',
                                                min: {value: 0, message: 'Минимум 0'},
                                                onChange: (event) => GoodLook(event),
                                            })}
                                        />
                                    </ValidateWrapper>
                                </div>
                            </div>
                            <div className="row align-items-center mb-3 mb-sm-4">
                                <div className="col-sm-6 col-lg-4 mb-1 mb-sm-0">
                                    <div>
                                        Стоимость бизнеса<span className="red">*</span>
                                    </div>
                                </div>
                                <div className="col-sm-6 col-lg-4">
                                    <ValidateWrapper error={errors?.price}>
                                        <input
                                            type="text"
                                            placeholder="0"
                                            className="f_09"
                                            {...register('price', {
                                                required: 'Обязательное поле',
                                                min: {value: 0, message: 'Минимум 0'},
                                                onChange: (event) => GoodLook(event),
                                            })}
                                        />
                                    </ValidateWrapper>
                                </div>
                            </div>
                        </>
                    )}
                    {(category === 0 || category === 1 || category === 2 || category === 4) && (
                        <div className="row align-items-center mb-3 mb-sm-4">
                            <div className="col-sm-6 col-lg-4 mb-1 mb-sm-0">
                                <div>
                                    {category === 0 || category === 2
                                        ? 'Требуемые инвестиции'
                                        : category === 1
                                            ? 'Возможные инвестиции'
                                            : 'Стартовые инвестиции от'}
                                    <span className="red">*</span>
                                </div>
                            </div>
                            <div className="col-sm-6 col-lg-4">
                                <ValidateWrapper error={errors?.investments}>
                                    <input
                                        type="text"
                                        placeholder="0"
                                        className="f_09 input-price"
                                        {...register('investments', {
                                            required: 'Обязательное поле',
                                            min: {value: 0, message: 'Минимум 0'},
                                            onChange: (event) => GoodLook(event),
                                        })}
                                    />
                                </ValidateWrapper>
                            </div>
                        </div>
                    )}
                    {category === 4 && (
                        <>
                            <div className="row align-items-center mb-3 mb-sm-4">
                                <div className="col-sm-6 col-lg-4 mb-1 mb-sm-0">
                                    <div>
                                        Паушальный взнос<span className="red">*</span>
                                    </div>
                                </div>
                                <div className="col-sm-6 col-lg-4">
                                    <ValidateWrapper error={errors?.price}>
                                        <input
                                            type="text"
                                            placeholder="0"
                                            className="f_09 input-price"
                                            {...register('price', {
                                                required: 'Обязательное поле',
                                                min: {value: 0, message: 'Минимум 0'},
                                                onChange: (event) => GoodLook(event),
                                            })}
                                        />
                                    </ValidateWrapper>
                                </div>
                            </div>
                            <div className="row align-items-center mb-4">
                                <div className="col-sm-6 col-lg-4 mb-1 mb-sm-0">
                                    <div>
                                        Роялти
                                        <span className="red">*</span>
                                    </div>
                                </div>
                                <div className="col-sm-6 col-lg-4">
                                    <ValidateWrapper error={errors?.pricePerMonth}>
                                        <input
                                            type="text"
                                            placeholder="0"
                                            className={`f_09 ${!isPricePerMonthAbsolute ? 'input-procent' : 'input-price'}`}
                                            {...register('pricePerMonth', {
                                                required: 'Обязательное поле',
                                                min: {value: 0, message: 'Минимум 0'},
                                                validate: e => {
                                                    if (!isPricePerMonthAbsolute && Number(String(e).replaceAll(' ', '')) > 100) return 'Не больше 100%'
                                                    return true;
                                                },
                                                onChange: (event) => GoodLook(event),
                                            })}
                                        />
                                    </ValidateWrapper>

                                </div>
                            </div>
                            <div className="row align-items-center mb-4">
                                <div className="col-sm-6 col-lg-4 mb-1 mb-sm-0 pb-1">
                                    <div>
                                        Единица измерения<span className="red">*</span>
                                    </div>
                                </div>
                                <div className="col-sm-2 col-lg-1 col-2">
                                    <div className={"d-inline-block"}><input
                                        name="roal-type"
                                        checked={isPricePerMonthAbsolute}
                                        onChange={() => setRoaloty(!isPricePerMonthAbsolute)}
                                        type="radio"
                                    /></div>
                                    <div className={"d-inline-block"}>&nbsp;₽</div>
                                </div>
                                <div className="col-sm-2 col-lg-1 col-2">
                                    <div className={"d-inline-block"}><input
                                        name="raol-type"
                                        checked={!isPricePerMonthAbsolute}
                                        onChange={() => setRoaloty(!isPricePerMonthAbsolute)}
                                        type="radio"
                                    /></div>
                                    <div className={"d-inline-block"}>&nbsp;%</div>
                                </div>
                            </div>
                        </>
                    )}
                    {(category === 0 || category === 2 || category === 4) && (
                        <div className="row align-items-center mb-3 mb-sm-4">
                            <div className="col-sm-6 col-lg-4 mb-1 mb-sm-0">
                                <div>Предполагаемая прибыль / мес</div>
                            </div>
                            <div className="col-sm-6 col-lg-4">
                                <ValidateWrapper error={errors?.profitPerMonth}>
                                    <input
                                        type="text"
                                        placeholder="0"
                                        className="f_09 input-price"
                                        {...register('profitPerMonth', {
                                            min: {value: 0, message: 'Минимум 0'},
                                            minLength: {value: 0, message: 'Минимальная длина 0 символа'},
                                            validate: e => {
                                                if (e && category === 4 && isPricePerMonthAbsolute && Number(String(e).replaceAll(' ', '')) < Number(String(getValues('pricePerMonth')).replaceAll(' ', '')))
                                                    return `Не меньше роялти`
                                                return true;
                                            },
                                            onChange: (event) => GoodLook(event),
                                        })}
                                    />
                                </ValidateWrapper>
                            </div>
                        </div>
                    )}
                    <div className="row align-items-center mb-3 mb-sm-4">
                        <div className="col-sm-6 col-lg-4 mb-1 mb-sm-0">
                            <div>Окупаемость</div>
                        </div>
                        <div className="col-sm-6 col-lg-8">
                            <select defaultValue={0} {...register('paybackTime')}>
                                <option value={0}></option>
                                <option value={1}>до 3 месяцев</option>
                                <option value={2}>от 3 до 6 месяцев</option>
                                <option value={3}>от 6 месяцев до 1 года</option>
                                <option value={4}>от 1 года до 3 лет</option>
                                <option value={5}>от 3 лет</option>
                            </select>
                        </div>
                    </div>
                    {(category === 0 || category === 2) && (
                        <div className="row align-items-center mb-3 mb-sm-4">
                            <div className="col-sm-6 col-lg-4 mb-1 mb-sm-0">
                                <div>
                                    Стадия проекта<span className="red">*</span>
                                </div>
                            </div>
                            <div className="col-sm-6 col-lg-8">
                                <ValidateWrapper error={errors?.projectStage}>
                                    <select
                                        defaultValue={''}
                                        {...register('projectStage', {
                                            required: 'Обязательное поле',
                                        })}
                                    >
                                        <option value={''} disabled>
                                            Стадия проекта
                                        </option>
                                        <option value={0}>Идея</option>
                                        <option value={1}>В стадии создания</option>
                                        <option value={2}>Готовый бизнес</option>
                                    </select>
                                </ValidateWrapper>
                            </div>
                        </div>
                    )}
                    {category === 3 && (
                        <>
                            <div className="row align-items-center mb-3 mb-sm-4">
                                <div className="col-sm-6 col-lg-4 mb-1 mb-sm-0">
                                    <div>Оборот в месяц</div>
                                </div>
                                <div className="col-sm-6 col-lg-4">
                                    <ValidateWrapper error={errors?.profitPerMonth}>
                                        <input
                                            type="text"
                                            placeholder="0"
                                            className="f_09"
                                            {...register('profitPerMonth', {
                                                min: {value: 0, message: 'Минимум 0'},
                                                minLength: {value: 0, message: 'Минимальная длина 0 символа'},
                                                onChange: (event) => GoodLook(event),
                                            })}
                                        />
                                    </ValidateWrapper>
                                </div>
                            </div>
                            <div className="row align-items-center mb-3 mb-sm-4">
                                <div className="col-sm-6 col-lg-4 mb-1 mb-sm-0">
                                    <div>
                                        Чистая прибыль<span className="red">*</span>
                                    </div>
                                </div>
                                <div className="col-sm-6 col-lg-4">
                                    <ValidateWrapper error={errors?.profit}>
                                        <input
                                            type="text"
                                            placeholder="0"
                                            className="f_09"
                                            {...register('profit', {
                                                required: 'Обязательное поле',
                                                min: {value: 0, message: 'Минимум 0'},
                                                minLength: {value: 4, message: 'Минимальная длина 4 символа'},
                                                onChange: (event) => GoodLook(event),
                                            })}
                                        />
                                    </ValidateWrapper>
                                </div>
                            </div>
                        </>
                    )}
                    {category === 4 && (
                        <>
                            <div className="row align-items-center mb-3 mb-sm-4">
                                <div className="col-sm-6 col-lg-4 mb-1 mb-sm-0">
                                    <div>Год основания компании</div>
                                </div>
                                <div className="col-sm-6 col-lg-4">
                                    <input
                                        type="date"
                                        placeholder="0"
                                        data-date-format="DD.MMMM.YYYY"
                                        className="f_09"
                                        {...register('dateOfCreation')}
                                    />
                                </div>
                            </div>
                            <div className="row align-items-center mb-3 mb-sm-4">
                                <div className="col-sm-6 col-lg-4 mb-1 mb-sm-0">
                                    <div>Количество собственных точек</div>
                                </div>
                                <div className="col-sm-6 col-lg-4">
                                    <ValidateWrapper error={errors?.branchCount}>
                                        <input
                                            type="text"
                                            placeholder="0"
                                            className="f_09"
                                            {...register('branchCount', {
                                                min: {value: 0, message: 'Минимум 0'},
                                                onChange: (event) => GoodLook(event),
                                            })}
                                        />
                                    </ValidateWrapper>
                                </div>
                            </div>
                            <div className="row align-items-center mb-3 mb-sm-4">
                                <div className="col-sm-6 col-lg-4 mb-1 mb-sm-0">
                                    <div>Количество проданных франшиз</div>
                                </div>
                                <div className="col-sm-6 col-lg-4">
                                    <ValidateWrapper error={errors?.soldBranchCount}>
                                        <input
                                            type="text"
                                            placeholder="0"
                                            className="f_09"
                                            {...register('soldBranchCount', {
                                                min: {value: 0, message: 'Минимум 0'},
                                                onChange: (event) => GoodLook(event),
                                            })}
                                        />
                                    </ValidateWrapper>
                                </div>
                            </div>
                        </>
                    )}
                </fieldset>

                {!id && category === 4 && (
                    <fieldset className="mt-3 mt-sm-4 mt-md-5">
                        <legend className="fw_7 f_10 text-uppercase mb-2 mb-sm-4">
                            Размещение объявления на 30 дней
                        </legend>
                        <div className="f_xs_08 row gx-2 gx-sm-3 gx-xl-4 mb-3 mb-sm-4">
                            <div className="col-5 col-md-4">
                                <div className="acc-box w-100 h-100">
                                    <label className="mb-2 mb-xl-3">
                                        <input
                                            name="ad-type"
                                            type="radio"
                                            checked={placedForMonths === 3}
                                            onChange={() => setPlacedForMonths(3)}
                                        />
                                        <span className="ms-1 ms-sm-2 ms-xl-3">Разместить</span>
                                    </label>
                                    <div className="fw_6 sky">3 мес. — 6 000 рублей</div>
                                </div>
                            </div>
                            <div className="col-7 col-md-4">
                                <div className="acc-box w-100 h-100">
                                    <label className="mb-2 mb-xl-3">
                                        <input
                                            name="ad-type"
                                            type="radio"
                                            checked={placedForMonths === 6}
                                            onChange={() => setPlacedForMonths(6)}
                                        />
                                        <span className="ms-1 ms-sm-2 ms-xl-3">Разместить</span>
                                    </label>
                                    <div className="fw_6 sky">6 мес. — 11 000 рублей</div>
                                </div>
                            </div>
                            <div className="col-12 col-md-4 mt-2 mt-sm-3 mt-md-0" style={{cursor: "pointer"}}
                                 onClick={() => {
                                     setPremium(!premium)
                                 }}>
                                <div className="btn_main btn_5 f_13 w-100 h-100">
                                    Premium-размещение
                                </div>
                            </div>
                        </div>
                    </fieldset>
                )}
                {!id && premium && <div className={"pt-4"}>
                    <Premium setPayment={setPaymentType}
                             setChange={setPremiumInf}
                             promo={promoData ? promoData?.discountPrice : 0}
                             priceWithoutPremium={placedForMonths === 3 ? 6000 : 11000}
                    />
                </div>}


                {!id && !premium && category === 4 && <div className="row align-items-center mb-3 mb-sm-4">
                    <div className="col-sm-6 col-lg-4">
                        <div>Способ оплаты:</div>
                    </div>
                    <div className="col-sm-6 col-lg-4">
                        <div>
                            <div className={"d-inline-block"}><input
                                name="payment-type"
                                defaultChecked={true}
                                onClick={() => setPaymentType('INTERNAL')}
                                type="radio"
                            /></div>
                            <div className={"d-inline-block px-2 mb-2"}>Кошелёк сайта</div>
                        </div>
                        <div>
                            <div className={"d-inline-block"}><input
                                name="payment-type"
                                defaultChecked={false}
                                onClick={() => setPaymentType('card')}
                                type="radio"
                            /></div>
                            <div className={"d-inline-block px-2"}>Банковской картой</div>
                        </div>
                    </div>
                </div>}

                {category === 4 && (
                    promoData
                    && <div>Промокод активирован!</div>
                    || <div className="promo mt-3 d-block col-5 col-lg-3">
                        <input type="text" value={promo} onChange={(e) => setPromo(e.target.value)}/>
                        <button type="button" className="btn_main btn_3 w-100 mt-2"
                                onClick={() => getPromo(promo ? promo : '')}
                        >
                            Ввести промокод
                        </button>
                    </div>
                )
                }
                {!id && !premium && category === 4 &&
                    <div className="col-sm-6 col-lg-4 mb-2 mt-2 mb-sm-0">
                        <div className="f_12 fw_6">Сумма к оплате: {
                            promoData?.discountPrice ?
                                FunctionForPrice((placedForMonths === 3 ? 6000 : 11000) - promoData?.discountPrice)
                                : FunctionForPrice(placedForMonths === 3 ? 6000 : 11000)
                        }
                        </div>
                    </div>
                }


                <button className={`btn_main btn_1 fw_4 mt-4`} type="submit" onClick={() => {
                    funcForCityEr(city)
                    if (adCoverViewer?.length == 0 && !getValues('image')) {
                        setError('image', {message: 'поле обязательно к заполнению'})
                        functionForAnchor()
                    } else
                        clearErrors('image')
                }}>
                    {returnText()}
                </button>
            </form>

        </>
    )
}

export default NewAd
