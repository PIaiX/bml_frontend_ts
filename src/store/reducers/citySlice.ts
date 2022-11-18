import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    cities: [],
}

export const citySlice = createSlice({
    name: 'cities',
    initialState,
    reducers: {
        setCity: (state, action) => {
            state.cities = action.payload
        },
    },
})

export const {setCity} = citySlice.actions
