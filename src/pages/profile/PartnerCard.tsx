import React, {FC, useEffect, useState} from 'react'
import {NavLink, useNavigate} from 'react-router-dom'
import {getIdChat} from "../../services/users";

interface Props {
    imgURL: string
    name: string
    agency: string
    type: number
    id: number
    deleteFriend?: (id: number) => void
    acceptFriend?: (id: number) => void,
    setIsShowMessageModal?:(value:boolean, id:string)=>void,
    AddPartner?:(id:string)=>void,
}

const PartnerCard: FC<Props> = ({imgURL, name, agency, type, id, deleteFriend, acceptFriend, setIsShowMessageModal, AddPartner}) => {
    const navigate=useNavigate()

    const clickChat = () => {
        getIdChat(id).then(res=>navigate( `/account/chat/window/${res?res.id:'new'}`, {state:{ userName: name, userId: id, avatar: imgURL}}))
    }

    return (
        <div className="friend-row">
            <NavLink to={`/account/profile/user/${id}`}>
            <div className="d-flex align-items-center flex-1">
                <img src={imgURL} alt={name} />
                <div className="flex-1 ps-sm-2">
                        <div className="f_11 color-1 mb-1">{name}</div>
                        <div className="f_08">{agency}</div>
                </div>
            </div>
            </NavLink>
            { !AddPartner? (type === 0 ? (

                <div className="f_08 fw_4 mt-2 mt-sm-0 d-flex">

                    <button className="btn_main btn_4 d-flex" onClick={()=>clickChat()}>
                        <span>Написать</span>
                        <span className="d-none d-md-inline ms-2">сообщение</span>
                    </button>
                    <button
                        type="button"
                        className="btn_main btn_3 d-flex ms-2"
                        onClick={() => deleteFriend && deleteFriend(id)}
                    >
                        <span>Удалить</span>
                    </button>
                </div>
            ) : type === 1 ? (
                <div className="f_08 fw_4 mt-2 mt-sm-0 d-flex">
                    <button
                        className="btn_main btn_4 d-flex"
                        onClick={() => acceptFriend && acceptFriend(id)}
                    >
                        <span>Принять</span>
                        <span className="d-none d-md-inline ms-2">заявку</span>
                    </button>
                    <button
                        type="button"
                        className="btn_main btn_3 d-flex ms-2"
                        onClick={() => deleteFriend && deleteFriend(id)}
                    >
                        Отклонить
                    </button>
                </div>
            ) : (
                <div className="f_08 fw_4 mt-2 mt-sm-0 d-flex">
                    <button
                        type="button"
                        className="btn_main btn_3 d-flex"
                        onClick={() => deleteFriend && deleteFriend(id)}
                    >
                        Отменить
                    </button>
                </div>
            )
            ):(
                <div className="f_08 fw_4 mt-2 mt-sm-0 d-flex">
                    <button
                        type="button"
                        className="btn_main btn_4 d-flex ms-2"
                        onClick={()=>{
                            AddPartner && AddPartner(id.toString())
                        }}
                    >
                        <span>Добавить</span>
                    </button>
                </div>

            )

            }
        </div>
    )
}

export default PartnerCard
