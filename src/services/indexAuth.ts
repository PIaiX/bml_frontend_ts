import {apiRoutes, BASE_URL} from '../config/api'
import axios from 'axios'

const apiBody = {
    baseURL: BASE_URL,
    withCredentials: true,
    headers: {
        Accept: 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        'User-Agent': 'business-my-life',
        'User-Fingerprint': String(localStorage.getItem('fingerprint')),
    },
}

const $api = axios.create(apiBody)
const $authApi = axios.create(apiBody)

$authApi.interceptors.request.use(async (config: any) => {
    const token = await localStorage.getItem('token')

    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    } else {
        console.log('No token!')
    }
    return config
})

$authApi.interceptors.response.use(
    async (config) => {
        return config
    },
    async (error) => {
        const userId = localStorage.getItem('userId')

        const originalRequest = error.config
        if (error?.response?.status === 401 && originalRequest && !originalRequest._isRetry) {
            try {
                const token = await $api.post(`${URL}${apiRoutes?.AUTH_REFRESH}/${userId}`)

                if (!token) {
                    return
                } else {
                    await localStorage.setItem('token', `Bearer ${token}`)
                }

                return $authApi.request(originalRequest)
            } catch (e) {
                console.log('Unauthorized')
            }
        }
        throw error
    }
)

export {$api, $authApi}
