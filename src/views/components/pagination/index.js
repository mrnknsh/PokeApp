import './style.scss'
import {useEffect, useState} from "react";

export const Pagination = ({numberOfPages, pageSize, onLoadPokemons, prevPage, nextPage}) => {
    const [currentPage, setCurrentPage] = useState(0)
    const [visiblePages, setVisiblePages] = useState([])

    const getVisiblePage = (page) => {
        if (page === 0) {
            setVisiblePages([page + 1, page + 2, page + 3])
        } else if (page === 1) {
            setVisiblePages([page, page + 1, page + 2, page + 3])
        } else if (page === numberOfPages - 1) {
            setVisiblePages([page - 1, page, page + 1])
        } else if (page === numberOfPages - 2) {
            setVisiblePages([page - 2, page - 1, page, page + 1])
        } else {
            setVisiblePages([page - 1, page, page + 1, page + 2, page + 3])
        }
    }


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
    }, [])


    return (
        <div className={'page-btns'}>
            <button className={'prev-next'} onClick={() => getPrevPage()} disabled={prevPage}>Prev</button>
            {visiblePages.map(elem => {
                return (
                    <button key={elem - 1} className={'number'} onClick={() => {
                        getPageByNumber(elem - 1)
                    }}>{elem}</button>
                )
            })}
            <button className={'prev-next'} onClick={() => getNextPage()} disabled={nextPage}>Next</button>
        </div>
    )
}