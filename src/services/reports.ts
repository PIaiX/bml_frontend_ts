import {$api, $authApi} from './indexAuth'
import {apiRoutes} from '../config/api'
import {ReportsTypeBodyRequest} from '../models/reports'
import {PayloadsReport} from '../types/report'

export const getUserReportType = async () => {
    try {
        const response = await $authApi.get<ReportsTypeBodyRequest>(`${apiRoutes.GET_USER_REPORT_TYPE}`)
        return response?.data?.body
    } catch (error) {
        console.log(error)
    }
}

export const getOfferReportType = async () => {
    try {
        const response = await $authApi.get<ReportsTypeBodyRequest>(`${apiRoutes.GET_OFFER_REPORT_TYPE}`)
        return response?.data?.body
    } catch (error) {
        throw error
    }
}

export const getAdvReportType = async () => {
    try {
        const response = await $authApi.get<ReportsTypeBodyRequest>(`${apiRoutes.GET_ADS_REPORT_TYPE}`)
        return response?.data?.body
    } catch (error) {
        throw error
    }
}

export const createReport = async (payloads: PayloadsReport | any) => {
    try {
        const response = await $authApi.post(`${apiRoutes.REPORT}`, payloads)
        return response
    } catch (error) {
        throw error
    }
}
