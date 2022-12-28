import React, {FC} from 'react'
import {Link} from 'react-router-dom'
import BtnFav from './utils/BtnFav'
import {checkPhotoPath} from '../helpers/photoLoader'
// @ts-ignore
import {ReactComponent as OfferIcon} from '../assets/images/icons/off.svg'

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
    return (
        <div className="preview-small">
            <img src={checkPhotoPath(props?.image)} alt={props.title} />
            <div className="text">
                <div className="layer1">
                    <h6>
                        <Link to={`/adv-page/${props.id}`}>{props.title}</Link>
                    </h6>
                </div>
                <div className="layer2">
                    <div className="white d-flex align-items-center d-lg-block">
                        <div className="f_08 me-1 me-sm-3">Инвестиции от</div>
                        <div>{props.investments} руб</div>
                    </div>
                    <div className="d-flex align-items-center">
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
