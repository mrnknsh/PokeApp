import {useState, useEffect} from "react";
import {getPokemons, getPokemon} from "../../../services";
import {useParams, Link} from "react-router-dom";
import {Pagination} from "../../components/pagination";


export const Pokemons = () => {
    const pageSize = 10;
    const [pokemons, setPokemons] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [numberOfPages, setNumberOfPages] = useState([])
    const [arr, setArr] = useState([])
    const [currentPage, setCurrentPage] = useState(0)
    // const {name} = useParams()

    const loadPokemons = async () => {
        setIsLoading(true)
        try {
            const res = await getPokemons(pageSize, currentPage * 10)
            setPokemons(res?.data?.results || [])
            setNumberOfPages(Array.from({length: Math.ceil(res.data.count / pageSize)}, (v, k) => k + 1))
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
        loadPokemons()
        if (currentPage === 0) {
            setArr([1, 2, 3])
        } else if (currentPage === numberOfPages - 1) {
            setArr([currentPage - 2, currentPage - 1, currentPage])
        } else if (currentPage > 0 || currentPage < numberOfPages - 1) {
            setArr([currentPage - 1, currentPage, currentPage + 1])
        }
        else {
            setArr([])
        }
    }, [])

    // useEffect(() => {
    //     loadPokemon()
    // }, [name])

    const Pokemon = ({name}) => <p>
        <Link to={`/pokemons/${name}`}>
            {name}
        </Link>
    </p>

    return (
        <div>
            <h2>Pokemons: </h2>
            {isLoading ? <div>Loading..</div> :
                <div>{pokemons?.length ? pokemons.map(pokemon => <Pokemon key={pokemon?.url} name={pokemon?.name}/>) :
                    <p>NotFound</p>}</div>
            }
            <Pagination arr={arr}/>
        </div>
    )
}
