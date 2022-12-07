import React, {FC} from 'react'
import AdvPreview from '../AdvPreview'
import Loader from '../utils/Loader'
import {NavLink} from 'react-router-dom'
import {IOffersItem, IOffersMeta} from '../../types/offers'

type Props = {
    isLoadingInvestors?: boolean
    investors?: Array<IOffersItem>
    isLoadingSuggestionsInvestors?: boolean
    suggestionsInvestors?: Array<IOffersItem>
    isLoadingBusinessPartners?: boolean
    businessPartners?: Array<IOffersItem>
    isLoadingSaleBusiness?: boolean
    saleBusiness?: Array<IOffersItem>
    isLoadingFranchise?: boolean
    franchise?: Array<IOffersItem>
}

const HomeCategoriesContainer: FC<Props> = ({
    isLoadingInvestors,
    investors,
    isLoadingSuggestionsInvestors,
    suggestionsInvestors,
    isLoadingBusinessPartners,
    businessPartners,
    isLoadingSaleBusiness,
    saleBusiness,
    isLoadingFranchise,
    franchise,
}) => {
    return (
        <>
            <section className="block_3 container">
                <h2 className="mt-4">Поиск инвесторов</h2>
                <div className="row g-2 g-sm-3 g-xl-4">
                    {isLoadingInvestors ? (
                        investors?.length ? (
                            investors?.map((item) => (
                                <div className="col-6 col-md-4 col-lg-3" key={item.id}>
                                    <AdvPreview
                                        id={item.id}
                                        image={item.image}
                                        title={item.title}
                                        investments={item.investments}
                                        favorite={item?.isFavorite}
                                    />
                                </div>
                            ))
                        ) : null
                    ) : (
                        <div className="p-5 w-100 d-flex justify-content-center">
                            <Loader color="#343434" />
                        </div>
                    )}
                </div>
                <NavLink to="category/0">
                    <button className="btn_main btn_1 mx-auto mt-4">Показать еще</button>
                </NavLink>
            </section>

            <section className="block_3 container">
                <h2>Предложения инвесторов</h2>
                <div className="row g-2 g-sm-3 g-xl-4">
                    {isLoadingSuggestionsInvestors ? (
                        suggestionsInvestors?.length ? (
                            suggestionsInvestors?.map((item) => (
                                <div className="col-6 col-md-4 col-lg-3" key={item.id}>
                                    <AdvPreview
                                        id={item.id}
                                        image={item.image}
                                        title={item.title}
                                        investments={item.investments}
                                        favorite={item?.isFavorite}
                                    />
                                </div>
                            ))
                        ) : null
                    ) : (
                        <div className="p-5 w-100 d-flex justify-content-center">
                            <Loader color="#343434" />
                        </div>
                    )}
                </div>
                <NavLink to="category/1">
                    <button className="btn_main btn_1 mx-auto mt-4">Показать еще</button>
                </NavLink>
            </section>

            <section className="block_3 container">
                <h2>Поиск бизнес партнёров</h2>
                <div className="row g-2 g-sm-3 g-xl-4">
                    {isLoadingBusinessPartners ? (
                        businessPartners?.length ? (
                            businessPartners?.map((item) => (
                                <div className="col-6 col-md-4 col-lg-3" key={item.id}>
                                    <AdvPreview
                                        id={item.id}
                                        image={item.image}
                                        title={item.title}
                                        investments={item.investments}
                                        favorite={item?.isFavorite}
                                    />
                                </div>
                            ))
                        ) : null
                    ) : (
                        <div className="p-5 w-100 d-flex justify-content-center">
                            <Loader color="#343434" />
                        </div>
                    )}
                </div>
                <NavLink to="category/2">
                    <button className="btn_main btn_1 mx-auto mt-4">Показать еще</button>
                </NavLink>
            </section>

            <section className="block_3 container">
                <h2>Продажа бизнеса</h2>
                <div className="row g-2 g-sm-3 g-xl-4">
                    {isLoadingSaleBusiness ? (
                        saleBusiness?.length ? (
                            saleBusiness?.map((item) => (
                                <div className="col-6 col-md-4 col-lg-3" key={item.id}>
                                    <AdvPreview
                                        id={item.id}
                                        image={item.image}
                                        title={item.title}
                                        investments={item.investments}
                                        favorite={item?.isFavorite}
                                    />
                                </div>
                            ))
                        ) : null
                    ) : (
                        <div className="p-5 w-100 d-flex justify-content-center">
                            <Loader color="#343434" />
                        </div>
                    )}
                </div>
                <NavLink to="category/3">
                    <button className="btn_main btn_1 mx-auto mt-4">Показать еще</button>
                </NavLink>
            </section>

            <section className="block_3 container">
                <h2>Франшизы</h2>
                <div className="row g-2 g-sm-3 g-xl-4">
                    {isLoadingFranchise ? (
                        franchise?.length ? (
                            franchise?.map((item) => (
                                <div className="col-6 col-md-4 col-lg-3" key={item.id}>
                                    <AdvPreview
                                        id={item.id}
                                        image={item.image}
                                        title={item.title}
                                        investments={item.investments}
                                        favorite={item?.isFavorite}
                                    />
                                </div>
                            ))
                        ) : null
                    ) : (
                        <div className="p-5 w-100 d-flex justify-content-center">
                            <Loader color="#343434" />
                        </div>
                    )}
                </div>
                <NavLink to="category/4">
                    <button className="btn_main btn_1 mx-auto mt-4">Показать еще</button>
                </NavLink>
            </section>
        </>
    )
}

export default HomeCategoriesContainer
