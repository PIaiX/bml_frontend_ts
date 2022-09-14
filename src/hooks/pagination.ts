import {useEffect, useState} from 'react';

const usePagination = (items, limit: number) => {
    const [paginationItems, setPaginationItems] = useState([])
    const [pageCount, setPageCount] = useState(0)
    const [itemOffset, setItemOffset] = useState(0)
    const [selectedPage, setSelectedPage] = useState(0)

    useEffect(() => {
        const endOffset = itemOffset + limit

        setPaginationItems(items.slice(itemOffset, endOffset))
        setPageCount(Math.ceil(items.length / limit))
    }, [itemOffset, limit, items])

    const handlePageClick = ({selected}) => {
        const newOffset = selected * limit % items.length

        setSelectedPage(selected)
        setItemOffset(newOffset)
    };

    return {pageCount, paginationItems, selectedPage, handlePageClick}
}

export default usePagination