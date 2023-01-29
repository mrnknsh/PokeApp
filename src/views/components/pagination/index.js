import { Link, useParams } from 'react-router-dom';
import './style.scss'

export const Pagination = ({numberOfPages, isLoading}) => {
    const { pageNum } = useParams()

    return (
        <div className={'page-btns'}>
            {isLoading ? <p>Loading...</p> :
            <div>
                {pageNum > 2 && <Link to={`/pokemons/page/${+pageNum - 2}`} >{+pageNum - 2}</Link>}
                {pageNum > 1 && <Link to={`/pokemons/page/${+pageNum - 1}`} >{+pageNum - 1}</Link>}
                <button className={'selected-page number'} disabled={true}>{pageNum}</button>
                {pageNum < numberOfPages && <Link to={`/pokemons/page/${+pageNum + 1}`} >{+pageNum + 1}</Link>}
                {pageNum < numberOfPages - 1 && <Link to={`/pokemons/page/${+pageNum + 2}`} >{+pageNum + 2}</Link>}
            </div>}
        </div>
    )
}