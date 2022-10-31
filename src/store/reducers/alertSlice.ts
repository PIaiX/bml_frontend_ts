import {createAction, createSlice, Draft} from '@reduxjs/toolkit'

type InitialStateAlert = {
    isShow: boolean
    message: string | null
    typeAlert: string | null
}

type State = {
    isShow?: boolean
    message: string | null
    typeAlert: string | null
}

const initialState: InitialStateAlert = {
    isShow: true,
    message: null,
    typeAlert: null,
}

export const alertSlice = createSlice({
    name: 'alert',
    initialState,
    reducers: {
        showAlert: (state: Draft<State>, action) => {
            console.log(action)
            state.isShow = true
            state.message = action.payload.message
            state.typeAlert = action.payload.typeAlert.toLowerCase()
        },
        resetAlert: (state) => {
            state.isShow = false
            state.message = null
            state.typeAlert = null
        },
    },
})

export const {showAlert, resetAlert} = alertSlice.actions
