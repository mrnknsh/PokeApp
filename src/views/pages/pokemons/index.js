import {useState, useEffect} from "react";
import {getPokemons} from "../../../services";
import {PokemonCard} from '../../components/pokemonCard'
import {Pagination} from "../../components/pagination";
import {useParams} from "react-router-dom";
import {useDispatch} from "react-redux";
import {handleLoadPokemons, handleLoadPokemonsSuccess, handleLoadPokemonsFailed} from '../../../store/actions/index'
import {reduxPokemons, reduxPokemonsLoading, reduxPokemonsError} from "../../../store/selectors";

import './style.scss'

export const Pokemons = () => {
    const {pageNum} = useParams()
    const pageSize = 10;
    const [numberOfPages, setNumberOfPages] = useState(0)
    const dispatch = useDispatch()
    const reduxGetPokemons = reduxPokemons()
    const reduxIsPokemonsLoading = reduxPokemonsLoading()
    const reduxGetPokemonsError = reduxPokemonsError()

    const loadPokemons = async (offset, limit) => {
        dispatch(handleLoadPokemons())
        try {
            const res = await getPokemons(offset, limit)
            dispatch(handleLoadPokemonsSuccess(res?.data?.results || []))
            setNumberOfPages(Math.ceil(res.data.count / pageSize))
        } catch (error) {
            dispatch(handleLoadPokemonsFailed(error))
            console.log(reduxGetPokemonsError)
        }
    }

    useEffect(() => {
        loadPokemons((pageNum - 1) * 10, pageSize)
    }, [pageNum])

    return (
        <div>
            <h2 className={'mx-40'}>Pokemons</h2>
            {reduxIsPokemonsLoading ? <div className={'px-40'}>Loading..</div> :
                <div className={'pokemons-page'}>
                    <div className={'pokemons-block px-40'}>{reduxGetPokemons?.length ? reduxGetPokemons.map(pokemon =>
                            <PokemonCard
                                key={pokemon?.url} name={pokemon?.name}/>) :
                        <p>NotFound</p>}</div>
                    <Pagination numberOfPages={numberOfPages}/>
                </div>}
        </div>
    )
}
