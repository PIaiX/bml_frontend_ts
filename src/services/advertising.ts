import {$api} from "./indexAuth";
import {apiRoutes} from "../config/api";

export const getAdvertisings =
    async ()=> {
    try {
        const response = await $api.get<any>(
            `${apiRoutes.GET_ADVERTISING}`
        )
        return response?.data?.body
    } catch (error) {
        console.log(error)
    }
}