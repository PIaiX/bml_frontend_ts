import {socketInstance} from './socketInstance'
import {IConversationsBodyRequest} from '../../models/sockets/conversations'

export const emitPaginateConversation = async (payloads: {page: number; limit: number; orderBy?: string}) => {
    return await new Promise<IConversationsBodyRequest>((resolve, reject) => {
        socketInstance?.emit('conversation:paginate', payloads, (response: IConversationsBodyRequest) => {
            try {
                resolve(response)
            } catch (e) {
                reject(e)
            }
        })
    })
}

export const emitGetConversation = async (conversationId: string) => {
    return await new Promise((resolve, reject) => {
        socketInstance?.emit('conversation:get', conversationId, (response: any) => {
            try {
                resolve(response?.body)
            } catch (e) {
                reject(e)
            }
        })
    })
}

export const emitCloseConversation = async (conversationId: string) => {
    return await new Promise((resolve, reject) => {
        socketInstance?.emit('conversation:close', conversationId, (response: any) => {
            try {
                resolve(response?.body)
            } catch (e) {
                reject(e)
            }
        })
    })
}

export const emitDeleteConversation = async (conversationId: number) => {
    return await new Promise((resolve, reject) => {
        socketInstance?.emit('conversation:delete', conversationId, (response: any) => {
            try {
                resolve(response?.body)
            } catch (e) {
                reject(e)
            }
        })
    })
}
