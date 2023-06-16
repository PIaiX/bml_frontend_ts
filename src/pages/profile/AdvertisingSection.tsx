import React, {useEffect, useRef, useState} from 'react'
import {Link, useLocation, useNavigate} from 'react-router-dom'
import {MdOutlineArrowBack} from 'react-icons/md'
import {useImageViewer} from '../../hooks/imageViewer'
import {onImageHandler, onRadioHandler,} from '../../helpers/formHandlers'
import FunctionForPrice from '../../helpers/FunctionForPrice'
import {getAdvertisingsPrices, setNewAdvertisings} from "../../services/advertising";
import {useForm} from "react-hook-form";
import ValidateWrapper from "../../components/utils/ValidateWrapper";
import {useAppDispatch, useAppSelector} from "../../hooks/store";
import {getAllAreas, getAllSubsections} from "../../services/offers";
import {IOffersAreaItem, IOffersSubSectionsItem} from "../../types/offers";
import {useImagesViewer} from "../../hooks/imagesViewer";
import {Row} from "react-bootstrap";
import {setBalance} from "../../store/reducers/userSlice";
import {showAlert} from "../../store/reducers/alertSlice";
import {getBalance} from "../../services/users";
import {GetPromo} from "../../services/Promo";


const AdvertisingSection = () => {

    // subsectionId: 86

    const [promoData, setPromoData] = useState<any>()
    const [promo, setPromo] = useState<string>()
    const {state} = useLocation()
    useEffect(() => {
        state && alert('Будет редактирование')
    }, [])


    const [data, setData] = useState<any>({
        lifeAd: '1',
        paymentType: 'INTERNAL'
    })
    const {
        register,
        formState: {errors},
        handleSubmit,
        reset,
        setValue,
        setError,
        clearErrors,
        getValues,
    } = useForm<{
        image: string,
        placedForMonths: string,
        link: string,
        description: string,
        adsTypeId: string,
        // subsectionId: string
    }>()
    const [prices, setPrices] = useState()
    useEffect(() => {
        getAdvertisingsPrices().then(setPrices)
    }, [])

    const [adCover, setAdCover] = useState<any>([])
    const adCoverViewer = useImagesViewer(adCover)
    useEffect(() => {
        data.image && setAdCover([data.image])
    }, [data])

    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const viewPhoto = useImageViewer(data?.image)
    const user = useAppSelector(state => state.user.user)
    const validLittlePhoto = (photo: any): string => {
        if (photo?.width === undefined && photo?.height === undefined) {
            return 'Фото не загружено'
        } else if (data?.adv === 1) {
            return 'Фото загружено'
        } else {
            return 'Размеры не подходят'
        }
    }
    const getPromo = (value: string) => {
        GetPromo(value)
            .then((res: any) => {
                if (res) {
                    setPromoData(res)
                    dispatch(showAlert({
                        message: 'Промокод активирован!',
                        typeAlert: 'good'
                    }))

                }
            })
            .catch(e => {
                setPromo('')
                dispatch(showAlert({
                    message: 'Промокод не найден!',
                    typeAlert: 'bad'
                }))
            })

    }

    const [areas, setAreas] = useState<Array<IOffersAreaItem | undefined>>([])
    const [subSections, setSubSections] = useState<Array<IOffersSubSectionsItem | undefined>>([])
    const [currentArea, setCurrentArea] = useState<number | undefined>(undefined)
    useEffect(() => {
        setValue('adsTypeId', '')
    }, [areas])
    // useEffect(() => {
    //     setValue('subsectionId', '')
    // }, [subSections])

    useEffect(() => {
        getAllAreas().then(res => res && setAreas(res))
    }, [])

    useEffect(() => {
        if (currentArea) {
            getAllSubsections(currentArea).then((res) => res && setSubSections(res))
        }
    }, [currentArea])

    const validBigPhoto = (photo: any): string => {
        if (photo?.width === undefined && photo?.height === undefined) {
            return 'Фото не загружено'
        } else if (data?.adv === 0) {
            return 'Фото загружено'
        } else {
            return 'Размеры не подходят'
        }
    }

    const NewAdvertisings = (dat: any) => {
        const formData = new FormData()
        const req: any = {
            ...dat,
            userId: user?.id,
            subsectionId: 86,
            image: data.image,
            adsTypeId: data.adv + 1,
            paymentMethod: data.paymentType,
            promoCode: promoData ? promoData?.code : ''
        }
        for (const key in req) {
            formData.append(key, req[key])
        }
        setNewAdvertisings(formData)
            .then(res => {
                if (res) {
                    getBalance().then(res => {
                        dispatch(setBalance(res))
                        dispatch(showAlert({
                            message: 'Оплата прошла успешно! Ждите одобрения модерации...',
                            typeAlert: 'good'
                        }))
                        setTimeout(() => {
                            navigate('/account/banners', {state: {section: 2}})
                        }, 1000)
                    })
                } else
                    dispatch(showAlert({message: 'Оплата не прошла', typeAlert: 'bad'}))
            })
            .catch(e => console.log(e))
    }

    const ref1 = useRef<HTMLInputElement>(null)
    const ref2 = useRef<HTMLInputElement>(null)
    const refClick = (ref: number) => {
        if (ref === 1 && ref1.current) {
            ref1.current.click()
        }
        if (ref === 2 && ref2.current) {
            ref2.current.click()
        }
    }
    let status: string = ''
    if (data.adv == 1)
        status = validLittlePhoto(viewPhoto)
    if (data.adv == 0)
        status = validBigPhoto(viewPhoto)
    return (
        <form onSubmit={handleSubmit(NewAdvertisings)}>
            <Link to="/account" className="color-1 f_11 fw_5 d-flex align-items-center d-lg-none mb-3 mb-sm-4">
                <MdOutlineArrowBack/>
                <span className="ms-2">Назад</span>
            </Link>
            {prices && <div>
                <h4 className="mb-3 mb-sm-4 mb-md-5">Разместить баннер</h4>
                <h6 className="f_11 fw_5 mb-3">Описание размещения баннеров и объявлений</h6>
                <p>
                    Задачей размещения баннеров и объявлений является привлечение пользователей, которые уже были на
                    вашем сайте. Часто вы можете встретить рекламу с фотографиями товара, который ранее видели. Но для
                    получения конверсий, используйте баннеры, которые раскрывают главные возможности продукта. Либо
                    напомните пользователю о том, что он забыл оформить заявку или подписаться на вас.
                </p>
                <hr/>
                <div className="row">
                    <div className="col-sm-6 col-md-4 mb-3 mb-sm-0">
                        <h6 className="f_11 fw_5 mb-3">
                            Приоритетное размещение – Баннер на главной странице (1920х440)
                        </h6>
                        <p>По вопросам размещения обращаться на почту</p>
                    </div>
                    <div className="col-sm-6 col-md-8">
                        <img
                            src="/images/banner-1.jpg"
                            alt="Приоритетное размещение"
                            className="img-fluid d-block mx-auto"
                        />
                    </div>
                </div>
                <hr/>
                <div className="row">
                    <div className="col-sm-6 col-md-4 mb-3 mb-sm-0">
                        <label className=" mb-3">
                            <input
                                ref={ref1}
                                type="radio"
                                name="adv"
                                className="f_11"
                                value={0}
                                onChange={(e) => {
                                    delete data?.image
                                    setData((prevState: any) => ({
                                        ...prevState,
                                        sum: prices[0][data.lifeAd == '1' ? 'priceThreeMonths' : 'priceSixMonths']
                                    }))
                                    onRadioHandler(e, setData, true)
                                }}
                            />
                            <h6 className="f_11 fw_5 ms-2 ms-xl-3 flex-1">Рекламный баннер (1200х400)</h6>
                        </label>
                        <div className="mb-3 mb-md-4">
                            Статус: <span className="l-gray">свободен</span>
                        </div>
                        <div className="fw_5">Стоимость размещения:</div>
                        <div>3 месяца – {FunctionForPrice(prices[0]['priceThreeMonths'])} ₽</div>
                        <div>6 месяцев – {FunctionForPrice(prices[0]['priceSixMonths'])} ₽ (скидка 10%)</div>
                        <div className="fw_5 mt-3 mt-sm-4 mt-md-5">Изображение</div>
                        <div className="f_09 l-gray mt-1">Размер баннера 1200*400</div>
                        <div className="file-upload mt-2">
                            <button className="btn_main btn_2 fw_4">Загрузить</button>
                            <input type="file" onClick={() => refClick(1)}
                                   onChange={(e) => onImageHandler(e, setData, 'image')}/>
                            {data?.adv === 0 && status === 'Фото загружено' &&
                                <Row className={'py-1'}>
                                    <img style={{objectFit: 'cover', aspectRatio: '3/1'}}
                                         src={adCoverViewer[0]?.info?.data_url} alt={'Баннер 250*160'}/>
                                </Row>
                            }
                            {data?.adv === 0 &&
                                <span style={{color: `${status !== 'Фото загружено' ? 'red' : ''}`}}>{status}</span>}
                        </div>
                    </div>
                    <div className="col-sm-6 col-md-8">
                        <img
                            src="/images/banner-2.jpg"
                            alt="Рекламный баннер  (1200х400)"
                            className="img-fluid d-block mx-auto"
                        />
                    </div>
                </div>
                <hr/>
                <div className="row">
                    <div className="col-sm-6 col-md-4 mb-3 mb-sm-0">
                        <label className=" mb-3">
                            <input
                                ref={ref2}
                                type="radio"
                                name="adv"
                                value={1}
                                className="f_11"
                                onChange={(e) => {
                                    delete data?.image
                                    refClick(2)
                                    setData((prevState: any) => ({
                                        ...prevState,
                                        sum: prices[1][data.lifeAd == '1' ? 'priceThreeMonths' : 'priceSixMonths']
                                    }))
                                    onRadioHandler(e, setData, true)
                                }}
                            />
                            <h6 className="f_11 fw_5 ms-2 ms-xl-3 flex-1">Рекламный баннер (250х160)</h6>
                        </label>
                        <div className="mb-3 mb-md-4">
                            Статус: <span className="l-gray">свободен</span>
                        </div>
                        <div className="fw_5">Стоимость размещения:</div>
                        <div>3 месяца – {FunctionForPrice(prices[1]['priceThreeMonths'])} ₽</div>
                        <div>6 месяцев – {FunctionForPrice(prices[1]['priceSixMonths'])} ₽ (скидка 10%)</div>
                        <div className="fw_5 mt-3 mt-sm-4 mt-md-5">Изображение</div>
                        <div className="f_09 l-gray mt-1">Размер баннера 250х160</div>
                        <div className="file-upload mt-2">
                            <button className="btn_main btn_2 fw_4">Загрузить</button>
                            <input
                                onClick={() => refClick(2)}
                                type="file"
                                onChange={(e) => {
                                    onImageHandler(e, setData, 'image')
                                }}
                            />
                            {data?.adv === 1 && status === 'Фото загружено' &&
                                <Row className={'py-1'}>
                                    <img style={{objectFit: 'cover', aspectRatio: '25/16'}}
                                         src={adCoverViewer[0]?.info?.data_url} alt={'Баннер 250*160'}/>
                                </Row>
                            }
                            {data?.adv === 1 &&
                                <span style={{color: `${status !== 'Фото загружено' ? 'red' : ''}`}}>{status}</span>}
                        </div>
                    </div>
                    <div className="col-sm-6 col-md-8">
                        <img
                            src="/images/banner-3.jpg"
                            alt="Рекламный баннер  (250х160)"
                            className="img-fluid d-block mx-auto"
                        />
                    </div>
                </div>
                <div className="row align-items-center mt-4 mt-md-5 g-sm-4">
                    <div className="col-sm-4 col-xxl-3 mb-2 mb-sm-0">
                        <div>Срок размещения</div>
                    </div>
                    <div className="col-sm-8 col-xxl-9 mb-3 mb-sm-0">
                        <select
                            defaultValue={1}
                            {...register('placedForMonths')}
                            onChange={(e) => {
                                setData((prevState: any) => ({
                                    ...prevState,
                                    lifeAd: e.target.value,
                                    sum: data.adv !== undefined ? (e.target.value === '3' && prices[data.adv]['priceThreeMonths']) || (e.target.value === '6' && prices[data.adv]['priceSixMonths']) : '0',
                                }))
                            }}
                        >
                            <option value={0} disabled hidden>
                                Срок размещения
                            </option>
                            <option value={3}>3 месяца</option>
                            <option value={6}>6 месяцев</option>
                        </select>
                    </div>

                    <div className="col-sm-4 col-xxl-3 mb-2 mb-sm-0">
                        <div>Ссылка при нажатии</div>
                    </div>
                    <div className="col-sm-8 col-xxl-9 mb-3 mb-sm-0">
                        <ValidateWrapper error={errors.link}>
                            <input type={'text'}
                                   placeholder={'Введите ссылку'}
                                   {...register('link', {
                                       required: 'Поле обязательно к заполнению',
                                       minLength: {
                                           value: 6,
                                           message: 'Минимум 6 символов',
                                       },
                                   })}
                            />
                        </ValidateWrapper>
                    </div>

                    {data?.adv == 1 &&
                        <>
                            <div className="col-sm-4 col-xxl-3 mb-2 mb-sm-0">
                                <div>Название объявления</div>
                            </div>
                            <div className="col-sm-8 col-xxl-9 mb-3 mb-sm-0">
                                <ValidateWrapper error={errors.description}>
                                    <input
                                        type={'text'}
                                        placeholder={'Введите название'}
                                        {...register('description', {
                                            required: 'Поле обязательно к заполнению',
                                            minLength: {
                                                value: 5,
                                                message: 'Минимум 5 символов',
                                            },
                                            maxLength: {
                                                value: 30,
                                                message: 'Максимум 30 символов',
                                            },
                                        })}
                                    />
                                </ValidateWrapper>
                            </div>
                        </>}
                    {/*<div className="col-sm-4 col-xxl-3 mb-2 mb-sm-0">*/}
                    {/*    <div>Сфера</div>*/}
                    {/*</div>*/}
                    {/*<div className="col-sm-8 col-xxl-9 mb-3 mb-sm-0">*/}
                    {/*    <ValidateWrapper error={errors?.adsTypeId}>*/}
                    {/*        <select*/}
                    {/*            {...register('adsTypeId', {*/}
                    {/*                required: 'Выберите значение!',*/}
                    {/*                onChange: (e) => setCurrentArea(e.target.value)*/}
                    {/*            })}*/}
                    {/*        >*/}
                    {/*            <option value={''} disabled>*/}
                    {/*                Сфера*/}
                    {/*            </option>*/}
                    {/*            {areas ? (*/}
                    {/*                areas.map((i) => (*/}
                    {/*                    <option key={i?.id} value={i?.id}>*/}
                    {/*                        {i?.name}*/}
                    {/*                    </option>*/}
                    {/*                ))*/}
                    {/*            ) : (*/}
                    {/*                <option disabled>Пусто</option>*/}
                    {/*            )}*/}
                    {/*        </select>*/}
                    {/*    </ValidateWrapper>*/}
                    {/*</div>*/}
                    {/*<div className="col-sm-4 col-xxl-3 mb-2 mb-sm-0">*/}
                    {/*    <div>Категория</div>*/}
                    {/*</div>*/}
                    {/*<div className="col-sm-8 col-xxl-9 mb-3 mb-sm-0">*/}
                    {/*    <ValidateWrapper error={errors?.subsectionId}>*/}
                    {/*        <select*/}
                    {/*            {...register('subsectionId', {*/}
                    {/*                required: 'Выберите значение!',*/}
                    {/*            })}*/}
                    {/*        >*/}
                    {/*            <option value={''} disabled>*/}
                    {/*                Категория*/}
                    {/*            </option>*/}
                    {/*            {subSections ? (*/}
                    {/*                subSections.map((i) => (*/}
                    {/*                    <option key={i?.id} value={i?.id}>*/}
                    {/*                        {i?.name}*/}
                    {/*                    </option>*/}
                    {/*                ))*/}
                    {/*            ) : (*/}
                    {/*                <option disabled>Пусто</option>*/}
                    {/*            )}*/}
                    {/*        </select>*/}
                    {/*    </ValidateWrapper>*/}
                    {/*</div>*/}

                    <div className="col-sm-4 col-xxl-3 mb-2 mb-sm-0">
                        <div className="f_12 fw_6">Сумма к оплате</div>
                    </div>
                    <div className="col-sm-8 col-md-4 col-xxl-3 mb-3 mb-sm-0">
                        <span className="f_12 fw_6">{
                            data.sum ?
                                promoData?.discountPrice ?
                                    FunctionForPrice(data.sum - promoData?.discountPrice)
                                    : FunctionForPrice(data.sum)
                                : 0} ₽</span>
                        {/*<span className="f_12 fw_6">{data.sum?FunctionForPrice(data.sum):0} ₽</span>*/}
                    </div>
                </div>
                <div className="row align-items-center mb-3 mb-sm-4 mt-3">
                    <div className="col-sm-4 col-xxl-3 mb-2 mb-sm-0">
                        <div>Способ оплаты:</div>
                    </div>
                    <div className="col-sm-8 col-md-4 col-xxl-3 mb-3 mb-sm-0">
                        <div>
                            <div className={"d-inline-block"}><input
                                name="payment-type"
                                defaultChecked={true}
                                onClick={() => setData((prevState: any) => ({
                                    ...prevState,
                                    paymentType: 'INTERNAL'
                                }))}
                                type="radio"
                            /></div>
                            <div className={"d-inline-block px-2 mb-2"}>Кошелёк сайта</div>
                        </div>
                        <div>
                            <div className={"d-inline-block"}><input
                                name="payment-type"
                                defaultChecked={false}
                                onClick={() => setData((prevState: any) => ({
                                    ...prevState,
                                    paymentType: 'card'
                                }))}
                                type="radio"
                            /></div>
                            <div className={"d-inline-block px-2"}>Банковской картой</div>
                        </div>

                    </div>
                </div>
                {
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
                }

                <button type="submit" className="btn_main btn_4 fw_4 mt-sm-5 py-1"
                        onClick={() => {
                            if (status !== 'Фото загружено') setError('image', {message: 'Загрузите фото'})
                            else clearErrors(["image"])
                        }}>
                    Создать и перейти к оплате
                </button>
            </div>}
        </form>
    )
}

export default AdvertisingSection
