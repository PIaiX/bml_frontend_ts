import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {getPartners} from "../../services/partners";

type partnerType={
    id:number
    name:string
    link:string
    image:string
}

type propsType={
    partners:Array<partnerType> | null
}

const initialState:propsType = {
    partners: null
}

const partnersSlice = createSlice({
    name: 'partners',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(getPartners.fulfilled, (state, action)=>{
            state.partners = action.payload
        })
    }
})

export const PartnersActions= partnersSlice.actions;
export const PartnersReducers= partnersSlice.reducer;
