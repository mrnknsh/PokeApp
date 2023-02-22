import './style.scss'
import {Link, useParams} from "react-router-dom";


export const Pagination = ({numberOfPages}) => {
    const {pageNum} = useParams()

    return (
        <div className={'page-btns'}>
            {pageNum > 5 && <button><Link to={`/pokemons/page/${1}`}>{1}</Link></button>}
            {pageNum > 5 && <span>...</span>}
            {pageNum > 2 && <button><Link to={`/pokemons/page/${+pageNum - 2}`} >{+pageNum - 2}</Link></button>}
            {pageNum > 1 && <button><Link to={`/pokemons/page/${+pageNum - 1}`} >{+pageNum - 1}</Link></button>}
            <button className={'selected-page'}>{pageNum}</button>
            {pageNum < numberOfPages && <button><Link to={`/pokemons/page/${+pageNum + 1}`}>{+pageNum + 1}</Link></button>}
            {pageNum < numberOfPages - 1 && <button><Link to={`/pokemons/page/${+pageNum + 2}`}>{+pageNum + 2}</Link></button>}
            {pageNum < numberOfPages - 4 && <span>...</span>}
            {pageNum < numberOfPages - 4 && <button><Link to={`/pokemons/page/${numberOfPages}`}>{numberOfPages}</Link></button>}
        </div>
    )
}