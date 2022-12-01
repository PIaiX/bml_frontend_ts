import {BASE_URL_SOCKET} from '../../config/api'
import {io, Socket} from 'socket.io-client'

export let socketInstance: Socket

export const setSocketConnection = (userId: number) => {
    socketInstance = io(`${BASE_URL_SOCKET}`, {query: {userId}})
}
