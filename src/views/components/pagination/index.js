import './style.scss'
import {useEffect, useState} from "react";

export const Pagination = ({numberOfPages, pageSize, onLoadPokemons, prevPage, nextPage}) => {
    const [currentPage, setCurrentPage] = useState(0)
    const [visiblePages, setVisiblePages] = useState([])



    const getVisiblePage = () => {
        if (currentPage == 0) {
            setVisiblePages([currentPage + 1, currentPage + 2, currentPage + 3])
        } else if (currentPage == 1) {
            setVisiblePages([currentPage, currentPage + 1, currentPage + 2, currentPage + 3])
        } else if (currentPage === numberOfPages - 1) {
            setVisiblePages([currentPage - 1, currentPage, currentPage + 1])
        } else if (currentPage === numberOfPages - 2) {
            setVisiblePages([currentPage - 2, currentPage - 1, currentPage, currentPage + 1])
        } else {
            setVisiblePages([currentPage - 2, currentPage - 1, currentPage, currentPage + 1, currentPage + 2])
        }
    }

    const getPageByNumber = (page) => {
        setCurrentPage(page)
        onLoadPokemons(page * pageSize, pageSize)
        getVisiblePage()
        console.log(currentPage)
    }
    const getPrevPage = () => {
        onLoadPokemons((currentPage - 1) * pageSize, pageSize)
        setCurrentPage(currentPage - 1)
        getVisiblePage()
    }
    const getNextPage = () => {
        onLoadPokemons((currentPage + 1) * pageSize, pageSize)
        setCurrentPage(currentPage + 1)
        getVisiblePage()
    }

    useEffect(() => {
        getVisiblePage()
    }, [])


    return (
        <div className={'page-btns'}>
            <button className={'prev-next'} onClick={() => getPrevPage()} disabled={prevPage}>Prev</button>
            {visiblePages.map(elem => {
                return (
                    <button key={elem - 1} className={'number'}
                            onClick={() => getPageByNumber(elem - 1)}>{elem}</button>
                )
            })}
            <button className={'prev-next'} onClick={() => getNextPage()} disabled={nextPage}>Next</button>
        </div>
    )
}