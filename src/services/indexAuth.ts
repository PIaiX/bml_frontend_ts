import {apiRoutes, BASE_URL} from '../config/api'
import axios from 'axios'

const apiBody = {
    baseURL: BASE_URL,
    withCredentials: true,
    headers: {
        Accept: 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
    },
}

const $api = axios.create(apiBody)

const $authApi = axios.create(apiBody)

$api.interceptors.request.use((config: any) => {
    config.headers['User-Fingerprint'] = localStorage.getItem('fingerprint')
    return config
})

$authApi.interceptors.request.use((config: any) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    config.headers['User-Fingerprint'] = localStorage.getItem('fingerprint')
    return config
})

$authApi.interceptors.response.use(
    (config) => {
        return config
    },
    async (error) => {
        const originalRequest = error.config
        if (error.response.status === 401 && originalRequest && !originalRequest._isRetry) {
            originalRequest._isRetry = true
            try {
                const response = await $api.get(`${apiRoutes.REFRESH_TOKEN}`)
                localStorage.setItem('token', response?.data?.body?.token)
            } catch (e) {
                console.log('No auth')
            }
        }
        return Promise.reject(error)
    }
)

export {$api, $authApi}
