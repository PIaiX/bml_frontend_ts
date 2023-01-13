import React, {FC, useEffect, useMemo, useState} from 'react'
import PartnersSite from '../components/PartnersSite'
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
import {IUser} from '../types/user'
import {useAppSelector} from '../hooks/store'

const Home: FC = () => {
    const [mainTitle, setMainTitle] = useState<IUseStateItem<IMainTitle>>({
        isLoaded: false,
        item: null,
    })
    const user: IUser | null = useAppSelector((state) => state?.user?.user)

    const {investors, isLoadingInvestors} = useGetInvestorsCategoryQuery(
        {
            page: 1,
            limit: 8,
            category: 0,
            orderBy: 'desc',
            userId: user ? user?.id : '',
        },
        {
            selectFromResult: ({data}) => ({investors: data?.body, isLoadingInvestors: !!data?.status}),
        }
    )

    const {suggestionsInvestors, isLoadingSuggestionsInvestors} = useGetSuggestionsInvestorsCategoryQuery(
        {
            page: 1,
            limit: 8,
            category: 1,
            orderBy: 'desc',
            userId: user ? user?.id : '',
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
            userId: user ? user?.id : '',
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
            userId: user ? user?.id : '',
        },
        {
            selectFromResult: ({data}) => ({saleBusiness: data?.body, isLoadingSaleBusiness: !!data?.status}),
        }
    )
    const {franchise, isLoadingFranchise} = useGetFranchiseCategoryQuery(
        {
            page: 1,
            limit: 8,
            category: 4,
            orderBy: 'desc',
            userId: user ? user?.id : '',
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
                description={
                    'Посмотрите видео о работе портала: для инвесторов и партнеров, с помощью которого, не отрываясь от бизнес процессов, можно рассматривать перспективные проекты и узнавать о трендах рынка'
                }
                // description={mainTitle?.item?.description}

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

            <PartnersSite />
        </main>
    )
}

export default Home
