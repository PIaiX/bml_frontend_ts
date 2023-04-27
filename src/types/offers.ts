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
    isArchived: boolean
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
    isVerified?:boolean,
    isPricePerMonthAbsolute:boolean | null
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
    isPricePerMonthAbsolute:boolean
    price: number
    pricePerMonth: number
    profitPerMonth: number
    profit: number
    branchCount: number
    soldBranchCount: number
    blockDescription: null
    user: IUser
    userId: number
    isFavorite: boolean
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
    video: string
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

export type IOfferForm = {
    about: string
    area: string | number
    image:string
    businessPlan: string
    category: string | number
    city: string
    cooperationTerms: string | number
    description: string
    investments: string | number
    paybackTime: string | number
    profitPerMonth: string | number
    projectStage: string | number
    subsectionId: string | number
    title: string
    aboutCompany: string
    benefits: string
    branchCount: string | number
    dateOfCreation: string
    price: string | number
    pricePerMonth: string | number
    soldBranchCount: string | number
    video: string
    profit: string | number
}
