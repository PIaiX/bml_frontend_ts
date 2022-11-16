import {$authApi} from './indexAuth'
import {apiRoutes} from '../config/api'
import {Passwords} from '../components/forms/EditPasswordForm'

export const updatePasswordUser = async (userId: number, payloads: Passwords) => {
    try {
        return await $authApi.patch(`${apiRoutes.UPDATE_PASSWORD}/${userId}`, payloads)
    } catch (error) {
        throw error
    }
}

export const updateUserInfo = async (userId: number, payloads: any) => {
    try {
        return await $authApi.patch(`${apiRoutes.ACTIONS_USER}/${userId}`, payloads)
    } catch (error) {
        throw error
    }
}
