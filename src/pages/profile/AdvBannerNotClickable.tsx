import React from 'react';
import {checkPhotoPath} from "../../helpers/photoLoader";

const AdvBannerNotClickable = () => {
    return (
        <div className={'col-12'}>
            <div className={'ad-price'}>
                <img src={checkPhotoPath(undefined)} alt="Заставка" className='for-ad-blocks'/>
                <div className='text'></div>
                <div className='blocked'>ЗАБЛОКИРОВАНО</div>
            </div>
        </div>
    );
};

export default AdvBannerNotClickable;