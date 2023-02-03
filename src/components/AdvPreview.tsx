import React, {FC} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import BtnFav from './utils/BtnFav'
import {checkPhotoPath} from '../helpers/photoLoader'
// @ts-ignore
import {ReactComponent as OfferIcon} from '../assets/images/icons/off.svg'
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
}


const AdvPreview: FC<Props> = (props) => {
    const stopPropagation=(e:any)=>{
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
    }
    const navigate=useNavigate();
    return (
        <div className="preview-small">
            <img src={checkPhotoPath(props?.image)} alt={props.title} onClick={()=>navigate(`/adv-page/${props.id}`)} />
            <div className="text" style={{cursor:"pointer"}}>
                <div className="layer1">
                    <h6>
                        <Link to={`/adv-page/${props.id}`}>{props.title}</Link>
                    </h6>
                </div>
                <div className="layer2" onClick={()=>navigate(`/adv-page/${props.id}`)}>
                    <div className="white d-flex align-items-center d-lg-block">

                        <div className="f_08 me-1 me-sm-3">Инвестиции от</div>
                        <div>{FunctionForPrice(props.investments)} руб

                        </div>
                    </div>
                    <div className="d-flex align-items-center" onClick={(event)=>{stopPropagation(event)}}>

                        <BtnFav
                            check={props.favorite}
                            className={'f_20 mr-2 ms-2'}
                            offerId={props?.id}
                            callbackClick={props?.callbackClick}
                        />
                        <Link to={`/adv-page/${props.id}`} className="d-none d-lg-block btn_main btn_2 p-0 ms-2">
                            <OfferIcon />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdvPreview
