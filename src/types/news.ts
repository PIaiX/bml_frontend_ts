export type INewsUseState = {
    items?: Array<INewsItems> | null
    meta?: {
        total: number
        perPage: number
        currentPage: number
        lastPage: number
        firstPage: number
        firstPageUrl: string
        lastPageUrl: string
        nextPageUrl: string
        previousPageUrl: string
    } | null
}

export type INewsItems = {
    id: number
    slug: string
    title: string
    description: string
    viewsCount: number
    suptitle: string
    image: string
    readingTimeFrom: number
    readingTimeTo: number
    createdAt: string
    updatedAt: string
}

export type IOneNews = {
    id?: number
    slug?: string
    title?: string
    description?: string
    viewsCount?: number
    suptitle?: string
    image?: string
    readingTimeFrom?: number
    readingTimeTo?: number
    createdAt?: string
    updatedAt?: string
}
