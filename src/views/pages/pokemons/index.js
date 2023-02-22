import {useState, useEffect} from "react";
import {getPokemons} from "../../../services";
import {PokemonCard} from '../../components/pokemonCard'
import {Pagination} from "../../components/pagination";
import {useParams} from "react-router-dom";
import {useDispatch} from "react-redux";
import {handleLoadPokemons, handleLoadPokemonsSuccess, handleLoadPokemonsFailed} from '../../../store/actions/index'
import {reduxPokemons, reduxPokemonsLoading, reduxPokemonsError} from "../../../store/selectors";

import './style.scss'

export const Pokemons = ({searchingPokemon}) => {
    const {pageNum} = useParams()
    const pageSize = 10;
    // const [pokemons, setPokemons] = useState([])
    // const [isLoading, setIsLoading] = useState(false)
    const [numberOfPages, setNumberOfPages] = useState(0)
    const [currentPage, setCurrentPage] = useState(0)
    const [countOfPokemons, setCountOfPokemons] = useState(0)
    const dispatch = useDispatch()
    const reduxPokemons1 = reduxPokemons()
    const reduxIsLoading = reduxPokemonsLoading()
    const reduxError = reduxPokemonsError()


    // const findPokemon = async (value) => {
    //     setIsLoading(true)
    //     try {
    //         const res = await getPokemons(0, countOfPokemons)
    //         setPrevPage(true)
    //         setNextPage(true)
    //         setNumberOfPages(0)
    //         let arr = res?.data?.results
    //         let onSearchingPokemon = arr.filter(pokemon => {
    //             return pokemon.name.toUpperCase().includes(value.toUpperCase())
    //         })
    //         setPokemons(onSearchingPokemon)
    //     } catch (error) {
    //         console.log(error)
    //     } finally {
    //         setIsLoading(false);
    //     }
    // }

    const loadPokemons = async (offset, limit) => {
        dispatch(handleLoadPokemons())
        try {
            const res = await getPokemons(offset, limit)
            // setPokemons(res?.data?.results || [])
            dispatch(handleLoadPokemonsSuccess(res?.data?.results || []))
            setCountOfPokemons(res.data.count)
            setNumberOfPages(Math.ceil(res.data.count / pageSize))
        } catch (error) {
            dispatch(handleLoadPokemonsFailed(error))
        }
    }

    useEffect(() => {
        loadPokemons((pageNum - 1) * 10, pageSize)
    }, [pageNum])


    // useEffect(() => {
    //     if(searchingPokemon !== ''){
    //         findPokemon(searchingPokemon)
    //     }
    // }, [searchingPokemon])


    return (
        <div>
            <h2 className={'mx-40'}>Pokemons</h2>
            {reduxIsLoading ? <div className={'px-40'}>Loading..</div> :
                <div className={'pokemons-page'}>
                    <div className={'pokemons-block px-40'}>{reduxPokemons1?.length ? reduxPokemons1.map(pokemon =>
                            <PokemonCard
                                key={pokemon?.url} name={pokemon?.name}/>) :
                        <p>NotFound</p>}</div>
                    <Pagination numberOfPages={numberOfPages}/>
                </div>}
        </div>
    )
}
