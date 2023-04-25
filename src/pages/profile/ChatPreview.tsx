import React, { DetailedHTMLProps, Dispatch, FC, HTMLAttributes, MouseEventHandler, SetStateAction } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { MdDeleteForever } from 'react-icons/md'
import { IUser } from '../../types/user'
import { useAppSelector } from '../../hooks/store'
import {checkPhotoPath} from "../../helpers/photoLoader";

type Props = {
    userId: number
    offerId: number
    imgURL: string
    userName: string
    adURL: string
    title: string
    message?: string
    isViewed?: boolean
    converId: number
    getIdConver: (converId: number) => void
    lastMessUserId?: number
    newMessagesCount?: string
    topic:string | null
}

const ChatPreview: FC<Props> = (props) => {
    const user: IUser | null = useAppSelector((state) => state?.user?.user)
    return (
        <div className={`chat-preview ${props?.isViewed ? '' : 'new-message'}`}>
            <Link to={`/account/profile/user/${props.userId}`} className="user">
                <img src={checkPhotoPath(props.imgURL)} alt={props.userName} />
                <div>{props.userName}</div>
            </Link>
            <div className="info">
                {props.topic &&
                    <div className="color-1 mb-2">
                        Тема: <NavLink to={props.adURL}> {props.topic}</NavLink>
                    </div>
                }
            </div>
            <div className="text">
                <Link
                    to={`window/${props?.converId}`}
                    state={{ userName: props.userName, userId: props.userId, avatar: props.imgURL }}
                >
                    {props?.lastMessUserId === user?.id ? 'Вы: ' : 'Партнер: '}
                    {props.message}
                </Link>
            </div>
            <div className="unread-count-container">
                {props.newMessagesCount && parseInt(props.newMessagesCount) > 0 && <div className="unread-count">
                    {props.newMessagesCount}
                </div>}
            </div>
            <div className="btns">
                <button className="ml-2" onClick={() => props?.getIdConver && props?.getIdConver(props?.converId)}>
                    <MdDeleteForever className="f_15" />
                </button>
            </div>
        </div>
    )
}

export default ChatPreview
