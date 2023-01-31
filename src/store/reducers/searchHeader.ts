import {createSlice, PayloadAction} from '@reduxjs/toolkit'

type Propstype={
    input:string
}

const initialState = {
    input: ""
}

export const searchHeaderSlice = createSlice({
    name: 'searchHeader',
    initialState,
    reducers: {
        setSearch: (state, action:PayloadAction<string>) => {
            state.input = action.payload
        },

    },
})
export const {setSearch} = searchHeaderSlice.actions