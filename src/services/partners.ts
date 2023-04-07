import {createAsyncThunk} from "@reduxjs/toolkit";
import {apiRoutes} from "../config/api";
import {$api} from "./indexAuth";

export const getPartners =  createAsyncThunk('user/getPartners', async (_, thunkAPI) => {
    try {
        const response = await $api.get(apiRoutes.GET_UR_PARTNERS)

        if (response && response.status === 200) {
            return response?.data?.body
        }
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})