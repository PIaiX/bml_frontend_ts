import {$authApi} from "./indexAuth";
import {apiRoutes} from "../config/api";

export const GetPromo = async (payload: string) => {
    try {
        const result = await $authApi.get(`${apiRoutes.GET_PROMOCODE}/${payload}`)
        return result?.data
    } catch (error) {
        throw error
    }
}