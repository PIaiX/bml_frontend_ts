import React, {FC, useCallback, useEffect, useState} from 'react';
import {IUser} from "../types/user";
import {useAppDispatch, useAppSelector} from "../hooks/store";
import {useMutation, useQuery, useQueryClient} from "react-query";
import {$authApi} from "../services/indexAuth";
import {IOffersBodyRequest} from "../models/offers";
import {apiRoutes} from "../config/api";
import {IPagination} from "../types";
import {IOffersItem} from "../types/offers";
import usePagination from "../hooks/pagination";
import {deleteWithArchive} from "../services/offers";
import {showAlert} from "../store/reducers/alertSlice";
import BannerCard from "../pages/profile/BannerCard";
import Loader from "./utils/Loader";
import Pagination from "./utils/Pagination";

const ArchiveBanners= () => {
    const user: IUser | null = useAppSelector((state) => state?.user?.user)
    const generalLimit = 5
    const queryClient = useQueryClient()
    const [currentPage, setCurrentPage] = useState(0)
    const [offerId, setOfferId] = useState<number | null>(null)
    let text = 'Ничего нет'
    const dispatch = useAppDispatch()
    if (user?.typeForUser === 'Физ лицо')
        text = 'Разместить объявление раздела "Франшиз" можно с учетной записи ИП или ООО'
    const archiveOffers = useQuery({
        queryKey: ['archiveBanners', user?.id, currentPage],
        queryFn: async () => {
            try {
                if (user?.id) {
                    const response = await $authApi.get<IOffersBodyRequest>(
                        `${apiRoutes.GET_MY_ARCHIVED_ADS}?page=${currentPage + 1
                        }&limit=${generalLimit}&orderBy=desc&category=0`
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
        []
    )

    const { paginationItems, pageCount, selectedPage, setSelectedPage, handlePageClick }: IPagination<IOffersItem> =
        usePagination(archiveOffers?.data?.data, generalLimit, archiveOffers?.data?.meta.total, currPage)

    const mutation = useMutation({
        mutationFn: () =>
            deleteWithArchive(offerId)
                .then(() => {
                    dispatch(showAlert({ message: 'Объявление успешно отправлено на модерацию', typeAlert: 'good' }))
                })
                .catch(() => dispatch(showAlert({ message: 'Произошла ошибка', typeAlert: 'bad' }))),
        onSuccess: () => queryClient.invalidateQueries(['archiveBanners']),
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
    }, [])

    return (
        <>
            <div className="acc-box">
                {!archiveOffers?.isLoading ? (
                    paginationItems?.length > 0 ? (
                        paginationItems?.map((i: any) => (
                            <BannerCard
                                key={i.id}
                                section={1}
                                {...i}
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
};

export default ArchiveBanners;