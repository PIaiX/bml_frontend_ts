import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { $api } from '../../services/indexAuth'
import { apiRoutes } from '../../config/api'
import { IUser } from '../../types/user'
import checkProfileForMenu from "../../helpers/checkProfileForMenu";

type InitialState = {
    user: IUser | null
    isLoading: boolean,
    complete:boolean
}

const initialState: InitialState = {
    user: null,
    isLoading: true,
    complete:false
}

export const checkAuth = createAsyncThunk('auth/refreshToken', async (_, thunkAPI) => {
    try {
        const response = await $api(apiRoutes.REFRESH_TOKEN)
        if (response.status === 200) {
            return response?.data?.body
        }
    } catch (error: any) {
        return thunkAPI.rejectWithValue(error.message)
    }
})

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload
            state.complete = checkProfileForMenu(action.payload);
        },
        resetUser: (state) => {
            state.user = initialState.user
            state.complete=false;
        },
    },
    extraReducers: {
        [checkAuth.fulfilled.type]: (state: InitialState, action: { payload: { token: string; user: any } }) => {
            localStorage.setItem('token', action?.payload?.token)
            state.user = action?.payload?.user
            state.isLoading = false
        },
        [checkAuth.rejected.type]: (state: InitialState, action) => {
            localStorage.removeItem('token')
            state.user = null
            state.isLoading = false
        },
    },
})

export const { setUser, resetUser } = userSlice.actions
