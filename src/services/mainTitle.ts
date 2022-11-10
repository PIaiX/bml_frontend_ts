import {$api} from './indexAuth'
import {apiRoutes} from '../config/api'
import {IMainTitleBodyRequest} from '../models/mainTitle'

export const getMainTitle = async () => {
    try {
        const response = await $api.get<IMainTitleBodyRequest>(`${apiRoutes.GET_MAIN_TITLE}`)
        return response?.data?.body
    } catch (error) {
        throw error
    }
}
