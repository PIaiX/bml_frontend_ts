import {$authApi} from './indexAuth'
import {apiRoutes} from '../config/api'
import {IFriendsBodyRequest} from '../models/friends'

export const createFriend = async (payloads: any) => {
    try {
        return await $authApi.post(`${apiRoutes.ACTIONS_FRIEND}`, payloads)
    } catch (error) {
        throw error
    }
}

export const deleteFriend = async (payload: any) => {
    try {
        return await $authApi.delete(`${apiRoutes.ACTIONS_FRIEND}`, payload)
    } catch (error) {
        throw error
    }
}

export const getRequestsFriends = async (
    currentUserId: number,
    page: number = 1,
    limit: number,
    orderBy: string = 'desc'
) => {
    try {
        const response = await $authApi.get<IFriendsBodyRequest>(
            `${apiRoutes.GET_REQUESTS_FRIENDS}/${currentUserId}?page=${page}&limit=${limit}&orderBy=${orderBy}`
        )
        return response?.data?.body
    } catch (error) {
        console.log(error)
    }
}

export const getCurrentFriends = async (id: number, page: number = 1, limit: number, orderBy: string = 'desc') => {
    try {
        const response = await $authApi.get<IFriendsBodyRequest>(
            `${apiRoutes.GET_CURRENT_FRIENDS}/${id}?page=${page}&limit=${limit}&orderBy=${orderBy}`
        )
        return response?.data?.body
    } catch (error) {
        console.log(error)
    }
}
