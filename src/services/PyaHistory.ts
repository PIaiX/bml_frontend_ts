import {apiRoutes} from '../config/api'
import {$authApi} from './indexAuth'

export const getPayHistory = async (
    page: number = 1,
    limit: number = 2,
) => {
    try {
        const response = await $authApi.get(`${apiRoutes.GET_PAY_HISTORY}`, {params:{page, limit}})
        return response?.data
    } catch (error) {
        console.log(error)
    }
}
