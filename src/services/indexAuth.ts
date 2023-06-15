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
        if (error.response.status === 403 && originalRequest && !originalRequest._isRetry) {
            originalRequest._isRetry = true
            console.log(localStorage.getItem('token'))
            try {
                const response = await $api.get(`${apiRoutes.REFRESH_TOKEN}`)
                await localStorage.setItem('token', response?.data?.body?.token)
                return $authApi.request(error.config);
            } catch (e) {
                console.log('No auth')
            }
        }
        else{
            // запрос на сервер
        }
        return Promise.reject(error)
    }
)

export {$api, $authApi}
