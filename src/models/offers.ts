import {IOfferItem, IOffersAreaItem, IOffersItem, IOffersMeta, IOffersSubSectionsItem} from '../types/offers'

export type IOffersAreaBodyRequest = {
    body: Array<IOffersAreaItem>
}

export type IOffersSubSectionsBodyRequest = {
    body: Array<IOffersSubSectionsItem>
}

export type IOffersBodyRequest = {
    body: {
        data: Array<IOffersItem>
        meta: IOffersMeta
    }
    status?: number
}

export type IOfferBodyRequest = {
    body: IOfferItem
}

export type IOPremium={
    id:number
    title:string
    type:"small" | "big"
    image?:"string" | null
    franchiseId?:number | null
    employedUntill:string
    isBlocked:boolean
    priceThreeMonths:number
    priceSixMonths:number
    selected?:boolean
    littlePicture?:string
    bigPicture?:string
}
