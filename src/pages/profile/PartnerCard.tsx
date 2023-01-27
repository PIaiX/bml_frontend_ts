import React, {FC} from 'react'
import {NavLink} from 'react-router-dom'

interface Props {
    imgURL: string
    name: string
    agency: string
    type: number
    id: number
    deleteFriend?: (id: number) => void
    acceptFriend?: (id: number) => void,
    setIsShowMessageModal?:(value:boolean, id:string)=>void
}

const PartnerCard: FC<Props> = (props) => {
    return (
        <div className="friend-row">
            <NavLink to={`/account/profile/user/${props?.id}`}>
            <div className="d-flex align-items-center flex-1">
                <img src={props.imgURL} alt={props.name} />
                <div className="flex-1 ps-sm-2">
                        <div className="f_11 color-1 mb-1">{props.name}</div>
                        <div className="f_08">{props.agency}</div>
                </div>
            </div>
            </NavLink>
            {props.type === 0 ? (
                <div className="f_08 fw_4 mt-2 mt-sm-0 d-flex">
                    <button className="btn_main btn_4 d-flex" onClick={()=>{
                        props?.setIsShowMessageModal
                        && props.setIsShowMessageModal(true, props.id.toString())

                    }}>
                        <span>Написать</span>
                        <span className="d-none d-md-inline ms-2">сообщение</span>
                    </button>
                    <button
                        type="button"
                        className="btn_main btn_3 d-flex ms-2"
                        onClick={() => props?.deleteFriend && props?.deleteFriend(props?.id)}
                    >
                        <span>Удалить</span>
                    </button>
                </div>
            ) : props.type === 1 ? (
                <div className="f_08 fw_4 mt-2 mt-sm-0 d-flex">
                    <button
                        className="btn_main btn_4 d-flex"
                        onClick={() => props?.acceptFriend && props?.acceptFriend(props?.id)}
                    >
                        <span>Принять</span>
                        <span className="d-none d-md-inline ms-2">заявку</span>
                    </button>
                    <button
                        type="button"
                        className="btn_main btn_3 d-flex ms-2"
                        onClick={() => props?.deleteFriend && props?.deleteFriend(props?.id)}
                    >
                        Отклонить
                    </button>
                </div>
            ) : (
                <div className="f_08 fw_4 mt-2 mt-sm-0 d-flex">
                    <button
                        type="button"
                        className="btn_main btn_3 d-flex"
                        onClick={() => props?.deleteFriend && props?.deleteFriend(props?.id)}
                    >
                        Отменить
                    </button>
                </div>
            )}
        </div>
    )
}

export default PartnerCard
