import { $api, $authApi } from './indexAuth'
import { apiRoutes } from '../config/api'

export const subscribe = async (payloads: any) => {
    try {
        await $authApi.post(`${apiRoutes.ACTIONS_SUBSCRIBE}`, payloads)
    } catch (error) {
        throw error
    }
}