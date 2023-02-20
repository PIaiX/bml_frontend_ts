import React, {FC, useEffect, useState} from 'react'
import {Link, useLocation} from 'react-router-dom'
import {MdOutlineArrowBack} from 'react-icons/md'
import AdvPrice from './AdvPrice'
import {useImageViewer} from '../../hooks/imageViewer'
import functionForPrice from "../../helpers/FunctionForPrice";
import {IOPremium} from "../../models/offers";
import {getPremiumSlots} from "../../services/offers";


interface propsType{
    setChange?:(s:any)=>void
    priceWithoutPremium?:number
}
const Premium: FC<propsType> = ({setChange, priceWithoutPremium}) => {
    const loc: any = useLocation()
    const [data, setData] = useState<any>({littleBanner: null, sum: 0, dateLifeAd: '1'})
    const lookBigPicture = useImageViewer(data?.bigBanner)
    const lookLittleBanner = useImageViewer(data?.littleBanner)
    const [idPost, setIdPost] = useState()
    const [banners, setBanners]=useState<Array<IOPremium>>()
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
        return !statusPost && idPost === id
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
                                if(!i.isBlocked && idPost!==i.id && i.employedUntillForUser==='' && i.type!=='big'){
                                    const newSum=data.dateLifeAd==='1'?banners[i.id-1].priceThreeMonths:banners[i.id-1].priceSixMonths
                                    setData((prevState: any) => ({
                                        ...prevState,
                                        placeInSite: prevState === i.id ? '' : i.id,
                                        sum:newSum
                                    }))
                                }
                                else {
                                    const { placeInSite,...dat}=data;
                                    const da={...dat, sum:0}
                                    setData(da)
                                    }
                            }}
                        >
                            <AdvPrice {...{
                                ...i,
                                bigPicture: validBigPhoto(lookBigPicture)[1],
                                littlePicture:validLittlePhoto(lookLittleBanner)[1],
                                selected:filterType((i.type==='big' || i.isBlocked || i.employedUntillForUser!==''), i.id)
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
                            defaultValue={data.dateLifeAd}
                            name="dateLifeAd"
                            onChange={(e) =>
                                setData((prevState: any) => ({
                                    ...prevState,
                                    dateLifeAd: e.target.value,
                                    sum:
                                        data.placeInSite?
                                            e.target.value==='1'?
                                                banners[data.placeInSite-1].priceThreeMonths
                                                :banners[data.placeInSite-1].priceSixMonths
                                        :0
                                }))
                            }
                        >
                            <option value={0} hidden disabled>
                                Срок размещения
                            </option>
                            <option value={1}>3 месяца – {functionForPrice(banners[data.placeInSite-1].priceThreeMonths)} ₽</option>
                            <option value={2}>6 месяцев – {functionForPrice(banners[data.placeInSite-1].priceSixMonths)} ₽</option>
                        </select>
                    </div></>}
                    <div className="col-sm-4 col-xxl-3 mb-2 mb-sm-0">
                        <div className="f_12 fw_6">Сумма к оплате</div>
                    </div>
                    <div className="col-sm-8 col-md-4 col-xxl-3 mb-3 mb-sm-0">
                        <span className="f_12 fw_6">{data?.sum!=0?functionForPrice(data?.sum+(priceWithoutPremium?priceWithoutPremium:0)):0} ₽</span>
                    </div>
                </div>
                {!setChange && <button type="button" className="btn_main btn_4 fw_4 mt-sm-5">
                    Создать и перейти к оплате
                </button>}
            </div>}
        </>
    )
}

export default Premium
