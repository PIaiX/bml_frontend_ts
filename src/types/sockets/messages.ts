export type IPayloadsMessage = {
    conversationId?: string | null
    text: string | null
    fromId?: number
    userId?: number
    offerId?: string
    topic?:string
}
