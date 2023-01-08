import {useState, useEffect} from "react";
import {getPokemons, getPokemon} from "../../../services";
import {useParams, Link} from "react-router-dom";


export const Pokemons = () => {
    const [pokemons, setPokemons] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const {name} = useParams()

    const loadPokemons = async () => {
        setIsLoading(true)
        try {
            const res = await getPokemons(10, 0)
            setPokemons(res?.data?.results || [])
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    }

    const loadPokemon = async () => {
        try {
            const res = await getPokemon(name)
            console.log('POKEMON: ', res?.data)

        } catch (error) {
            console.log(error)
        } finally {

        }
    }

    useEffect(() => {
        loadPokemons()
    }, [])

    useEffect(() => {
        loadPokemon()
    }, [name])

    const Pokemon = ({name}) => <p>
        <Link to={`/pokemons/${name}`}>
            {name}
        </Link>
    </p>

    return (
        <div>
            <h2>Pokemons: {name}</h2>
            {isLoading ? <div>Loading..</div> :
                <div>{pokemons?.length ? pokemons.map(pokemon => <Pokemon key={pokemon?.url} name={pokemon?.name}/>) :
                    <p>NotFound</p>}</div>
            }
        </div>
    )
}
