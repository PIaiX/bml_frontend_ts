import {IOffersItem} from './offers'
import {Dispatch, SetStateAction} from 'react'

export interface User {
    firstName: string
    lastName: string
    middleName: string
    birthDate: string
    email: string
    phone: string
    town: string
}

export interface NewsItem {
    title: string
}

export interface CategoryItem {
    id: number
    url: string
    title: string
}

export type IUseStateItems<items, meta> = {
    isLoaded: boolean
    items: Array<items> | null
    meta: meta | null
}

export type IUseStateItem<item> = {
    isLoaded: boolean
    item: item | null
}

export type IPagination<item> = {
    paginationItems: Array<item>
    pageCount: number
    selectedPage: number
    setSelectedPage: Dispatch<SetStateAction<number>>
    handlePageClick: ({selected}: {selected: number}) => void
}
