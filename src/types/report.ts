export type IReport = {
    createdAt: string
    id: number
    isForOffersForUser: string
    isForUsersForUser: string
    name: string
    updatedAt: string
}

export type IUseStateReportType = {
    isLoaded: boolean
    error: string | null
    items: Array<IReport> | null
}

export type PayloadsReport = {
    description: string
    userId: number
    reportTypeId: string
    toId?: number
    offerId?: string
}
