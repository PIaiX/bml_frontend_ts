import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    cities: ['Москва', 'Казань', 'Анапа', 'Харьков', 'Владимир', 'Чечня', 'Ереван', 'Boston', 'Meria'],
}

export const citySlice = createSlice({
    name: 'cities',
    initialState,
    reducers: {
        setCity: (state, action) => {
            state.cities = action.payload.sort()
        },
    },
})

export const {setCity} = citySlice.actions
