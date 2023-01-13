import {useState, useEffect} from "react";
import {getPokemons} from "../../../services";
import {Link} from "react-router-dom";
import {Pagination} from "../../components/pagination";
import './style.scss'

export const Pokemons = () => {
    const pageSize = 10;
    const [pokemons, setPokemons] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [numberOfPages, setNumberOfPages] = useState(0)
    const [prevPage, setPrevPage] = useState(false)
    const [nextPage, setNextPage] = useState(false)
    // const {name} = useParams()

    const loadPokemons = async (offset, limit) => {
        setIsLoading(true)
        try {
            const res = await getPokemons(offset, limit)
            setPokemons(res?.data?.results || [])
            console.log(res?.data)
            setPrevPage(res?.data?.previous === null)
            setNextPage(res?.data?.next === null)
            setNumberOfPages(Math.ceil(res.data.count / pageSize))
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    }

    // const loadPokemon = async () => {
    //     try {
    //         const res = await getPokemon(name)
    //         console.log('POKEMON: ', res?.data)
    //
    //     } catch (error) {
    //         console.log(error)
    //     } finally {
    //
    //     }
    // }


    useEffect(() => {
        loadPokemons(0, pageSize)
    }, [])

    // useEffect(() => {
    //     loadPokemon()
    // }, [name])

    const Pokemon = ({name}) => <p className={'pokemon-in-main'}>
        <Link to={`/pokemons/${name}`}>
            {name}
        </Link>
    </p>

    return (
        <div className={'pokemons-page'}>
            <h2>Pokemons: </h2>
            {isLoading ? <div>Loading..</div> :
                <div className={'pokemons-block'}>{pokemons?.length ? pokemons.map(pokemon => <Pokemon key={pokemon?.url} name={pokemon?.name}/>) :
                    <p>NotFound</p>}</div>
            }
            <Pagination numberOfPages={numberOfPages} pageSize={pageSize} onLoadPokemons={loadPokemons}
                        prevPage={prevPage} nextPage={nextPage}/>
        </div>
    )
}
