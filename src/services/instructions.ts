import {$authApi} from './indexAuth'
import {apiRoutes} from '../config/api'
import {IPartnersBodyRequest, ITutorialsBodyRequest} from '../models/instrictions'

export const getTutorials = async (page: number, limit: number) => {
    try {
        const response = await $authApi.get<ITutorialsBodyRequest>(
            `${apiRoutes.GET_TUTORIALS}?page=${page}&limit=${limit}&orderBy=desc`
        )
        return response?.data?.body?.data
    } catch (error) {
        console.log(error)
    }
}

export const getPartners = async (page: number, limit: number) => {
    try {
        const response = await $authApi.get<IPartnersBodyRequest>(
            `${apiRoutes.GET_PARTNERS}?page=${page}&limit=${limit}&orderBy=desc`
        )
        return response?.data?.body?.data
    } catch (error) {
        console.log(error)
    }
}
