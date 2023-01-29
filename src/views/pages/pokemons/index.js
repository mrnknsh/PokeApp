import {useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {getPokemons} from "../../../services";
import {PokemonCard} from '../../components/pokemonCard'
import {Pagination} from "../../components/pagination";
import './style.scss'

export const Pokemons = ({searchingPokemon}) => {
    const { pageNum } = useParams()

    const pageSize = 10;
    const [pokemons, setPokemons] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [numberOfPages, setNumberOfPages] = useState(0)
    const [countOfPokemons, setCountOfPokemons] = useState(0)
    const [mounted, setMounted] = useState(false)

    const findPokemon = async (value) => {
        setIsLoading(true)
        try {
            const res = await getPokemons(0, countOfPokemons)
            setNumberOfPages(0)
            let arr = res?.data?.results
            let onSearchingPokemon = arr.filter(pokemon => {
                return pokemon.name.toUpperCase().includes(value.toUpperCase())
            })
            setPokemons(onSearchingPokemon)
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false);
        }
    }

    const loadPokemons = async (offset, limit) => {
        setIsLoading(true)
        try {
            const res = await getPokemons(offset, limit)
            setPokemons(res?.data?.results || [])
            setCountOfPokemons(res.data.count)
            setNumberOfPages(Math.ceil(res.data.count / pageSize))
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        if (mounted) { 
            loadPokemons((pageNum -1) * 10, pageSize) 
        } else {
            setMounted(true)
        }
    } , [pageNum, mounted])

    useEffect(() => {
        if(searchingPokemon !== ''){
            findPokemon(searchingPokemon)
        }
    }, [searchingPokemon])

    return (
        <div className={'pokemons-page'}>
            <h2 className={'mx-40'}>Pokemons</h2>
            {isLoading ? <div>Loading..</div> :
                <div className={'pokemons-block px-40'}>{pokemons?.length ? pokemons.map(pokemon => <PokemonCard
                        key={pokemon?.url} name={pokemon?.name}/>) :
                    <p>NotFound</p>}</div>
            }
            <Pagination numberOfPages={numberOfPages} isLoading={isLoading}/>
        </div>
    )
}
