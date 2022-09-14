import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import { MdOutlineArrowBack } from "react-icons/md";
import PartnerCard from './PartnerCard';
import { BsPersonPlus } from "react-icons/bs";

export default function Partners() {
    const [tab, setTab] = useState(0);

    return (
        <>
            <Link to="/account/profile" className='color-1 f_11 fw_5 d-flex align-items-center d-lg-none mb-3 mb-sm-4'><MdOutlineArrowBack /> <span className='ms-2'>Назад</span></Link>
            <div className="acc-box">
                <div className="d-flex flex-column-reverse flex-md-row justify-content-between align-items-center mb-3 mb-md-4">
                    <div className='d-flex align-items-center mt-3 mt-sm-0'>
                        <button type='button' className={(tab===0) ? '' : 'l-gray'} onClick={()=>setTab(0)}>
                            <span>Бизнес партнёры</span>
                            <span className="l-gray ms-2">5</span>
                        </button>
                        <button type='button' className={(tab===1) ? 'ms-4' : 'l-gray ms-4'} onClick={()=>setTab(1)}>
                            <span>Заявки</span>
                            <span className="requests-count ms-2">5</span>
                        </button>
                        <button type='button' className={(tab===2) ? 'ms-4' : 'l-gray ms-4'} onClick={()=>setTab(2)}>
                            <span>Ваши заявки</span>
                            <span className="ms-2">5</span>
                        </button>
                    </div>
                    <form action="" className="form_search mb-3 mb-md-0">
                        <input type="search" placeholder="Поиск"/>
                        <button type="button" className="blue px-2">Отменить</button>
                    </form>
                </div>
                
                {
                    (tab === 0)
                    ? <div className='py-5 text-center'>
                        <BsPersonPlus className='f_50 l-gray'/>
                        <div className='f_13 fw_5 mt-3'>Находите бизнес-партнёров</div>
                        <div className='l-gray mt-3'>Здесь будут отображаться люди,<br/> которых Вы добавите в бизнес-партнёры</div>
                    </div>
                    : <div class="mt-4 mt-xl-5">
                        <PartnerCard type={tab} imgURL={'/images/photo.png'} name={'Саша Петров'} agency={'Компания/деятельность'} />
                        <PartnerCard type={tab} imgURL={'/images/photo.png'} name={'Саша Петров'} agency={'Компания/деятельность'} />
                        <PartnerCard type={tab} imgURL={'/images/photo.png'} name={'Саша Петров'} agency={'Компания/деятельность'} />
                        <PartnerCard type={tab} imgURL={'/images/photo.png'} name={'Саша Петров'} agency={'Компания/деятельность'} />
                        <PartnerCard type={tab} imgURL={'/images/photo.png'} name={'Саша Петров'} agency={'Компания/деятельность'} />
                    </div>
                }
            </div>
        </>
    );
}