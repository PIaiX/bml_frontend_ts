import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {apiRoutes, BASE_URL} from '../../config/api'
import {INewsBodyRequest, IOneNewsBodyRequest} from '../../models/news'
import {IOneNews} from '../../types/news'

export const newsApi = createApi({
    reducerPath: 'newsApi',
    baseQuery: fetchBaseQuery({baseUrl: `${BASE_URL}`}),
    refetchOnFocus: true,
    keepUnusedDataFor: 120,
    endpoints: (build) => ({
        getAllNews: build.query<INewsBodyRequest, {page: number; limit: number; orderBy: string}>({
            query: (payload) =>
                `${apiRoutes.ACTIONS_NEWS}?page=${payload.page}&limit=${payload.limit}&orderBy=${payload.orderBy}`,
        }),
        getOneNew: build.query<IOneNewsBodyRequest<IOneNews>, string | undefined>({
            query: (slug) => `${apiRoutes.ACTIONS_NEWS}/${slug}`,
        }),
    }),
})

export const {useGetAllNewsQuery, useGetOneNewQuery} = newsApi
