import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    cities: [
        'Москва',
        'Казань',
        'Aнапа',
        'Харьков',
        'Владимир',
        'Чечня',
        'Ереван',
        'Boston',
        'Meria',
        'Москва',
        'Казань',
        'Aнапа',
        'Харьков',
        'Владимир',
        'Чечня',
        'Ереван',
        'Boston',
        'Meria',
    ],
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
