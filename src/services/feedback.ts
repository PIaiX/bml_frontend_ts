import axios from 'axios'
import {apiRoutes, BASE_URL} from '../config/api'
import {IFeedBackForm} from '../types/feedback'

export const sendFeedBack = async (payloads: IFeedBackForm) => {
    try {
        await axios.post(`${BASE_URL}${apiRoutes.SEND_FEEDBACK}`, payloads)
    } catch (error) {
        console.log(error)
        throw error
    }
}
