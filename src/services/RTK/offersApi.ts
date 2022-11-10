import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/dist/query/react'
import {apiRoutes, BASE_URL} from '../../config/api'
import {INewsBodyRequest, IOneNewsBodyRequest} from '../../models/news'
import {IOneNews} from '../../types/news'
import {IOffersBodyRequest} from '../../models/offers'

type Payloads = {
    page: number
    limit: number
    orderBy: string
    category: number
}

export const offersApi = createApi({
    reducerPath: 'offersApi',
    baseQuery: fetchBaseQuery({baseUrl: `${BASE_URL}`}),
    refetchOnFocus: true,
    keepUnusedDataFor: 300,
    endpoints: (build) => ({
        getInvestorsCategory: build.query<
            IOffersBodyRequest,
            {page: number; limit: number; orderBy: string; category: number}
        >({
            query: (payload: Payloads) =>
                `${apiRoutes.GET_OFFER_PAGINATE}?page=${payload.page}&limit=${payload.limit}&orderBy=${payload.orderBy}&category=${payload.category}`,
        }),
        getSuggestionsInvestorsCategory: build.query<
            IOffersBodyRequest,
            {page: number; limit: number; orderBy: string; category: number}
        >({
            query: (payload: Payloads) =>
                `${apiRoutes.GET_OFFER_PAGINATE}?page=${payload.page}&limit=${payload.limit}&orderBy=${payload.orderBy}&category=${payload.category}`,
        }),
        getBusinessPartnersCategory: build.query<
            IOffersBodyRequest,
            {page: number; limit: number; orderBy: string; category: number}
        >({
            query: (payload: Payloads) =>
                `${apiRoutes.GET_OFFER_PAGINATE}?page=${payload.page}&limit=${payload.limit}&orderBy=${payload.orderBy}&category=${payload.category}`,
        }),
        getSaleBusinessCategory: build.query<
            IOffersBodyRequest,
            {page: number; limit: number; orderBy: string; category: number}
        >({
            query: (payload: Payloads) =>
                `${apiRoutes.GET_OFFER_PAGINATE}?page=${payload.page}&limit=${payload.limit}&orderBy=${payload.orderBy}&category=${payload.category}`,
        }),
        getFranchiseCategory: build.query<
            IOffersBodyRequest,
            {page: number; limit: number; orderBy: string; category: number}
        >({
            query: (payload: Payloads) =>
                `${apiRoutes.GET_OFFER_PAGINATE}?page=${payload.page}&limit=${payload.limit}&orderBy=${payload.orderBy}&category=${payload.category}`,
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
