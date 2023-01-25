import { IOfferItem } from '../../types/offers'
import { IUser } from '../../types/user'

export type IConversationsItem = {
    createdAt: string
    fromId: number
    id: number
    lastMessage: {
        conversationId: number
        createdAt: string
        id: number
        isViewed: boolean
        text: string
        updatedAt: string
        userId: number
    } | null
    offer: IOfferItem
    offerId: number
    toId: number
    updatedAt: string
    user: IUser
    isNew: boolean
    newMessagesCount: string
}

export type IConversationsMeta = {
    currentPage: number
    firstPage: number
    firstPageUrl: string
    lastPage: number
    lastPageUrl: string
    nextPageUrl: string
    perPage: number
    previousPageUrl: string | null
    total: number
}

export type IConversationsBodyRequest = {
    body: {
        data: Array<IConversationsItem>
        meta: IConversationsMeta
    }
}
