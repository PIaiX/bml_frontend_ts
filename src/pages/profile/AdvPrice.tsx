import React, {memo} from 'react';
import {IOPremium} from "../../models/offers";
import {checkPhotoPath} from "../../helpers/photoLoader";

const AdvPrice = (props:IOPremium) => {
    const lastDate = props.premiumFranchise?.timeBeforeArchive
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
            <img
                src={(props.premiumFranchise && !props.premiumFranchise.canOutbid) ? checkPhotoPath(props.premiumFranchise.offer.image) : getSelectedBannerPath()}
                alt="Заставка" className='for-ad-blocks'/>
            <div className='text'>
                <h6 className='mt-1 mb-2 overflow-hidden' style={{textOverflow:'ellipsis', whiteSpace:'nowrap'}}>{(props.premiumFranchise && !props.premiumFranchise.canOutbid)? props.premiumFranchise.offer.title : props.title}</h6>
                {
                    (props?.premiumFranchise?.canOutbid==false)
                        ? <div className='red mb-2 mb-sm-3'>Занято{lastDate?.slice(lastDate?.indexOf('-')+1)}</div>
                        : <div className='mb-2 mb-sm-3'>Свободно</div>
                }
                <div className='fw_7'>Стоимость размещения:</div>
                <div className='fw_7'>3 месяца – {props.priceThreeMonths} рублей</div>
                <div className='fw_7'>6 месяцев — {props.priceSixMonths} рублей</div>
            </div>
            {
                (props.type === "big" || props.isBlocked) &&
                <div className='blocked'>ЗАБЛОКИРОВАНО</div>
            }
        </div>
    );
}


export default memo(AdvPrice);