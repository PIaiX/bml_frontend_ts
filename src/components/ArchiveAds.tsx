import React, { FC, useCallback, useEffect, useState } from 'react'
import AdCard from '../pages/profile/AdCard'
import Loader from './utils/Loader'
import Pagination from './utils/Pagination'
import { deleteWithArchive, getUsersOffersArchive, getUsersOffersNotArchive } from '../services/offers'
import { IUser } from '../types/user'
import { useAppDispatch, useAppSelector } from '../hooks/store'
import { IPagination, IUseStateItems } from '../types'
import { IOffersItem, IOffersMeta } from '../types/offers'
import usePagination from '../hooks/pagination'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { $authApi } from '../services/indexAuth'
import { IOffersBodyRequest } from '../models/offers'
import { apiRoutes } from '../config/api'
import { showAlert } from '../store/reducers/alertSlice'

type Props = {
    tab: number
    section: number
}

const ArchiveAds: FC<Props> = ({ tab, section }) => {
    const user: IUser | null = useAppSelector((state) => state?.user?.user)
    const generalLimit = 5
    const queryClient = useQueryClient()
    const [currentPage, setCurrentPage] = useState(0)
    const [offerId, setOfferId] = useState<number | null>(null)
    const dispatch = useAppDispatch()

    const archiveOffers = useQuery({
        queryKey: ['archive', user?.id, tab, currentPage],
        queryFn: async () => {
            try {
                if (user?.id) {
                    const response = await $authApi.get<IOffersBodyRequest>(
                        `${apiRoutes.GET_ARCHIVED_USERS_OFFERS}/${user?.id}?page=${currentPage + 1
                        }&limit=${generalLimit}&orderBy=${'desc'}${tab || tab === 0 ? `&category=${tab}` : ''}`
                    )
                    return response?.data?.body
                }
            } catch (error) {
                console.log(error)
            }
        },
        staleTime: 1000,
        keepPreviousData: true,
    })

    const currPage = useCallback(
        (page: number) => {
            setCurrentPage(page)
        },
        [section, tab]
    )

    const { paginationItems, pageCount, selectedPage, setSelectedPage, handlePageClick }: IPagination<IOffersItem> =
        usePagination(archiveOffers?.data?.data, generalLimit, archiveOffers?.data?.meta.total, currPage)

    const offerIdSeterForUnArchive = useCallback((id: number) => {
        setOfferId(id)
    }, [])

    const mutation = useMutation({
        mutationFn: () =>
            deleteWithArchive(offerId)
                .then(() => {
                    dispatch(showAlert({ message: 'Объявление успешно убрано из архива', typeAlert: 'good' }))
                })
                .catch(() => dispatch(showAlert({ message: 'Произошла ошибка', typeAlert: 'bad' }))),
        onSuccess: () => queryClient.invalidateQueries(['archive']),
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
                {!archiveOffers?.isLoading ? (
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
                                offerIdSeterForUnArchive={offerIdSeterForUnArchive}
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

export default ArchiveAds
