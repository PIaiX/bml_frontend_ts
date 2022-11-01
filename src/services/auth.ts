import axios from 'axios'
import {apiRoutes, BASE_URL} from '../config/api'
import {IRegister} from '../models/auth'
import {$api, $authApi} from './indexAuth'

export const registration = async (payloads: any, type: number | string) => {
    try {
        const response = await $api.post<IRegister>(`${apiRoutes.REGISTER}`, {...payloads, type})
        return response?.data?.body
    } catch (error) {
        throw error
    }
}

export const confirmEmail = async (email: string) => {
    try {
        const response = await axios.post(`${BASE_URL}${apiRoutes.REGISTER_EMAIL_VERIFY}`, {email})
        return response
    } catch (error: any) {
        throw error?.response?.data?.errors?.errors
    }
}

export const login = async (data: any) => {
    try {
        const response = await $api.post(`${apiRoutes.LOGIN}`, data)
        return response?.data?.body
    } catch (error) {
        throw error
    }
}

export const logout = async () => {
    try {
        const response = await $authApi.delete(`${apiRoutes.LOGOUT}`)
        return response?.data
    } catch (error) {
        throw error
    }
}

export const resetPassword = async (email: string) => {
    try {
        const response = await $api.post(`${apiRoutes.FORGOT_PASSWORD_EMAIL_VERIFY}`, {email})
        return response
    } catch (error) {
        console.log(error)
    }
}
