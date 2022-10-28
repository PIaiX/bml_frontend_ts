export type INewsBodyRequest = {
    body: {
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
        }
        data?: [
            {
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
        ]
    }
}

export type IOneNewsBodyRequest<data> = {
    body: data
}
