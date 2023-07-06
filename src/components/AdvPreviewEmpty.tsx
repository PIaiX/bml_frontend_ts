import React from 'react';
import {Link} from "react-router-dom";
import {checkPhotoPath} from "../helpers/photoLoader";
import FunctionForPrice from "../helpers/FunctionForPrice";
import BtnFav from "./utils/BtnFav";
// @ts-ignore
import {ReactComponent as OfferIcon} from "../assets/images/icons/off.svg";

const AdvPreviewEmpty = (props:any={}) => {
    return (
        <>
            <div style={{
                position: 'absolute',
                height: '100%',
                width: 'calc(100% - var(--bs-gutter-x))',
                backgroundColor: 'rgba(var(--color-1)/100%)'
            }}></div>
            <div className="preview-small">
                <img src={checkPhotoPath(undefined)} alt={'Пустое изображение'} />
                <div  className="text" style={{ cursor: "pointer" }} />
            </div>
        </>
    );
};

export default AdvPreviewEmpty;