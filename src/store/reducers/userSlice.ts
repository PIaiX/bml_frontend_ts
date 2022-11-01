import {createAsyncThunk, createSlice, Draft} from '@reduxjs/toolkit'
import {$api, $authApi} from '../../services/indexAuth'
import {apiRoutes} from '../../config/api'
import {IRegister} from '../../models/auth'
import {IUser} from '../../types/user'

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
        return rejectWithValue(error.message)
    }
})

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state: Draft<IUser>, action) => {
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
