import React, { useCallback, useEffect, useState } from 'react'
import ChatPreview from './ChatPreview'

import { Link } from 'react-router-dom'
import { MdOutlineArrowBack } from 'react-icons/md'
import {
    emitDeleteConversation,
    emitGetConversation,
    emitPaginateConversation,
} from '../../services/sockets/conversations'
import { IPagination, IUseStateItems } from '../../types'
import { IConversationsItem, IConversationsMeta } from '../../models/sockets/conversations'

import useSocketConnect from '../../hooks/socketConnect'
import usePagination from '../../hooks/pagination'
import Pagination from '../../components/utils/Pagination'
import { checkPhotoPath } from '../../helpers/photoLoader'
import Loader from '../../components/utils/Loader'

import { socketInstance } from '../../services/sockets/socketInstance'
import { useAppDispatch, useAppSelector } from '../../hooks/store'
import { showAlert } from '../../store/reducers/alertSlice'
import { IUser } from '../../types/user'
import AccountMenu from './AccountMenu'

export default function Chat() {
    const { isConnected } = useSocketConnect()
    const user: IUser | null = useAppSelector((state) => state?.user?.user)

    const generalLimit = 6
    const [conversations, setConversations] = useState<IUseStateItems<IConversationsItem, IConversationsMeta>>({
        isLoaded: false,
        items: null,
        meta: null,
    })
    const dispatch = useAppDispatch()

    const {
        paginationItems,
        pageCount,
        selectedPage,
        setSelectedPage,
        handlePageClick,
    }: IPagination<IConversationsItem> = usePagination(conversations?.items, generalLimit, conversations?.meta?.total)
    const [conversationId, setConversationId] = useState<number | null>(null)
    const [isFetching, setIsFetching] = useState<boolean>(true)

    useEffect(() => {
        if (isConnected && socketInstance) {
            socketInstance?.on('conversation:update', onConversationUpdate)
        }

        return () => {
            socketInstance?.off('conversation:update', onConversationUpdate)
        }
    }, [conversations])

    useEffect(() => {
        isFetching &&

            setTimeout(() => {
                emitPaginateConversation({ page: selectedPage + 1, limit: generalLimit, orderBy: 'desc' })
                    .then(
                        (res) =>
                            res && setConversations({ isLoaded: true, items: res?.body?.data, meta: res?.body?.meta })
                    )
                    .catch(() => setConversations({ isLoaded: true, items: null, meta: null }))
                    .finally(() => setIsFetching(false))
            }, 500)
    }, [isFetching])

    const getIdConversation = useCallback((converId: number) => {
        setConversationId(converId)
    }, [])

    const onConversationUpdate = (conversation: IConversationsItem) => {
        let newConversation =
            conversations?.items && conversations?.items?.find((item) => item?.id === conversation?.id)

        const filteredConversations: any =
            conversations?.items && conversations?.items?.filter((item) => item?.id !== conversation?.id)

        if (conversation?.lastMessage && newConversation) {
            newConversation.lastMessage = conversation?.lastMessage
            newConversation.isNew = true
        }

        if (newConversation) {
            setConversations((prev) => ({
                ...prev,
                items: [...filteredConversations, newConversation],
            }))
            setIsFetching(true)
        }
    }

    useEffect(() => {
        if (conversationId) {
            emitDeleteConversation(conversationId)
                .then(() => {
                    emitPaginateConversation({ page: selectedPage + 1, limit: generalLimit, orderBy: 'desc' })
                        .then(
                            (res) =>
                                res && setConversations({ isLoaded: true, items: res?.body?.data, meta: res?.body?.meta })
                        )
                        .catch(() => setConversations({ isLoaded: true, items: null, meta: null }))
                    dispatch(showAlert({ message: 'Беседа успешно удалена', typeAlert: 'good' }))
                })
                .catch(() => {
                    dispatch(showAlert({ message: 'Произошла ошибка', typeAlert: 'bad' }))
                })
        }
    }, [conversationId])

    if (!user) return <AccountMenu />

    return (
        <>
            <Link to="/account" className="color-1 f_11 fw_5 d-flex align-items-center d-lg-none mb-3 mb-sm-4">
                <MdOutlineArrowBack /> <span className="ms-2">Назад</span>
            </Link>
            <div className="acc-box p-0">
                {conversations.isLoaded ? (
                    paginationItems?.length > 0 ? (
                        paginationItems?.map((i) => {
                            return (
                                <ChatPreview
                                    getIdConver={getIdConversation}
                                    converId={i.id}
                                    userId={i?.user?.id}
                                    offerId={i?.offerId}
                                    lastMessUserId={i?.lastMessage?.userId}
                                    key={i?.id}
                                    imgURL={checkPhotoPath(i.user?.avatar)}
                                    userName={i?.user?.fullName}
                                    title={i?.offer?.title}
                                    adURL={`/adv-page/${i?.offerId}`}
                                    message={i.lastMessage?.text}
                                    isViewed={i?.lastMessage?.isViewed}
                                    newMessagesCount={i?.newMessagesCount}
                                />
                            )
                        })
                    ) : (
                        <h6 className="w-100 p-5 text-center">Ничего нет</h6>
                    )
                ) : (
                    <div className="p-5 w-100 d-flex justify-content-center">
                        <Loader color="#343434" />
                    </div>
                )}


                <div className="p-4">
                    {paginationItems?.length > 0 ? (
                        <div className="acc-box p-0 mt-3 d-flex justify-content-center">
                            <Pagination
                                nextLabel="❯"
                                onPageChange={handlePageClick}
                                pageRangeDisplayed={3}
                                marginPagesDisplayed={1}
                                pageCount={pageCount}
                                previousLabel="❮"
                                forcePage={selectedPage}
                            />
                        </div>
                    ) : (
                        ''
                    )}
                </div>
            </div>
        </>
    )
}
