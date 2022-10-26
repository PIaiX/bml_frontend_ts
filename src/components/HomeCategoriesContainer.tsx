import React, {useEffect, useState} from 'react';
import AdvPreview from './AdvPreview';
import {getImages} from '../API/temp';
import Loader from './utils/Loader';
import {NavLink} from 'react-router-dom';
import { CategoryItem } from "../types"

interface CategoryData {
    isLoading: boolean, 
    error: any,
    items: CategoryItem[]
}

//This should probably be changed
interface DefaultDataType {
    1: CategoryData,
    2: CategoryData,
    3: CategoryData,
    4: CategoryData,
    5: CategoryData
}


//This should probably be changed
const defaultCategoriesData: DefaultDataType = {
    1: {isLoading: false, error: null, items: []},
    2: {isLoading: false, error: null, items: []},
    3: {isLoading: false, error: null, items: []},
    4: {isLoading: false, error: null, items: []},
    5: {isLoading: false, error: null, items: []},
}

const HomeCategoriesContainer = () => {
    const [categoriesData, setCategoriesData] = useState(defaultCategoriesData)

    // ! continue working after creating backend API
    useEffect(() => {
        // поиск инвесторов
        getImages(8)
            .then(items => setCategoriesData(prevCategoriesData => ({
                ...prevCategoriesData,
                1: {
                    ...prevCategoriesData['1'],
                    isLoading: true,
                    items
                }
            })))
            .catch(error => setCategoriesData(prevCategoriesData => ({
                ...prevCategoriesData,
                1: {
                    ...prevCategoriesData['1'],
                    isLoading: true,
                    error
                }
            })))

        // предложения инвесторов
        getImages(8)
            .then(items => setCategoriesData(prevCategoriesData => ({
                ...prevCategoriesData,
                2: {
                    ...prevCategoriesData['2'],
                    isLoading: true,
                    items
                }
            })))
            .catch(error => setCategoriesData(prevCategoriesData => ({
                ...prevCategoriesData,
                2: {
                    ...prevCategoriesData['2'],
                    isLoading: true,
                    error
                }
            })))

        // поиск бизнес партнёров
        getImages(8)
            .then(items => setCategoriesData(prevCategoriesData => ({
                ...prevCategoriesData,
                3: {
                    ...prevCategoriesData['3'],
                    isLoading: true,
                    items
                }
            })))
            .catch(error => setCategoriesData(prevCategoriesData => ({
                ...prevCategoriesData,
                3: {
                    ...prevCategoriesData['3'],
                    isLoading: true,
                    error
                }
            })))

        // продажа бизнеса
        getImages(8)
            .then(items => setCategoriesData(prevCategoriesData => ({
                ...prevCategoriesData,
                4: {
                    ...prevCategoriesData['4'],
                    isLoading: true,
                    items
                }
            })))
            .catch(error => setCategoriesData(prevCategoriesData => ({
                ...prevCategoriesData,
                4: {
                    ...prevCategoriesData['4'],
                    isLoading: true,
                    error
                }
            })))

        // франшизы
        getImages(8)
            .then(items => setCategoriesData(prevCategoriesData => ({
                ...prevCategoriesData,
                5: {
                    ...prevCategoriesData['5'],
                    isLoading: true,
                    items
                }
            })))
            .catch(error => setCategoriesData(prevCategoriesData => ({
                ...prevCategoriesData,
                5: {
                    ...prevCategoriesData['5'],
                    isLoading: true,
                    error
                }
            })))
    }, [])

    return (
        <>
            <section className="block_3 container">
                <h2 className="mt-4">Поиск инвесторов</h2>
                <div className="row g-2 g-sm-3 g-xl-4">
                    {
                        categoriesData['1'].isLoading
                            ? categoriesData['1'].items.length
                                ? categoriesData['1'].items.map(item => (
                                    <div
                                        className="col-6 col-md-4 col-lg-3"
                                        key={item.id}
                                    >
                                        <AdvPreview
                                            url={`adv-page/${item.id}`}
                                            imgURL={item.url}
                                            title={item.title}
                                            summ={'400000'}
                                            favorite={true}
                                        />
                                    </div>
                                ))
                                : null
                            : <div className="p-5 w-100 d-flex justify-content-center">
                                <Loader color="#343434"/>
                            </div>
                    }
                </div>
                <NavLink to="category/1">
                    <button className="btn_main btn_1 mx-auto mt-4">Показать еще</button>
                </NavLink>
            </section>

            <section className="block_3 container">
                <h2>Предложения инвесторов</h2>
                <div className="row g-2 g-sm-3 g-xl-4">
                    {
                        categoriesData['2'].isLoading
                            ? categoriesData['2'].items.length
                                ? categoriesData['2'].items.map(item => (
                                    <div
                                        className="col-6 col-md-4 col-lg-3"
                                        key={item.id}
                                    >
                                        <AdvPreview
                                            url={`adv-page/${item.id}`}
                                            imgURL={item.url}
                                            title={item.title}
                                            summ={'400000'}
                                        />
                                    </div>
                                ))
                                : null
                            : <div className="p-5 w-100 d-flex justify-content-center">
                                <Loader color="#343434"/>
                            </div>
                    }
                </div>
                <NavLink to="category/2">
                    <button className="btn_main btn_1 mx-auto mt-4">Показать еще</button>
                </NavLink>
            </section>

            <section className="block_3 container">
                <h2>Поиск бизнес партнёров</h2>
                <div className="row g-2 g-sm-3 g-xl-4">
                    {
                        categoriesData['3'].isLoading
                            ? categoriesData['3'].items.length
                                ? categoriesData['3'].items.map(item => (
                                    <div
                                        className="col-6 col-md-4 col-lg-3"
                                        key={item.id}
                                    >
                                        <AdvPreview
                                            url={`adv-page/${item.id}`}
                                            imgURL={item.url}
                                            title={item.title}
                                            summ={'400000'}
                                        />
                                    </div>
                                ))
                                : null
                            : <div className="p-5 w-100 d-flex justify-content-center">
                                <Loader color="#343434"/>
                            </div>
                    }
                </div>
                <NavLink to="category/3">
                    <button className="btn_main btn_1 mx-auto mt-4">Показать еще</button>
                </NavLink>
            </section>

            <section className="block_3 container">
                <h2>Продажа бизнеса</h2>
                <div className="row g-2 g-sm-3 g-xl-4">
                    {
                        categoriesData['4'].isLoading
                            ? categoriesData['4'].items.length
                                ? categoriesData['4'].items.map(item => (
                                    <div
                                        className="col-6 col-md-4 col-lg-3"
                                        key={item.id}
                                    >
                                        <AdvPreview
                                            url={`adv-page/${item.id}`}
                                            imgURL={item.url}
                                            title={item.title}
                                            summ={'400000'}
                                        />
                                    </div>
                                ))
                                : null
                            : <div className="p-5 w-100 d-flex justify-content-center">
                                <Loader color="#343434"/>
                            </div>
                    }
                </div>
                <NavLink to="category/4">
                    <button className="btn_main btn_1 mx-auto mt-4">Показать еще</button>
                </NavLink>
            </section>

            <section className="block_3 container">
                <h2>Франшизы</h2>
                <div className="row g-2 g-sm-3 g-xl-4">
                    {
                        categoriesData['5'].isLoading
                            ? categoriesData['5'].items.length
                                ? categoriesData['5'].items.map(item => (
                                    <div
                                        className="col-6 col-md-4 col-lg-3"
                                        key={item.id}
                                    >
                                        <AdvPreview
                                            url={`adv-page/${item.id}`}
                                            imgURL={item.url}
                                            title={item.title}
                                            summ={'400000'}
                                        />
                                    </div>
                                ))
                                : null
                            : <div className="p-5 w-100 d-flex justify-content-center">
                                <Loader color="#343434"/>
                            </div>
                    }
                </div>
                <NavLink to="category/5">
                    <button className="btn_main btn_1 mx-auto mt-4">Показать еще</button>
                </NavLink>
            </section>
        </>
    );
};

export default HomeCategoriesContainer;