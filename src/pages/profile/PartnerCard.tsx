import React from 'react';

const PartnerCard = (props:any) => {
    return (
        <div className="friend-row">
            <div className="d-flex align-items-center flex-1">
                <img src={props.imgURL} alt={props.name}/>
                <div className="flex-1 ps-sm-2">
                    <div className="f_11 color-1 mb-1">{props.name}</div>
                    <div className="f_08">{props.agency}</div>
                </div>
            </div>
            {
                (props.type === 0)
                ? <div className="f_08 fw_4 mt-2 mt-sm-0 d-flex">
                    <button className="btn_main btn_4 d-flex">
                        <span>Написать</span>
                        <span className='d-none d-md-inline ms-2'>сообщение</span>
                    </button>
                    <button type="button" className="btn_main btn_3 d-flex ms-2">
                        <span>Удалить</span>
                        <span className='d-none d-md-inline ms-2'>профиль</span>
                    </button>
                </div>
                : (props.type === 1)
                ? <div className="f_08 fw_4 mt-2 mt-sm-0 d-flex">
                    <button className="btn_main btn_4 d-flex">
                        <span>Принять</span>
                        <span className='d-none d-md-inline ms-2'>заявку</span>
                    </button>
                    <button type="button" className="btn_main btn_3 d-flex ms-2">
                        Отклонить
                    </button>
                </div>
                : <div className="f_08 fw_4 mt-2 mt-sm-0 d-flex">
                    <button type="button" className="btn_main btn_3 d-flex">
                        Отменить
                    </button>
                </div>
            } 
            
        </div>
    );
}

export default PartnerCard