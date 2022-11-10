import React, {FC, useEffect, useState} from 'react'
import Partners from '../components/Partners'
import 'swiper/css'
import 'swiper/css/pagination'
import HomeCategoriesContainer from '../components/containers/HomeCategories'
import NewsContainer from '../components/containers/News'
import BannerContainer from '../components/containers/Banner'
import BlocksContainer from '../components/containers/Blocks'
import {
    useGetBusinessPartnersCategoryQuery,
    useGetFranchiseCategoryQuery,
    useGetInvestorsCategoryQuery,
    useGetSaleBusinessCategoryQuery,
    useGetSuggestionsInvestorsCategoryQuery,
} from '../services/RTK/offersApi'
import MainTitle from '../components/containers/MainTitle'
import {getMainTitle} from '../services/mainTitle'
import {IUseStateItem} from '../types'
import {IMainTitle} from '../types/mainTitle'

const Home: FC = () => {
    const [mainTitle, setMainTitle] = useState<IUseStateItem<IMainTitle>>({
        isLoaded: false,
        item: null,
    })

    const {investors, isLoadingInvestors} = useGetInvestorsCategoryQuery(
        {
            page: 1,
            limit: 8,
            category: 0,
            orderBy: 'desc',
        },
        {selectFromResult: ({data}) => ({investors: data?.body, isLoadingInvestors: !!data?.status})}
    )

    const {suggestionsInvestors, isLoadingSuggestionsInvestors} = useGetSuggestionsInvestorsCategoryQuery(
        {
            page: 1,
            limit: 8,
            category: 1,
            orderBy: 'desc',
        },
        {
            selectFromResult: ({data}) => ({
                suggestionsInvestors: data?.body,
                isLoadingSuggestionsInvestors: !!data?.status,
            }),
        }
    )
    const {businessPartners, isLoadingBusinessPartners} = useGetBusinessPartnersCategoryQuery(
        {
            page: 1,
            limit: 8,
            category: 2,
            orderBy: 'desc',
        },
        {
            selectFromResult: ({data}) => ({
                businessPartners: data?.body,
                isLoadingBusinessPartners: !!data?.status,
            }),
        }
    )
    const {saleBusiness, isLoadingSaleBusiness} = useGetSaleBusinessCategoryQuery(
        {
            page: 1,
            limit: 8,
            category: 3,
            orderBy: 'desc',
        },
        {selectFromResult: ({data}) => ({saleBusiness: data?.body, isLoadingSaleBusiness: !!data?.status})}
    )
    const {franchise, isLoadingFranchise} = useGetFranchiseCategoryQuery(
        {
            page: 1,
            limit: 8,
            category: 4,
            orderBy: 'desc',
        },
        {selectFromResult: ({data}) => ({franchise: data?.body, isLoadingFranchise: !!data?.status})}
    )

    useEffect(() => {
        getMainTitle()
            .then((res) => res && setMainTitle({isLoaded: true, item: res}))
            .catch(() => setMainTitle({isLoaded: true, item: null}))
    }, [])

    return (
        <main>
            <BannerContainer swiperDelay={mainTitle?.item?.bannersDelay} />

            <BlocksContainer
                investors={investors?.meta}
                businessPartners={businessPartners?.meta}
                saleBusiness={saleBusiness?.meta}
                franchise={franchise?.meta}
            />

            <MainTitle
                title={mainTitle?.item?.title}
                description={mainTitle?.item?.description}
                videoPath={mainTitle?.item?.videoPath}
            />

            <HomeCategoriesContainer
                isLoadingInvestors={isLoadingInvestors}
                investors={investors?.data}
                isLoadingSuggestionsInvestors={isLoadingSuggestionsInvestors}
                suggestionsInvestors={suggestionsInvestors?.data}
                isLoadingBusinessPartners={isLoadingBusinessPartners}
                businessPartners={businessPartners?.data}
                isLoadingSaleBusiness={isLoadingSaleBusiness}
                saleBusiness={saleBusiness?.data}
                isLoadingFranchise={isLoadingFranchise}
                franchise={franchise?.data}
            />

            <NewsContainer />

            <Partners />
        </main>
    )
}

export default Home
