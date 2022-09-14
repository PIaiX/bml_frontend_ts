import React, {useEffect, useState} from 'react';

export default function AdvPrice(props) {

    const getSelectedBannerPath = () => {
        if(props.selected && props.bigBanner && props.bigPicture){
            return props.bigPicture
        } else if (props.selected && props.littleBanner && props.littlePicture){
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
                    (props.status === 'zanato')
                        ? <div className='red mb-2 mb-sm-3'>Занято до {props.date}</div>
                        : <div className='mb-2 mb-sm-3'>Свободно</div>
                }
                <div className='fw_7'>Стоимость размещения:</div>
                <div className='fw_7'>3 месяца – {props.price3} рублей</div>
                <div className='fw_7'>6 месяцев — {props.price6} рублей</div>
            </div>
            {
                (props.status === 'blocked') &&
                <div className='blocked'>ЗАБЛОКИРОВАНО</div>
            }
        </div>
    );
}