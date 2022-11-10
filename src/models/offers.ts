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
