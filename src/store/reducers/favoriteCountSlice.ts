import {createSlice} from '@reduxjs/toolkit'

type InitialState = {
    count?: number | null
}

const initialState: InitialState = {
    count: 0,
}

export const favoriteCountSlice = createSlice({
    name: 'favoriteCount',
    initialState,
    reducers: {
        setInitialCount: (state, action) => {
            state.count = action.payload
        },
        increment: (state) => {
            if (state.count || state.count === 0) {
                state.count += 1
            }
        },
        decrement: (state) => {
            if (state.count) {
                state.count -= 1
            }
        },
    },
})

export const {setInitialCount, increment, decrement} = favoriteCountSlice.actions
