import {useEffect, useState} from 'react'

const usePagination = (items: any, limit: number, total: number | undefined, currPage?: any) => {
    const [paginationItems, setPaginationItems] = useState([])
    const [pageCount, setPageCount] = useState<number>(0)
    const [itemOffset, setItemOffset] = useState<number>(0)
    const [selectedPage, setSelectedPage] = useState<number>(0)

    useEffect(() => {
        const endOffset = itemOffset + limit

        setPaginationItems(items?.slice(itemOffset, endOffset))
        if ((total && limit) || (total === 0 && limit)) {
            setPageCount(Math.ceil(total / limit))
        }
    }, [itemOffset, limit, items, total])

    const handlePageClick = ({selected}: {selected: number}) => {
        const newOffset = (selected * limit) % items?.length
        currPage(selected)
        setSelectedPage(selected)
        setItemOffset(newOffset)
    }

    return {pageCount, paginationItems, selectedPage, setSelectedPage, handlePageClick}
}

export default usePagination
