import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/dist/query/react'
import {apiRoutes, BASE_URL} from '../../config/api'
import {INewsBodyRequest, IOneNewsBodyRequest} from '../../models/news'
import {IOneNews} from '../../types/news'
import {IOffersBodyRequest} from '../../models/offers'
import {useAppSelector} from '../../hooks/store'
import {$api, $authApi} from '../indexAuth'

type Payloads = {
    page: number
    limit: number
    orderBy: string
    category: number
    userId?: number | string
}

export const offersApi = createApi({
    reducerPath: 'offersApi',
    baseQuery: fetchBaseQuery({baseUrl: `${BASE_URL}`}),
    refetchOnFocus: true,
    keepUnusedDataFor: 300,
    endpoints: (build) => ({
        getInvestorsCategory: build.query<IOffersBodyRequest, Payloads>({
            query: (payload: Payloads) =>
                `${apiRoutes.GET_OFFER_PAGINATE}/${payload.userId}?page=${payload.page}&limit=${payload.limit}&orderBy=${payload.orderBy}&category=${payload.category}`,
        }),
        getSuggestionsInvestorsCategory: build.query<IOffersBodyRequest, Payloads>({
            query: (payload: Payloads) =>
                `${apiRoutes.GET_OFFER_PAGINATE}/${payload.userId}?page=${payload.page}&limit=${payload.limit}&orderBy=${payload.orderBy}&category=${payload.category}`,
        }),
        getBusinessPartnersCategory: build.query<IOffersBodyRequest, Payloads>({
            query: (payload: Payloads) =>
                `${apiRoutes.GET_OFFER_PAGINATE}/${payload.userId}?page=${payload.page}&limit=${payload.limit}&orderBy=${payload.orderBy}&category=${payload.category}`,
        }),
        getSaleBusinessCategory: build.query<IOffersBodyRequest, Payloads>({
            query: (payload: Payloads) =>
                `${apiRoutes.GET_OFFER_PAGINATE}/${payload.userId}?page=${payload.page}&limit=${payload.limit}&orderBy=${payload.orderBy}&category=${payload.category}`,
        }),
        getFranchiseCategory: build.query<IOffersBodyRequest, Payloads>({
            query: (payload: Payloads) =>
                `${apiRoutes.GET_OFFER_PAGINATE}/${payload.userId}?page=${payload.page}&limit=${payload.limit}&orderBy=${payload.orderBy}&category=${payload.category}`,
        }),
    }),
})

export const {
    useGetBusinessPartnersCategoryQuery,
    useGetFranchiseCategoryQuery,
    useGetInvestorsCategoryQuery,
    useGetSaleBusinessCategoryQuery,
    useGetSuggestionsInvestorsCategoryQuery,
} = offersApi
