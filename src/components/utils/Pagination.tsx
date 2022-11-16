import React from 'react'
import ReactPaginate from 'react-paginate'

interface Props {
    color?: string
    pageCount: number
    nextLabel: string
    onPageChange: ({selected}: {selected: number}) => void
    forcePage?: number
    pageRangeDisplayed?: number
    marginPagesDisplayed?: number
    previousLabel?: string
}

const Pagination: React.FC<Props> = (props) => {
    return (
        <nav aria-label="page-pagination">
            <ReactPaginate
                className="pagination"
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                nextClassName="page-item"
                previousLinkClassName="page-link"
                nextLinkClassName="page-link"
                breakClassName="page-item"
                breakLinkClassName="page-link"
                {...props}
            />
        </nav>
    )
}

export default Pagination
