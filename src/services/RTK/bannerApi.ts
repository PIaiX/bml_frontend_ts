import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {apiRoutes, BASE_URL} from '../../config/api'
import {IBannerBodyRequest} from '../../models/banner'

export const bannerApi = createApi({
    reducerPath: 'bannerApi',
    baseQuery: fetchBaseQuery({baseUrl: `${BASE_URL}`}),
    keepUnusedDataFor: 120,
    endpoints: (build) => ({
        getBanner: build.query<IBannerBodyRequest | undefined, void>({
            query: () => `${apiRoutes.GET_BANNER}`,
        }),
    }),
})

export const {useGetBannerQuery} = bannerApi
