import React from 'react';
import {IOPremium} from "../../models/offers";

const AdvPrice = (props:IOPremium) => {

    const getSelectedBannerPath = () => {
        if (props.selected && props.type === 'big' && props.bigPicture) {
            return props.bigPicture
        } else if (props.selected && props.type === 'small' && props.littlePicture) {
            return props.littlePicture
        } else {
            return '/images/photo-replacer.jpg'
        }
    }

    return (
        <div
            className={(props.selected) ? 'ad-price picked' : 'ad-price'}
        >
            <img src={getSelectedBannerPath()} alt="Заставка" className='for-ad-blocks'/>
            <div className='text'>
                <h6 className='mt-1 mb-2'>{props.title}</h6>
                {
                    (props.isBlocked)
                        ? <div className='red mb-2 mb-sm-3'>Занято до {props.employedUntill}</div>
                        : <div className='mb-2 mb-sm-3'>Свободно</div>
                }
                <div className='fw_7'>Стоимость размещения:</div>
                <div className='fw_7'>3 месяца – {props.priceThreeMonths} рублей</div>
                <div className='fw_7'>6 месяцев — {props.priceSixMonths} рублей</div>
            </div>
            {
                (props.type === "big") &&
                <div className='blocked'>ЗАБЛОКИРОВАНО</div>
            }
        </div>
    );
}


export default AdvPrice;