import React, {FC, useCallback, useEffect, useState} from 'react';
import {IUser} from "../types/user";
import {useAppDispatch, useAppSelector} from "../hooks/store";
import AdCard from "../pages/profile/AdCard";
import Loader from "./utils/Loader";
import Pagination from "./utils/Pagination";
import {useMutation, useQuery, useQueryClient} from "react-query";
import {$authApi} from "../services/indexAuth";
import {IOffersBodyRequest} from "../models/offers";
import {apiRoutes} from "../config/api";
import {IPagination} from "../types";
import {IOffersItem} from "../types/offers";
import usePagination from "../hooks/pagination";
import {addInArchive, deleteWithArchive} from "../services/offers";
import {showAlert} from "../store/reducers/alertSlice";
import OfferCard from "../pages/profile/OfferCard";
type propsType={
    section:number
    bannersType?:boolean
}
const MyAds:FC<propsType> = ({section, bannersType}) => {

    const tab=0

    const user: IUser | null = useAppSelector((state) => state?.user?.user)
    const generalLimit = 5
    const [currentPage, setCurrentPage] = useState(0)
    const [offerId, setOfferId] = useState<number | null>(null)
    const [offerId2, setOfferId2] = useState<number | null>(null)
    const dispatch = useAppDispatch()
    const queryClient = useQueryClient()
    let text = 'Ничего нет'
    if (user?.typeForUser === 'Физ лицо')
        text = 'Разместить объявление раздела "Франшиз" можно с учетной записи ИП или ООО'
    const notArchiveOffers = useQuery({
        queryKey: [`${section}-${currentPage}`],
        queryFn: async () => {
            try {
                if (user?.id) {
                    const response = await $authApi .get<IOffersBodyRequest>(
                        `${apiRoutes.GET_MY_OFFERS}?page=${currentPage + 1
                        }&limit=${generalLimit}&orderBy=${'desc'}&category=${section}`
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
    useEffect(()=>{
        console.log(section)
    }, [section])

    const currPage = useCallback(
        (page: number) => {
            setCurrentPage(page)
        },
        [section]
    )

    const { paginationItems, pageCount, selectedPage, setSelectedPage, handlePageClick }: IPagination<IOffersItem> =
        usePagination(notArchiveOffers?.data?.data, generalLimit, notArchiveOffers?.data?.meta.total, currPage)
    const offerIdSeterForArchive = useCallback((id: number) => {
        setOfferId(id)
    }, [])
    const offerIdSeterForUnArchive = useCallback((id: number) => {
        setOfferId2(id)
    }, [])


    const mutation = useMutation({
        mutationFn: () =>
            addInArchive(offerId)
                .then(() => {
                    dispatch(showAlert({ message: 'Объявление успешно добавлено в архив', typeAlert: 'good' }))
                })
                .catch(() => dispatch(showAlert({ message: 'Произошла ошибка', typeAlert: 'bad' }))),
        onSuccess: () => queryClient.invalidateQueries([`${section}-${currentPage}`]),
    })

    const mutation2 = useMutation({
        mutationFn: () =>
            deleteWithArchive(offerId2)
                .then(() => {
                    dispatch(showAlert({ message: 'Объявление успешно отправлено на модерацию', typeAlert: 'good' }))
                })
                .catch(() => dispatch(showAlert({ message: 'Произошла ошибка', typeAlert: 'bad' }))),
        onSuccess: () => queryClient.invalidateQueries([`${section}-${currentPage}`]),
    })


    useEffect(() => {
        if (offerId) {
            mutation.mutate()
        }
    }, [offerId])

    useEffect(() => {
        if (offerId2) {
            mutation2.mutate()
        }
    }, [offerId2])

    useEffect(() => {
        if (paginationItems?.length === 0) {
            setSelectedPage(0)
            setCurrentPage(0)
        }
    }, [paginationItems?.length])


    return (
        <>
            <div className="acc-box">
                {!notArchiveOffers?.isLoading ? (
                    paginationItems?.length > 0 ? (
                        paginationItems?.map((i: any) => (
                            <OfferCard
                                key={i.id}
                                {...i}
                                section={section}
                                scope={i.subsection?.area?.name}
                                bannersType={bannersType}
                                validity={i?.archiveExpire}
                                offerIdSeterForArchive={offerIdSeterForArchive}
                                offerIdSeterForUnArchive={offerIdSeterForUnArchive}
                            />
                        ))
                    ) : (
                        <h6 className="w-100 p-5 text-center">{text}</h6>
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

export default MyAds;