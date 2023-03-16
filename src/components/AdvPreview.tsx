import React, { FC } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import BtnFav from './utils/BtnFav'
import { checkPhotoPath } from '../helpers/photoLoader'
// @ts-ignore
import { ReactComponent as OfferIcon } from '../assets/images/icons/off.svg'
import FunctionForPrice from '../helpers/FunctionForPrice'

interface Props {
    image?: string
    title?: string
    summ?: string
    favorite?: boolean
    url?: string
    id?: number
    investments?: number
    callbackClick?: () => void
    price?:number | undefined
    isPricePerMonthAbsolute?:boolean | null
}


const AdvPreview: FC<Props> = (props) => {
    const stopPropagation = (e: any) => {
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
    }
    return (
        <>
            <div style={{
                position: 'absolute',
                height: '100%',
                width: 'calc(100% - var(--bs-gutter-x))',
                backgroundColor: 'rgba(var(--color-1)/100%)'
            }}></div>
            <Link to={`/adv-page/${props.id}`} className="preview-small">
                <img src={checkPhotoPath(props?.image)} alt={props.title} />
                <div  className="text" style={{ cursor: "pointer" }}>
                    <div className="layer1">
                        <h6>{props.title}
                        </h6>
                    </div>
                    <div className="layer2">
                        <div className="white d-flex flex-wrap align-items-center d-lg-block">
                            <div className="f_08 me-1 me-sm-3">{props.price?'Стоимость бизнеса':'Инвестиции от'}</div>
                            <div>
                                {FunctionForPrice(props.price?props.price:props.investments)}
                                {props.isPricePerMonthAbsolute===undefined || props.isPricePerMonthAbsolute?' руб':' %'}
                            </div>
                        </div>
                        <div className="d-flex align-items-center" onClick={(event) => { stopPropagation(event) }}>

                            <BtnFav
                                check={props.favorite}
                                className={'f_20 mr-2 ms-2'}
                                offerId={props?.id}
                                callbackClick={props?.callbackClick}
                            />
                            <div className="d-none d-lg-block btn_main btn_2 p-0 ms-2">
                                <OfferIcon />
                            </div>
                        </div>
                    </div>
                </div>

            </Link>
        </>
    )
}

export default AdvPreview
