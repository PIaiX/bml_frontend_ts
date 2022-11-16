import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {$api} from '../../services/indexAuth'
import {apiRoutes} from '../../config/api'
import {IRegister} from '../../models/auth'
const initialState: any = {
    user: null,
}

export const checkAuth = createAsyncThunk('auth/refreshToken', async (_, {rejectWithValue}) => {
    try {
        const response = await $api.get<IRegister>(`${apiRoutes.REFRESH_TOKEN}`)
        if (response.status === 200) {
            return response?.data?.body
        } else {
            new Error('Refresh error')
        }
    } catch (error: any) {
        localStorage.removeItem('token')
        return rejectWithValue(error.message)
    }
})

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload
        },
        resetUser: (state) => {
            state.user = initialState.user
        },
    },
    extraReducers: {
        [checkAuth.fulfilled.type]: (state: any, action: {payload: {token: string; user: any}}) => {
            localStorage.setItem('token', action?.payload?.token)
            state.user = action?.payload?.user
        },
    },
})

export const {setUser, resetUser} = userSlice.actions
