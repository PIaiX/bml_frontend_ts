import axios from 'axios';

const getImages = async (limit = 100, start = 0) => {
    try {
        const response = await axios.get(`https://jsonplaceholder.typicode.com/photos?_start=${start}&_limit=${limit}`)
        return response.data
    } catch (error) {
        console.log(error)
    }
}

const getImage = async (photoId: string) => {
    try {
        const response = await axios.get(`https://jsonplaceholder.typicode.com/photos/${photoId ? photoId : ''}`)
        return response.data
    } catch (error) {
        console.log(error)
    }
}

const getUnsplashImages = async (page = 1, limit = 15) => {
    try {
        const response = await axios.get(`https://api.unsplash.com/photos/?client_id=r6HfdKhLLVDzkSV06O1laCrAzPxEoLVHvB61Fa21Npw&page=${page}&per_page=${limit}`)
        return response.data
    } catch (error) {
        console.log(error)
    }
}

export { getImage, getImages, getUnsplashImages }