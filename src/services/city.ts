import axios from 'axios'

type City = {
    body: Array<string>
}

export const getCity = async () => {
    try {
        const response = await axios.post<City>(`${process.env.REACT_APP_CITYES}`)
        return response?.data?.body
    } catch (error) {
        console.log(error)
    }
}
