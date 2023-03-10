import {createAction, createSlice, Draft} from '@reduxjs/toolkit'

type InitialStateAlert = {
    isShow: boolean
    message: string | null
    typeAlert: string | null
    withLink?:boolean
}

type State = {
    isShow?: boolean
    message: string | null
    typeAlert: string | null
    withLink?:boolean
}

const initialState: InitialStateAlert = {
    isShow: false,
    message: null,
    typeAlert: null,
    withLink:false
}

export const alertSlice = createSlice({
    name: 'alert',
    initialState,
    reducers: {
        showAlert: (state: Draft<State>, action) => {
            state.isShow = true
            state.message = action.payload.message
            state.typeAlert = action.payload.typeAlert.toLowerCase()
            if(action.payload.withLink)state.withLink=true
        },
        resetAlert: (state) => {
            state.isShow = false
            state.message = initialState.message
            state.typeAlert = initialState.typeAlert
            state.withLink = false
        },
    },
})

export const {showAlert, resetAlert} = alertSlice.actions
