import React from 'react';
import { Link } from 'react-router-dom';
import { MdDoubleArrow } from "react-icons/md";
import BtnFav from './utils/BtnFav';

interface Props {
    imgURL: string,
    title: string,
    summ: string,
    favorite?: boolean,
    url?: string

}

const AdvPreview: React.FC<Props> = (props) => {
    return (
        <div className="preview-small">
            <img src={props.imgURL} alt={props.title}/>
            <div className='text'>
                <div className="layer1">
                    <h6><Link to='/adv-page'>{props.title}</Link></h6>
                </div>
                <div className="layer2">
                    <div className="white d-flex align-items-center d-lg-block">
                        <div className="f_08 me-1 me-sm-3">Инвестиции от</div>
                        <div>{props.summ} руб</div>
                    </div>
                    <div className='d-flex align-items-center'>
                        <BtnFav check={props.favorite || false} className={'f_20 mr-2 ms-2'}/>
                        <Link to='/adv-page' className="d-none d-lg-block btn_main btn_2 p-0 ms-2">
                            <MdDoubleArrow className='d-flex'/>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdvPreview