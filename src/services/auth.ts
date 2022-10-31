import axios from 'axios'
import {apiRoutes, BASE_URL} from '../config/api'
import {IRegister} from '../models/auth'

export const registration = async (payloads: any, type: number | string) => {
    try {
        const response = await axios.post<IRegister>(
            `${BASE_URL}${apiRoutes.REGISTER}`,
            {...payloads, type},
            {
                withCredentials: true,
                headers: {
                    'User-Fingerprint': String(localStorage.getItem('fingerprint')),
                },
            }
        )
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
