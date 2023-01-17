import {useState, useEffect} from "react";
import {getPokemons} from "../../../services";
import {PokemonCard} from '../../components/pokemonCard'
import {Pagination} from "../../components/pagination";
import './style.scss'

export const Pokemons = () => {
    const pageSize = 10;
    const [pokemons, setPokemons] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [numberOfPages, setNumberOfPages] = useState(0)
    const [prevPage, setPrevPage] = useState(false)
    const [nextPage, setNextPage] = useState(false)


    const loadPokemons = async (offset, limit) => {
        setIsLoading(true)
        try {
            const res = await getPokemons(offset, limit)
            setPokemons(res?.data?.results || [])
            setPrevPage(res?.data?.previous === null)
            setNextPage(res?.data?.next === null)
            setNumberOfPages(Math.ceil(res.data.count / pageSize))
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        loadPokemons(0, pageSize)
    }, [])

    return (
        <div className={'pokemons-page'}>
            <h2>Pokemons</h2>
            {isLoading ? <div>Loading..</div> :
                <div className={'pokemons-block'}>{pokemons?.length ? pokemons.map(pokemon => <PokemonCard key={pokemon?.url} name={pokemon?.name}/>) :
                    <p>NotFound</p>}</div>
            }
            <Pagination numberOfPages={numberOfPages} pageSize={pageSize} onLoadPokemons={loadPokemons}
                        prevPage={prevPage} nextPage={nextPage} isLoading={isLoading}/>
        </div>
    )
}
