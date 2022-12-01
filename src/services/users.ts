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
