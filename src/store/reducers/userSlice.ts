import {createSlice} from '@reduxjs/toolkit'

const initialState: any = {
    user: null,
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload
        },
    },
})

export const {setUser} = userSlice.actions
