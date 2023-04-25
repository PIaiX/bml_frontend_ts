import {$api, $authApi} from './indexAuth'
import {apiRoutes} from '../config/api'

export const paginateUsers = async () => {
    try {
        const response = await $authApi.get(`${apiRoutes.ACTIONS_USER}`)
        return response?.data?.body
    } catch (error) {
        console.log(error)
    }
}

export const getUserInfo = async (userId: number, myId: number | string = '') => {
    try {
        const response = await $api.get(`${apiRoutes.ACTIONS_USER}/${userId}/${myId}`)
        return response?.data?.body
    } catch (error) {
        console.log(error)
    }
}

export const getIdChat = async (userId: number) => {
    try {
        const response = await $authApi.get(`${apiRoutes.GET_ID_CHAT}`, {
            params:{
                userId
            }
        })
        return response?.data?.body
    } catch (error) {
        console.log(error)
    }
}

export const getBalance = async () => {
    try {
        const response = await $authApi.get(`${apiRoutes.GET_BALANCE}`)
        return response?.data?.body
    } catch (error) {
        console.log(error)
    }
}