import {$api} from "./indexAuth";
import {apiRoutes} from "../config/api";

export const getAdvertisings =
    async (page:number, place:string)=> {
    try {
        const response = await $api.get<any>(
            `${apiRoutes.GET_ADVERTISING}`, {
                params:{
                    page,
                    limit:2,
                    place
                }
            }
        )
        return response.data.body
    } catch (error) {
        console.log(error)
    }
}

export const getAdvertisingsPrices =
    async ()=> {
    try {
        const response = await $api.get<any>(
            `${apiRoutes.GET_PRICES}`
        )
        return response.data.body
    } catch (error) {
        console.log(error)
    }
}

