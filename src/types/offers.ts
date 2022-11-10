import {IUser} from './user'

export type IOffersAreaItem = {
    id: number
    name: string
    createdAt: string
    updatedAt: string
    createdAtForUser: string
}

export type IOffersSubSectionsItem = {
    id: number
    name: string
    createdAt: string
    updatedAt: string
    area: {
        id: number
        name: string
        createdAt: string
        updatedAt: string
        createdAtForUser: string
    }
}

export type IOffersItem = {
    id: number
    isArchived: true
    viewsCount: number
    slug: string
    title: string
    description: string
    city: string
    category: number
    image: string
    cooperationTerms: string
    businessPlan: string
    benefits: string
    about: string
    aboutCompany: string
    paybackTime: number
    projectStage: number
    investments: number
    dateOfCreation: string
    price: number
    pricePerMonth: number
    profitPerMonth: number
    profit: number
    branchCount: number
    soldBranchCount: number
    blockDescription: string
    userId: number
    subsectionId: number
    createdAt: string
    updatedAt: string
    isFavorite: boolean
    subsection: {
        id: number
        name: string
        createdAt: string
        updatedAt: string
        area: {
            id: number
            name: string
            createdAt: string
            updatedAt: string
            createdAtForUser: string
        }
    }
    isArchivedForUser: string
    categoryForUser: string
    paybackTimeForUser: string
    projectStageForUser: string
    createdAtForUser: string
    archiveExpire: string
}

export type IOffersMeta = {
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

export type IPayloadsFilter = {
    city?: string
    areaId?: string
    subsectionId?: string
    orderBy?: string
    query?: string
    investmentsFrom?: number | null
    investmentsTo?: number | null
    projectStage?: string
    paybackTime?: string
    priceFrom?: number | null
    priceTo?: number | null
    profitFrom?: number | null
    profitTo?: number | null
    profitPerMonthFrom?: number | null
    profitPerMonthTo?: number | null
}

export type IOfferItem = {
    id: number
    isArchived: false
    viewsCount: number
    slug: string
    title: string
    description: string
    city: string
    category: number
    image: string
    cooperationTerms: string
    businessPlan: string
    benefits: string
    about: string
    aboutCompany: string
    paybackTime: number
    projectStage: number
    investments: number
    dateOfCreation: string
    price: number
    pricePerMonth: number
    profitPerMonth: number
    profit: number
    branchCount: number
    soldBranchCount: number
    blockDescription: null
    user: IUser
    userId: number
    subsection: {
        area: {
            createdAt: string
            createdAtForUser: string
            id: number
            name: string
            updatedAt: string
        }
        areaId: number
        createdAt: string
        createdAtForUser: string
        id: number
        name: string
        updatedAt: string
    }
    subsectionId: number
    createdAt: string
    updatedAt: string
    images: [
        {
            id: number
            image: string
            offerId: number
            createdAt: string
            updatedAt: string
        }
    ]
    isArchivedForUser: string
    isBannedForUser: string
    isVerifiedForUser: string
    categoryForUser: string
    paybackTimeForUser: string
    projectStageForUser: string
    createdAtForUser: string
    archiveExpire: string
}
