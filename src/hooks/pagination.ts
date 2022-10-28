import {useEffect, useState} from 'react'

const usePagination = (items: any, limit: number, total: any) => {
    const [paginationItems, setPaginationItems] = useState([])
    const [pageCount, setPageCount] = useState<number>(0)
    const [itemOffset, setItemOffset] = useState<number>(0)
    const [selectedPage, setSelectedPage] = useState<number>(0)

    useEffect(() => {
        const endOffset = itemOffset + limit

        setPaginationItems(items?.slice(itemOffset, endOffset))
        setPageCount(Math.ceil(total / limit))
    }, [itemOffset, limit, items, total])

    const handlePageClick = ({selected}: any) => {
        const newOffset = (selected * limit) % items?.length

        setSelectedPage(selected)
        setItemOffset(newOffset)
    }

    return {pageCount, paginationItems, selectedPage, setSelectedPage, handlePageClick}
}

export default usePagination
