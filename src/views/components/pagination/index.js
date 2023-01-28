import './style.scss'
import {useEffect, useState} from "react";

export const Pagination = ({numberOfPages, currentPage, prevPage, nextPage, isLoading, onGetPage}) => {
    const [visiblePages, setVisiblePages] = useState([])

    const getVisiblePage = (page) => {
        if (page === 0) {
            setVisiblePages([
                {pageNum: page + 1, status: false},
                {pageNum: page + 2, status: false},
                {pageNum: page + 3, status: false},
            ])
        } else if (page === 1) {
            setVisiblePages([
                {pageNum: page, status: false},
                {pageNum: page + 1, status: false},
                {pageNum: page + 2, status: false},
                {pageNum: page + 3, status: false},
            ])
        } else if (page === numberOfPages - 1) {
            setVisiblePages([
                {pageNum: page - 1, status: false},
                {pageNum: page, status: false},
                {pageNum: page + 1, status: false},
            ])
        } else if (page === numberOfPages - 2) {
            setVisiblePages([
                {pageNum: page - 2, status: false},
                {pageNum: page - 1, status: false},
                {pageNum: page, status: false},
                {pageNum: page + 1, status: false},
            ])
        } else {
            setVisiblePages([
                {pageNum: page - 1, status: false},
                {pageNum: page, status: false},
                {pageNum: page + 1, status: false},
                {pageNum: page + 2, status: false},
                {pageNum: page + 3, status: false},
            ])
        }
    }


    const getPageByNumber = (page) => {
        getVisiblePage(page)
        onGetPage(page)
    }
    const getPrevPage = () => {
        getVisiblePage(currentPage - 1)
        onGetPage(currentPage - 1)
    }
    const getNextPage = () => {
        getVisiblePage(currentPage + 1)
        onGetPage(currentPage + 1)
    }


    useEffect(() => {
        getVisiblePage(currentPage)
    }, [currentPage])


    return (
        <div className={'page-btns'}>
            <button className={'prev-next'} onClick={() => getPrevPage()} disabled={prevPage}>Prev
            </button>
            {numberOfPages ? visiblePages.map(elem => {
                return (
                    <button key={elem.pageNum - 1} className={elem.pageNum === currentPage + 1 ? 'selected-page number' : 'number'}
                            onClick={() => getPageByNumber(elem.pageNum - 1)}
                            disabled={!!isLoading}>{elem.pageNum}</button>
                )
            }) : []}
            <button className={'prev-next'} onClick={() => getNextPage()} disabled={nextPage}>Next
            </button>
        </div>
    )
}