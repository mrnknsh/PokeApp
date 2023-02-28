import {useEffect, useState} from "react";
import {PokemonCard} from "../../components/pokemonCard";
import {getPokemons, getSearchingPokemons} from "../../../services";
import {useParams} from "react-router-dom";

export const Search = () => {
    const [pokemonsData, setPokemonsData] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const {names} = useParams()

    const loadPokemons = async () => {
        setIsLoading(true)
        try {
            const getCountOfPokemons = await getPokemons(0, 10)
            const getAllPokemons = await getSearchingPokemons(getCountOfPokemons)
            const allPokemons = getAllPokemons?.data?.results
            const sortAllPokemons = allPokemons.filter(pokemon => {
                return pokemon.name.toUpperCase().includes(names.toUpperCase())
            })
            setPokemonsData(sortAllPokemons)
        } catch {
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        if (names !== '') {
            loadPokemons()
        }
    }, [names])

    return (
        <div className={'pokemons-page'}>
            <h2 className={'mx-40'}>Pokemons</h2>
            {isLoading ? <div>Loading..</div> :
                <>{pokemonsData?.length ?
                    <div className={'pokemons-block px-40'}>{pokemonsData.map(pokemon => <PokemonCard key={pokemon?.url}
                                                                                                      name={pokemon?.name}/>)}</div> :
                    <p className={'px-40'}>Not Found</p>}</>
            }
        </div>
    )
}