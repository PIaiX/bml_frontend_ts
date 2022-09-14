import React from 'react';
import { Link } from 'react-router-dom';

export default function AdCard(props) {
    return (
        <div className={"ad-preview "+props.className}>
            <div className="d-flex flex-column flex-sm-row align-items-stretch flex-1">
                <div className="img acc-box">
                    <img src={props.imgURL} alt={props.title}/>
                </div>
                <div className="text">
                    <div>
                        <div className="blue">{props.title}</div>
                        <div className="l-gray f_08 mt-2">{props.scope}</div>
                    </div>
                    {
                        (props.investments) &&
                        <div className="fw_5 f_09 mt-2">{props.investments}&nbsp;₽</div>
                    }
                    <div className="mt-2">Осталось: <span className="color-1 fw_5">30 дней - до 29 февраля</span></div>
                </div>
            </div>
            <div className='btns row gx-2 mt-3 mt-md-0'>
                <div className='col-6'><button className="btn_main btn_4 w-100 px-2 px-sm-3">Редактировать</button></div>
                <div className='col-6'>
                    {
                        (props.section === '1')
                        ?<button className="btn_main btn_3 w-100 px-1 px-sm-2 px-xl-3">Опубликовать</button>
                        :<button className="btn_main btn_3 w-100 px-1 px-sm-2 px-xl-3">Снять с публикации</button>
                    }
                </div>
                {
                    (props.type === '4') &&
                    <div className='col-12 mt-2'>
                        <Link to="/account/my-ads/premium" className="btn_main btn_5 w-100 px-2 px-sm-3">Premium-размещение</Link>
                    </div>
                }
            </div>
        </div>
    );
}