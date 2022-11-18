import {$authApi} from './indexAuth'
import {apiRoutes} from '../config/api'
import {IOffersBodyRequest} from '../models/offers'

export const getFavorites = async (userId: number, page: number, limit: number) => {
    try {
        const response = await $authApi.get<IOffersBodyRequest>(
            `${apiRoutes.GET_FAVORITES_USER_OFFERS}/${userId}?page=${page}&limit=${limit}&orderBy=desc`
        )
        return response?.data?.body
    } catch (error) {
        console.log(error)
    }
}

export const createFavorite = async (payloads: {userId: number; offerId: number}) => {
    try {
        return await $authApi.post(`${apiRoutes.POST_CREATE_FAVORITE_OFFER}`, payloads)
    } catch (error) {
        throw error
    }
}

export const deleteWithFavorite = async (payloads: {userId: number; offerId: number}) => {
    try {
        return await $authApi.delete(`${apiRoutes.DELETE_FAVORITE_OFFER}`, {data: payloads})
    } catch (error) {
        throw error
    }
}
