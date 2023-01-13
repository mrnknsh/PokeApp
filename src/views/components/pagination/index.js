import './style.scss'
import {useEffect, useState} from "react";

export const Pagination = ({numberOfPages, pageSize, onLoadPokemons, prevPage, nextPage}) => {
    const [currentPage, setCurrentPage] = useState(0)
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

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const colorSelectedPage = () => {
        visiblePages.forEach(elem => elem.status = false)
        // eslint-disable-next-line array-callback-return
        visiblePages.find(elem => {
            if (elem.pageNum === currentPage+1) {
                elem.status = true
            }
        })
    }

    useEffect(() => {
        colorSelectedPage()
    }, [colorSelectedPage])

    const getPageByNumber = (page) => {
        setCurrentPage(page)
        onLoadPokemons(page * pageSize, pageSize)
        getVisiblePage(page)
    }
    const getPrevPage = () => {
        onLoadPokemons((currentPage - 1) * pageSize, pageSize)
        getVisiblePage(currentPage - 1)
        setCurrentPage(currentPage - 1)
    }
    const getNextPage = () => {
        onLoadPokemons((currentPage + 1) * pageSize, pageSize)
        getVisiblePage(currentPage + 1)
        setCurrentPage(currentPage + 1)
    }


    useEffect(() => {
        getVisiblePage(0)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    return (
        <div className={'page-btns'}>
            <button className={'prev-next'} onClick={() => getPrevPage()} disabled={prevPage}>Prev</button>
            {visiblePages?.length && visiblePages.map(elem => {
                return (
                    <button key={elem.pageNum - 1} className={elem.status ? 'selected-page number' : 'number'} onClick={() => {
                        getPageByNumber(elem.pageNum - 1)
                    }}>{elem.pageNum}</button>
                )
            })}
            <button className={'prev-next'} onClick={() => getNextPage()} disabled={nextPage}>Next</button>
        </div>
    )
}