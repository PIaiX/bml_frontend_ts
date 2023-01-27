import { $api, $authApi } from './indexAuth'
import { apiRoutes } from '../config/api'
import {
    IOfferBodyRequest,
    IOffersAreaBodyRequest,
    IOffersBodyRequest,
    IOffersSubSectionsBodyRequest,
} from '../models/offers'
import { IPayloadsFilter } from '../types/offers'

export const getAllAreas = async () => {
    try {
        const response = await $api.get<IOffersAreaBodyRequest>(`${apiRoutes.GET_ALL_AREAS}`)
        return response?.data?.body
    } catch (error) {
        console.log(error)
    }
}

export const getAllSubsections = async (areaId: number) => {
    try {
        const response = await $api.get<IOffersSubSectionsBodyRequest>(`${apiRoutes.GET_ALL_SUBSECTIONS}/${areaId}`)
        return response?.data?.body
    } catch (error) {
        console.log(error)
    }
}

export const getOffers = async (
    page: number = 1,
    limit: number = 2,
    categoryId: number,
    userId: number | null,
    payloads: IPayloadsFilter,
    random: boolean
) => {
    try {
        const response = await $api.get<IOffersBodyRequest>(
            `${apiRoutes.GET_OFFER_PAGINATE}${userId ? `/${userId}` : ''}?page=${page}&limit=${limit}${payloads.city ? `&city=${payloads.city}` : ''
            }${payloads.areaId ? `&areaId=${payloads.areaId}` : ''}&category=${categoryId}${payloads.subsectionId ? `&subsectionId=${payloads.subsectionId}` : ''
            }${payloads.orderBy ? `&orderBy=${payloads.orderBy}` : ''}${payloads.query ? `&query=${payloads.query}` : ''
            }${payloads.investmentsFrom ? `&investmentsFrom=${payloads.investmentsFrom}` : ''}${payloads.investmentsTo ? `&investmentsTo=${payloads.investmentsTo}` : ''
            }${payloads.projectStage ? `&projectStage=${payloads.projectStage}` : ''}${payloads.paybackTime ? `&paybackTime=${payloads.paybackTime}` : ''
            }${payloads.priceFrom ? `&priceFrom=${payloads.priceFrom}` : ''}${payloads.priceTo ? `&priceTo=${payloads.priceTo}` : ''
            }${payloads.profitFrom ? `&profitFrom=${payloads.profitFrom}` : ''}${payloads.profitTo ? `&profitTo=${payloads.profitTo}` : ''
            }${payloads.profitPerMonthFrom ? `&profitPerMonthFrom=${payloads.profitPerMonthFrom}` : ''}${payloads.profitPerMonthTo ? `&profitPerMonthTo=${payloads.profitPerMonthTo}` : ''
            }${random ? `&random=${random}` : ''}`
        )
        return response?.data?.body
    } catch (error) {
        throw error
    }
}

export const getOneOffer = async (id: string, userId: number | string = '') => {
    try {
        const response = await $api.get<IOfferBodyRequest>(`${apiRoutes.ACTIONS_OFFER}/${id}/${userId}`)
        return response?.data?.body
    } catch (error) {
        console.log(error)
    }
}

export const getUsersOffersNotArchive = async (
    userId: number,
    page: number = 1,
    limit: number,
    orderBy: string = 'desc',
    category?: number
) => {
    try {
        const response = await $api.get<IOffersBodyRequest>(
            `${apiRoutes.GET_NOT_ARCHIVED_USERS_OFFERS}/${userId}?page=${page}&limit=${limit}&orderBy=${orderBy}${category || category === 0 ? `&category=${category}` : ''
            }`
        )
        return response?.data?.body
    } catch (error) {
        console.log(error)
    }
}

export const getUsersOffersArchive = async (
    userId: number,
    page: number = 1,
    limit: number,
    orderBy: string = 'desc',
    category?: number
) => {
    try {
        const response = await $api.get<IOffersBodyRequest>(
            `${apiRoutes.GET_ARCHIVED_USERS_OFFERS}/${userId}?page=${page}&limit=${limit}&orderBy=${orderBy}${category || category === 0 ? `&category=${category}` : ''
            }`
        )
        return response?.data?.body
    } catch (error) {
        console.log(error)
    }
}

export const createOffer = async (payloads: any) => {
    try {
        await $authApi.post(`${apiRoutes.ACTIONS_OFFER}`, payloads)
    } catch (error) {
        throw error
    }
}

export const updateOffer = async (offerId: undefined | string, payloads: any) => {
    try {
        const response = await $authApi.patch(`${apiRoutes.ACTIONS_OFFER}/${offerId}`, payloads)
    } catch (error) {
        console.log(error)
    }
}

export const addInArchive = async (id: number | null) => {
    try {
        const response = await $authApi.patch(`${apiRoutes.PATCH_ARCHIVE_OFFER}/${id}`)
    } catch (error) {
        console.log(error)
    }
}

export const deleteWithArchive = async (id: number | null) => {
    try {
        return await $authApi.delete(`${apiRoutes.DELETE_ARCHIVE_OFFER}/${id}`)
    } catch (error) {
        throw error
    }
}

export const deleteImageOffer = async (imageId: number) => {
    try {
        const response = await $authApi.delete(`${apiRoutes?.DELETE_OFFER_IMAGE}/${imageId}`)
    } catch (error) {
        throw error
    }
}
