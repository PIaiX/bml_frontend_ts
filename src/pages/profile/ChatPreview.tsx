import React from 'react';
import { Link } from 'react-router-dom';
import { MdDeleteForever } from "react-icons/md";

export default function ChatPreview(props) {
    return (
        <div class="chat-preview">
            <Link to="/account/profile/view" class="user">
                <img src={props.imgURL} alt={props.userName}/>
                <div>{props.userName}</div>
            </Link>
            <div class="info">
                <div class="color-1 mb-2">{props.title}</div>
                <div class="gray"><Link to={props.adURL}>ссылка на объявление</Link></div>
            </div>
            <div class="text"><Link to="window">{props.message}</Link></div>
            <div class="btns">
                <button class="ml-2">
                    <MdDeleteForever className='f_15'/>
                </button>
            </div>
        </div>
    );
}