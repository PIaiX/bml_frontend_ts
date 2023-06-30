import React, {FC, memo, useEffect, useState} from 'react'
import {Link, useLocation, useNavigate} from 'react-router-dom'
import {MdOutlineArrowBack} from 'react-icons/md'
import AdvPrice from './AdvPrice'
import {useImageViewer} from '../../hooks/imageViewer'
import functionForPrice from "../../helpers/FunctionForPrice";
import {IOPremium} from "../../models/offers";
import {getPremiumSlots, setPremiumSlot} from "../../services/offers";
import {useAppDispatch} from "../../hooks/store";
import {setBalance} from "../../store/reducers/userSlice";
import {showAlert} from "../../store/reducers/alertSlice";
import {getBalance} from "../../services/users";


interface propsType{
    setChange?:(s:any)=>void
    priceWithoutPremium?:number
    promo?:number
    setPayment?:(s:string)=>void
    text?:string
}
const Premium: FC<propsType> = ({setChange, priceWithoutPremium, setPayment, promo=0, text}) => {
    const loc: any = useLocation()
    const [data, setData] = useState<any>({littleBanner: null, sum: 0, placedForMonths: '1'})
    const lookBigPicture = useImageViewer(data?.bigBanner)
    const lookLittleBanner = useImageViewer(data?.littleBanner)
    const [idPost, setIdPost] = useState()
    const [banners, setBanners]=useState<Array<IOPremium>>()
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    useEffect(() => {
        setData((prevState: any) => ({...prevState, ...loc?.state?.data}))
    }, [loc])

    useEffect(()=>{
        getPremiumSlots()
            .then(res=>res &&setBanners(res))
            .catch(e=>console.log(e))
    }, [])

    const validLittlePhoto: any = (little: any) => {
        if (little?.width === undefined && little?.height === undefined) {
            return <span>Фото не загружено</span>
        } else if (little?.width === 250 && little?.height === 160) {
            return [<span key={1}>Фото загружено</span>, lookLittleBanner?.data_url]
        } else if (little?.width !== 250 && little?.height !== 160) {
            return <span>Размеры не подходят</span>
        } else return false
    }
    useEffect(()=>{
        setChange && setChange(data)
    }, [data])

    const validBigPhoto: any = (big: any) => {
        if (big?.width === undefined && big?.height === undefined) {
            return <span>Фото не загружено</span>
        } else if (big?.width === 1200 && big?.height === 280) {
            // eslint-disable-next-line react/jsx-key
            return [<span>Фото загружено</span>, lookBigPicture.data_url]
        } else if (big?.width !== 1200 && big?.height !== 280) {
            return <span>Размеры не подходят</span>
        } else return false
    }

    const currentId = (id: any) => {
        setIdPost((prevState) => prevState !== id && id)
    }

    const filterType = (statusPost: any, id: any) => {
        return statusPost && idPost === id
    }
    const [paymentType, setPaymentType] = useState('INTERNAL');
    const clickPay=()=>{
       setPremiumSlot({paymentMethod:paymentType, offerId:data?.id, slot:data?.slot, placedForMonths:data?.placedForMonths*3})
           .then(res=>{
               if(res){
                   getBalance().then(res=>{
                       dispatch(setBalance(res))
                       dispatch(showAlert({message: 'Оплата прошла успешно! Ждите одобрения модерации...', typeAlert: 'good'}))
                       setTimeout(() => {
                           navigate(-1)
                       }, 1000)
                   })
               }
               else
                   dispatch(showAlert({message: 'Оплата не прошла', typeAlert: 'bad'}))
           })
    }
    return (
        <>
            <Link to="/account" className="color-1 f_11 fw_5 d-flex align-items-center d-lg-none mb-3 mb-sm-4">
                <MdOutlineArrowBack />
                <span className="ms-2">Назад</span>
            </Link>
            {banners && <div>
                <h4>Премиальное размещение</h4>
                <h6 className="f_11 mb-3">Описание размещения баннеров и объявлений</h6>
                <p>
                    Задачей размещения баннеров и объявлений является привлечение пользователей, которые уже были на
                    вашем сайте. Часто вы можете встретить рекламу с фотографиями товара, который ранее видели. Но для
                    получения конверсий, используйте баннеры, которые раскрывают главные возможности продукта. Либо
                    напомните пользователю о том, что он забыл оформить заявку или подписаться на вас.
                </p>
                <div className="row g-2 g-sm-3 mb-4 mb-sm-5">
                    {banners.map((i, index) => (
                        <div
                            className={i.type==='big' ? 'col-12' : 'col-6 col-md-4 col-xxl-3'}
                            key={i.id}
                            onClick={() => {
                                currentId(i.id)
                                if(!i.isBlocked && idPost!==i.id && i.employedUntillForUser===undefined && i.type!=='big'  && !i.premiumFranchise){
                                    const newSum=data.placedForMonths==='1'?banners[i.id-1].priceThreeMonths:banners[i.id-1].priceSixMonths
                                    setData((prevState: any) => ({
                                        ...prevState,
                                        slot: prevState === i.id ? '' : i.id,
                                        sum:newSum
                                    }))
                                }
                                else {
                                    const { slot,...dat}=data;
                                    const da={...dat, sum:0}
                                    setData(da)
                                    }
                            }}
                        >
                            <AdvPrice {...{
                                ...i,
                                bigPicture: validBigPhoto(lookBigPicture)[1],
                                littlePicture:validLittlePhoto(lookLittleBanner)[1],
                                selected:filterType((i.type!=='big' && !i.isBlocked && i.employedUntillForUser!=='' && !i.premiumFranchise), i.id)
                            }} />

                        </div>
                    ))}

                </div>

                <div className="row align-items-center g-sm-4">

                    {data.sum!==0 &&
                        <>
                        <div className="col-sm-4 col-xxl-3 mb-2 mb-sm-0">
                        <div>Срок размещения</div>
                    </div>
                        <div className="col-sm-8 col-xxl-9 mb-3 mb-sm-0">
                            <select
                            defaultValue={data.placedForMonths}
                            name="placedForMonths"
                            onChange={(e) =>
                                setData((prevState: any) => ({
                                    ...prevState,
                                    placedForMonths: e.target.value,
                                    sum:
                                        data.slot?
                                            e.target.value==='1'?
                                                banners[data.slot-1].priceThreeMonths
                                                :banners[data.slot-1].priceSixMonths
                                        :0
                                }))
                            }
                        >
                            <option value={0} hidden disabled>
                                Срок размещения
                            </option>
                            <option value={1}>3 месяца – {functionForPrice(banners[data.slot-1].priceThreeMonths)} ₽{text}</option>
                            <option value={2}>6 месяцев – {functionForPrice(banners[data.slot-1].priceSixMonths)} ₽{text}</option>
                        </select>
                    </div></>}
                    <div className="col-sm-6 col-lg-4 mb-2 mb-sm-0">
                        <div className="f_12 fw_6">Сумма к оплате</div>
                    </div>
                    <div className="col-sm-6 col-lg-4 mb-3 mb-sm-2">
                        <span className="f_12 fw_6">{priceWithoutPremium?functionForPrice(priceWithoutPremium+data?.sum-promo):data?.sum?data?.sum:0} ₽</span>
                    </div>
                </div>
                <div className="row align-items-center mb-3 mb-sm-4">
                    <div className="col-sm-6 col-lg-4">
                        <div>Способ оплаты: </div>
                    </div>
                    <div className="col-sm-6 col-lg-4">
                        <div>
                            <div className={"d-inline-block"}><input
                                name="payment-type"
                                defaultChecked={true}
                                onClick={()=>setPayment && setPayment('INTERNAL') || setPaymentType('INTERNAL')}
                                type="radio"
                            /></div>
                            <div className={"d-inline-block px-2 mb-2"}>Кошелёк сайта</div>
                        </div>
                        <div>
                            <div className={"d-inline-block"}><input
                                name="payment-type"
                                defaultChecked={false}
                                onClick={()=>setPayment && setPayment('card') || setPaymentType('card')}
                                type="radio"
                            /></div>
                            <div className={"d-inline-block px-2"}>Банковской картой</div>
                        </div>
                    </div>
                </div>

                {!setChange &&
                    <button type="button" className="btn_main btn_4 fw_4 mt-sm-5" onClick={()=>data.sum!==0 && clickPay()}>
                        Создать и перейти к оплате
                    </button>}
            </div>}
        </>
    )
}

export default memo(Premium)
