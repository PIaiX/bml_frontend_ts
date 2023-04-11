export type IPartnersItem = {
    id: number
    isTitleLink: boolean
    title: string
    media: string
    mediaType: boolean
    link:string
    createdAt: string
    updatedAt: string
    isVisibleForUser: string
}

export type IPartnersMeta = {
    total: number
    perPage: number
    currentPage: number
    lastPage: number
    firstPage: number
    firstPageUrl: string
    lastPageUrl: string
    nextPageUrl: string
    previousPageUrl: string
}

export type ITutorialsItem = {
    id: number
    isEmbed: boolean
    isTitleLink: boolean
    link:string
    title: string
    media: string
    createdAt: string
    updatedAt: string
}

export type ITutorialsMeta = {
    total: number
    perPage: number
    currentPage: number
    lastPage: number
    firstPage: number
    firstPageUrl: string
    lastPageUrl: string
    nextPageUrl: string
    previousPageUrl: string
}
