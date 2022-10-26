import React from 'react';
import { Link } from 'react-router-dom';
import { MdDeleteForever } from "react-icons/md";

const ChatPreview = (props:any) => {
    return (
        <div className="chat-preview">
            <Link to="/account/profile/view" className="user">
                <img src={props.imgURL} alt={props.userName}/>
                <div>{props.userName}</div>
            </Link>
            <div className="info">
                <div className="color-1 mb-2">{props.title}</div>
                <div className="gray"><Link to={props.adURL}>ссылка на объявление</Link></div>
            </div>
            <div className="text"><Link to="window">{props.message}</Link></div>
            <div className="btns">
                <button className="ml-2">
                    <MdDeleteForever className='f_15'/>
                </button>
            </div>
        </div>
    );
}

export default ChatPreview;