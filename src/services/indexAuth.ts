import {apiRoutes, BASE_URL} from '../config/api'
import axios from 'axios'

const apiBody = {
    baseURL: BASE_URL,
    withCredentials: true,
    headers: {
        Accept: 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        'User-Fingerprint': String(localStorage.getItem('fingerprint')),
    },
}

const $api = axios.create(apiBody)
const $authApi = axios.create(apiBody)

$api.interceptors.request.use((config: any) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    return config
})

$authApi.interceptors.request.use((config: any) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    return config
})

$authApi.interceptors.response.use(
    (config) => {
        return config
    },
    async (error) => {
        const originalRequest = error.config
        if (error.response.status === 400 && originalRequest && !originalRequest._isRetry) {
            originalRequest._isRetry = true
            try {
                const response = await $api.get(`${apiRoutes.REFRESH_TOKEN}`)
                localStorage.setItem('token', response?.data?.body?.token)
            } catch (e) {
                console.log('No auth')
            }
        }
    }
)

export {$api, $authApi}