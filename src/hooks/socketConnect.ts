import {socketInstance} from '../services/sockets/socketInstance'
import {useEffect, useState} from 'react'

const useSocketConnect = () => {
    const [isConnected, setIsConnected] = useState<boolean>(true)

    useEffect(() => {
        socketInstance?.on('connect', () => {
            setIsConnected(true)
        })
        socketInstance?.on('disconnect', () => {
            setIsConnected(false)
        })
        return () => {
            socketInstance?.off('connect')
            socketInstance?.off('disconnect')
        }
    }, [])
    return {isConnected}
}

export default useSocketConnect
