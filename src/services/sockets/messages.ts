import {socketInstance} from './socketInstance'
import {ICreateMessagesBodyResponse, IMessagesBodyRequest} from '../../models/sockets/messages'
import {IPayloadsMessage} from '../../types/sockets/messages'

type PayloadItems = {
    page: number
    limit: number
    orderBy?: 'desc'
}

export const emitCreateMessage = async (payloads: IPayloadsMessage) => {
    return await new Promise<ICreateMessagesBodyResponse>((resolve, reject) => {
        socketInstance?.emit('message:create', payloads, (response: ICreateMessagesBodyResponse) => {
            try {
                resolve(response)
            } catch (e) {
                reject(e)
            }
        })
    })
}

export const emitCreateWithoutTopicMessage = async (toUserId: string, payloads: any) => {
    return await new Promise<any>((resolve, reject) => {
        socketInstance?.emit(
            'message:createWithoutTopic',
            toUserId,
            payloads,
            (response: ICreateMessagesBodyResponse) => {
                try {
                    resolve(response)
                } catch (e) {
                    reject(e)
                }
            }
        )
    })
}

export const emitCreateWithOfferTopicMessage = async (toUserId: number, payloads: any) => {
    return await new Promise<any>((resolve, reject) => {
        socketInstance?.emit(
            'message:createWithOfferTopic',
            toUserId,
            payloads,
            (response: ICreateMessagesBodyResponse) => {
                try {
                    resolve(response)
                } catch (e) {
                    reject(e)
                }
            }
        )
    })
}

export const emitViewedMessage = async (conversationId: string, userId: number) => {
    return await new Promise((resolve, reject) => {
        socketInstance?.emit('message:viewed', conversationId, userId, (response: any) => {
            try {
                resolve(response)
            } catch (e) {
                reject(e)
            }
        })
    })
}

export const emitPaginateMessages = async (conversationId: number, payloads: PayloadItems) => {
    return await new Promise<IMessagesBodyRequest>((resolve, reject) => {
        socketInstance?.emit('message:paginate', conversationId, payloads, (response: IMessagesBodyRequest) => {
            try {
                resolve(response)
            } catch (e) {
                reject(e)
            }
        })
    })
}
