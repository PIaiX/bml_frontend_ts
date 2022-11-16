import React, {Dispatch, FC, SetStateAction, useCallback, useEffect, useState} from 'react'
import AdCard from '../pages/profile/AdCard'
import Loader from './utils/Loader'
import Pagination from './utils/Pagination'
import {addInArchive, deleteWithArchive, getUsersOffersNotArchive} from '../services/offers'
import {IUser} from '../types/user'
import {useAppDispatch, useAppSelector} from '../hooks/store'
import {IPagination, IUseStateItems} from '../types'
import {IOffersItem, IOffersMeta} from '../types/offers'
import usePagination from '../hooks/pagination'
import {useMutation, useQuery, useQueryClient} from 'react-query'
import {$api} from '../services/indexAuth'
import {IOffersBodyRequest} from '../models/offers'
import {apiRoutes} from '../config/api'
import {showAlert} from '../store/reducers/alertSlice'

type Props = {
    tab: number
    section: number
}

const NotArchiveAds: FC<Props> = ({tab, section}) => {
    const user: IUser = useAppSelector((state) => state?.user?.user)
    const generalLimit = 5
    const [currentPage, setCurrentPage] = useState(0)
    const [offerId, setOfferId] = useState<number | null>(null)
    const dispatch = useAppDispatch()
    const queryClient = useQueryClient()
    const notArchiveOffers = useQuery({
        queryKey: ['notArchive', user?.id, tab, currentPage],
        queryFn: async () => {
            try {
                if (user?.id) {
                    const response = await $api.get<IOffersBodyRequest>(
                        `${apiRoutes.GET_NOT_ARCHIVED_USERS_OFFERS}/${user?.id}?page=${
                            currentPage + 1
                        }&limit=${generalLimit}&orderBy=${'desc'}${tab || tab === 0 ? `&category=${tab}` : ''}`
                    )
                    return response?.data?.body
                }
            } catch (error) {
                console.log(error)
            }
        },
        staleTime: 60 * 1000,
        keepPreviousData: true,
    })

    const currPage = useCallback(
        (page: number) => {
            setCurrentPage(page)
        },
        [section, tab]
    )

    const {paginationItems, pageCount, selectedPage, setSelectedPage, handlePageClick}: IPagination<IOffersItem> =
        usePagination(notArchiveOffers?.data?.data, generalLimit, notArchiveOffers?.data?.meta.total, currPage)

    const offerIdSeterForArchive = useCallback((id: number) => {
        setOfferId(id)
    }, [])

    const mutation = useMutation({
        mutationFn: () =>
            addInArchive(offerId)
                .then(() => {
                    dispatch(showAlert({message: 'Объявление успешно добавлено в архив', typeAlert: 'good'}))
                })
                .catch(() => dispatch(showAlert({message: 'Произошла ошибка', typeAlert: 'bad'}))),
        onSuccess: () => queryClient.invalidateQueries(['notArchive']),
    })

    useEffect(() => {
        if (offerId) {
            mutation.mutate()
        }
    }, [offerId])

    useEffect(() => {
        if (paginationItems?.length === 0) {
            setSelectedPage(0)
            setCurrentPage(0)
        }
    }, [paginationItems?.length])

    useEffect(() => {
        setSelectedPage(0)
        setCurrentPage(0)
    }, [tab])

    return (
        <>
            <div className="acc-box">
                {!notArchiveOffers?.isLoading ? (
                    paginationItems?.length > 0 ? (
                        paginationItems?.map((i: any) => (
                            <AdCard
                                id={i.id}
                                key={i.id}
                                type={tab}
                                section={section}
                                imgURL={i.image}
                                title={i.title}
                                scope={i.subsection?.area?.name}
                                investments={i?.investments}
                                validity={i?.archiveExpire}
                                offerIdSeterForArchive={offerIdSeterForArchive}
                            />
                        ))
                    ) : (
                        <h6 className="w-100 p-5 text-center">Ничего нет</h6>
                    )
                ) : (
                    <div className="p-5 w-100 d-flex justify-content-center">
                        <Loader color="#343434" />
                    </div>
                )}
            </div>
            {paginationItems?.length > 0 ? (
                <div className="acc-box p-0 mt-3 d-flex justify-content-center">
                    <Pagination
                        nextLabel="❯"
                        onPageChange={handlePageClick}
                        pageRangeDisplayed={3}
                        marginPagesDisplayed={1}
                        pageCount={pageCount}
                        previousLabel="❮"
                        forcePage={selectedPage}
                    />
                </div>
            ) : (
                ''
            )}
        </>
    )
}

export default NotArchiveAds
