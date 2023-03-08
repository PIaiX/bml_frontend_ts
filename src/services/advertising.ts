import {$api, $authApi} from "./indexAuth";
import {apiRoutes} from "../config/api";

export const getAdvertisings =
    async (adsTypeId:number)=> {
    try {
        const response = await $api.post(`${apiRoutes.GET_ADVERTISING}?limit=2&adsTypeId=${adsTypeId}`)
        return response.data.body
    } catch (error) {
        console.log(error)
    }
}

export const getAdvertisingsPrices =
    async ()=> {
    try {
        const response = await $api.get(
            `${apiRoutes.GET_PRICES}`
        )
        return response.data.body
    } catch (error) {
        console.log(error)
    }
}

export const setNewAdvertisings =
    async (body:any)=> {
    try {
        const response = await $authApi.post(`${apiRoutes.SET_ADVERTISING}`, body)
        return response?.data?.body
    } catch (error) {
        console.log(error)
    }
}

