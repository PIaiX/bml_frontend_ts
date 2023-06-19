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
type Props = {
    tab: number
    section: number
    bannersType?:boolean
}

const ArchiveBanners: FC<Props> = ({ tab, section, bannersType }) => {
    const user: IUser | null = useAppSelector((state) => state?.user?.user)
    const generalLimit = 5
    const queryClient = useQueryClient()
    const [currentPage, setCurrentPage] = useState(0)
    const [offerId, setOfferId] = useState<number | null>(null)
    let text = 'Ничего нет'
    const dispatch = useAppDispatch()
    if (tab === 4 && user?.typeForUser === 'Физ лицо')
        text = 'Разместить объявление раздела "Франшиз" можно с учетной записи ИП или ООО'
    const archiveOffers = useQuery({
        queryKey: [`${bannersType?'archiveBanners':'archiveAds'}`, user?.id, tab, currentPage],
        queryFn: async () => {
            try {
                if (user?.id) {
                    const response = await $authApi.get<IOffersBodyRequest>(
                        `${bannersType?apiRoutes.GET_MY_ARCHIVED_ADS:(apiRoutes.GET_ARCHIVED_USERS_OFFERS+'/'+user?.id)}?page=${currentPage + 1
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
                    dispatch(showAlert({ message: 'Объявление успешно отправлено на модерацию', typeAlert: 'good' }))
                })
                .catch(() => dispatch(showAlert({ message: 'Произошла ошибка', typeAlert: 'bad' }))),
        onSuccess: () => queryClient.invalidateQueries([`${bannersType?'archiveBanners':'archiveAds'}`]),
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
                            <BannerCard
                                id={i.id}
                                key={i.id}
                                type={tab}
                                bannersType={bannersType}
                                section={section}
                                imgURL={i.image}
                                timeBeforeArchive={i.timeBeforeArchive}
                                title={i.title}
                                scope={i.subsection?.area?.name}
                                investments={i?.investments}
                                isVerified={i.isVerified}
                                isArchived={i.isArchived}
                                validity={i?.archiveExpire}
                                offerIdSeterForUnArchive={offerIdSeterForUnArchive}
                                isPricePerMonthAbsolute={i.isPricePerMonthAbsolute}
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