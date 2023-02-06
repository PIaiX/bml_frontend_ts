import {$api} from "./indexAuth";
import {apiRoutes} from "../config/api";

export const getAdvertising =
    async ()=> {
    try {
        const response = await $api.get<any>(
            `${apiRoutes.GET_3_ADVERTISING}`
        )
        return response?.data?.body
    } catch (error) {
        console.log(error)
    }
}