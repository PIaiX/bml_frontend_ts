export type IMessageItem = {
    conversationId: number
    createdAt: string
    id: number
    isViewed: boolean
    text: string
    updatedAt: string
    userId: number
}

export type IMessageMeta = {
    currentPage: number
    firstPage: number
    firstPageUrl: string
    lastPage: number
    lastPageUrl: string
    nextPageUrl: string
    perPage: number
    previousPageUrl: string
    total: number
}

export type IMessagesBodyRequest = {
    body: {
        data: Array<IMessageItem>
        meta: IMessageMeta
    }
}

export type ICreateMessagesBodyResponse = {
    body: IMessageItem
    code: string
    message: string
    status: number
}
