import React, {BaseSyntheticEvent, SyntheticEvent, useEffect, useRef, useState} from 'react'
import {Link, useLocation, useNavigate, useOutletContext, useParams} from 'react-router-dom'
import {
    emitCreateMessage,
    emitCreateWithoutTopicMessage,
    emitPaginateMessages,
    emitViewedMessage
} from '../../services/sockets/messages'
import ChatMessage from '../../components/chatMessage'
import {MdOutlineKeyboardArrowLeft} from 'react-icons/md'
import Loader from '../../components/utils/Loader'
import {IPayloadsMessage} from '../../types/sockets/messages'
import {useAppSelector} from '../../hooks/store'
import {IUser} from '../../types/user'
import {convertLocaleDate} from '../../helpers/convertLocaleDate'
import useSocketConnect from '../../hooks/socketConnect'
import {socketInstance} from '../../services/sockets/socketInstance'
import {emitGetConversation} from '../../services/sockets/conversations'
import {useForm} from 'react-hook-form'
import ValidateWrapper from '../../components/utils/ValidateWrapper'
import {IUseStateItems} from '../../types'
import {IMessageItem, IMessageMeta} from '../../models/sockets/messages'
import InfiniteScroll from 'react-infinite-scroller'
import {checkPhotoPath} from "../../helpers/photoLoader";
import {getIdChat} from "../../services/users";

const ChatWindow = () => {
    const user:IUser | null= useAppSelector((state) => state?.user.user)
    const {state} = useLocation()
    const navigate=useNavigate()
    const {
        register,
        formState: {errors},
        handleSubmit,
    } = useForm<IPayloadsMessage>({
        mode: 'onSubmit',
        reValidateMode: 'onChange',
        defaultValues: {
            text: '',
            fromId: user?.id,
        },
    })

    const createMessage = ({text}:any) => {
        if (state && state.userId) {
            emitCreateWithoutTopicMessage(state.userId, {
                text: text,
                conversationId: 0,
            }).then((res) => {
                navigate(`/account/chat/window/${res.body.conversationId}`)
            })
        }
    }

    return (
        <div className="acc-box p-0 chat-window">
            <div className="top py-1 px-2 px-sm-4">
                <Link to="/account/chat" className="d-flex align-items-center l-gray">
                    <MdOutlineKeyboardArrowLeft className="f_15" />
                    <span className="d-none d-md-block ms-2">Назад</span>
                </Link>
                <div className="text-center">
                    <div className="fw_5">{state?.userName}</div>
                </div>
                <Link to={`/account/profile/user/${state?.userId}`} className="user">
                    <img src={checkPhotoPath(state?.avatar)} alt={state?.userName} />
                </Link>
            </div>
            <div className="middle p-2 p-sm-4 flex-column-reverse" id="chatBody">
            </div>
            <div className="bottom p-2 px-sm-4 py-sm-3">
                <form onSubmit={handleSubmit(createMessage)}>
                    <ValidateWrapper error={errors.text}>
                        <input
                            placeholder="Напишите сообщение..."
                            {...register('text', {
                                required: 'Минимум 1 знак',
                            })}
                        />
                    </ValidateWrapper>
                    <button type="submit" className="btn_main btn_4 mt-3 ms-auto me-0">
                        Отправить
                    </button>
                </form>
            </div>
        </div>
    )
}

export default ChatWindow
