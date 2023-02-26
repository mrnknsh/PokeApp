import {useEffect, useState} from "react";
import {PokemonCard} from "../../components/pokemonCard";
import {getPokemons} from "../../../services";

export const Search = ({searchingPokemons}) =>{
    const [pokemonsData, setPokemonsData] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const loadPokemons = async () =>{
        setIsLoading(true)
        try{
            const res = await getPokemons(0, 100)
            const allPokemons = res?.data?.result
            const sortAllPokemons = allPokemons.filter(pokemon => {
                return pokemon.name.toUpperCase().includes(value.toUpperCase())
            })
            setPokemonsData(sortAllPokemons)
        }
        catch {
            console.log(error)
        }
        finally {
            setIsLoading(false)
        }
    }

    useEffect(()=>{
        if(searchingPokemons !== ''){
            loadPokemons()
        }
    }, [searchingPokemons])

    return(
        <div className={'pokemons-page'}>
            <h2 className={'mx-40'}>Pokemons</h2>
            {isLoading ? <div>Loading..</div> :
                <div className={'pokemons-block px-40'}>{pokemonsData?.length ? pokemonsData.map(pokemon => <PokemonCard
                        key={pokemon?.url} name={pokemon?.name}/>) :
                    <p>NotFound</p>}</div>
            }
        </div>
    )
}