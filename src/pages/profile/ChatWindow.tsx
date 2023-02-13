import React, {BaseSyntheticEvent, SyntheticEvent, useEffect, useRef, useState} from 'react'
import {Link, useLocation, useOutletContext, useParams} from 'react-router-dom'
import {emitCreateMessage, emitPaginateMessages, emitViewedMessage} from '../../services/sockets/messages'
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

const ChatWindow = () => {
    const user: IUser | null = useAppSelector((state) => state?.user?.user)
    const {isConnected} = useSocketConnect()
    const {id} = useParams()
    const {state, pathname} = useLocation()
    const [messages, setMessages] = useState<IUseStateItems<IMessageItem, IMessageMeta>>({
        isLoaded: false,
        items: [],
        meta: null,
    })
    const {
        register,
        formState: {errors},
        handleSubmit,
        reset,
    } = useForm<IPayloadsMessage>({
        mode: 'onSubmit',
        reValidateMode: 'onChange',
        defaultValues: {
            conversationId: id,
            text: '',
            fromId: user?.id,
        },
    })
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [isFetching, setIsFetching] = useState<boolean>(true)

    const [info, setInfo] = useOutletContext<any>()

    useEffect(() => {
        if (id && pathname) {
            setInfo({
                id: id,
                pathname: pathname,
            })
        }
    }, [id, pathname])

    useEffect(() => {
        id && emitGetConversation(id)
    }, [id])

    useEffect(() => {
        if (isConnected && socketInstance) {
            socketInstance?.on('message:create', (newMessage) => {
                newMessage &&
                    setMessages((prevState) => ({
                        ...prevState,
                        items: prevState.items ? [...prevState.items, newMessage] : [newMessage],
                    }))
            })
            id && user?.id && emitViewedMessage(id, user?.id)
            socketInstance?.on('message:viewed', () => {
                setMessages((prevState) => ({
                    ...prevState,
                    items: prevState.items && prevState.items.map((i: any) => ({...i, isViewed: true})),
                }))
            })
        }
        return () => {
            socketInstance?.removeAllListeners()
        }
    }, [])

    const groupBy = (arr: Array<IMessageItem> | null | undefined, key: string | number) => {
        const initialValue = {}
        return arr?.reduce((acc: any, cval: any) => {
            const myAttribute = cval[key] && convertLocaleDate(cval[key])
            acc[myAttribute] = [...(acc[myAttribute] || []), cval]
            return acc
        }, initialValue)
    }

    const createMessage = (payload: IPayloadsMessage) => {
        emitCreateMessage(payload)
            .then((res) => {
                res &&
                    setMessages((prevState) => ({
                        ...prevState,
                        items: prevState.items ? [...prevState.items, res.body] : [res.body],
                    }))
                reset()
            })
            .catch((e) => console.log(e))
    }

    const getMessages = () => {
        if (id) {
            emitPaginateMessages(+id, {page: currentPage, limit: 10, orderBy: 'desc'})
                .then((res) => {
                    res &&
                        messages.items &&
                        setMessages({
                            isLoaded: true,
                            items: [...res.body.data.reverse(), ...messages.items],
                            meta: res?.body?.meta,
                        })
                    setCurrentPage(currentPage + 1)
                })
                .catch(() => setMessages({isLoaded: true, items: null, meta: null}))
                .finally(() => setIsFetching(false))
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
                <InfiniteScroll
                    loadMore={getMessages}
                    isReverse={true}
                    hasMore={messages?.items && messages.meta ? messages.meta.total > messages.items.length : true}
                    threshold={100}
                    useWindow={false}
                >
                    {Object.entries(groupBy(messages?.items, 'createdAt')).map((key: any, index) => (
                        <ChatMessage key={key} keyArr={key[0]} arr={key[1]} avatarUser={state?.avatar} />
                    ))}
                </InfiniteScroll>
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
