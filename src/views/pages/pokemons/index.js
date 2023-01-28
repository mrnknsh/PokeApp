import {useState, useEffect} from "react";
import {getPokemons} from "../../../services";
import {PokemonCard} from '../../components/pokemonCard'
import { useNavigate, createSearchParams } from 'react-router-dom'
import {Pagination} from "../../components/pagination";
import './style.scss'

export const Pokemons = ({searchingPokemon}) => {
    const navigate = useNavigate();

    const pageSize = 10;
    const [pokemons, setPokemons] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [numberOfPages, setNumberOfPages] = useState(0)
    const [prevPage, setPrevPage] = useState(false)
    const [nextPage, setNextPage] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [countOfPokemons, setCountOfPokemons] = useState(0)

    const getPage = num => {
        setCurrentPage(num);
    };

    const urlParams = new URLSearchParams(window.location.search)
    const page = urlParams.get('page')


    const findPokemon = async (value) => {
        setIsLoading(true)
        try {
            const res = await getPokemons(0, countOfPokemons)
            setPrevPage(true)
            setNextPage(true)
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
            setPrevPage(res?.data?.previous === null)
            setNextPage(res?.data?.next === null)
            setCountOfPokemons(res.data.count)
            setNumberOfPages(Math.ceil(res.data.count / pageSize))
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        navigate({
            pathname: "/pokemons",
            search: createSearchParams({
                page: currentPage + 1
            }).toString()
        });
        loadPokemons(currentPage * 10, pageSize)
    } , [currentPage])

    useEffect(() => {
        if(searchingPokemon !== ''){
            findPokemon(searchingPokemon)
        }
    }, [searchingPokemon])

    useEffect(() => {
        if (!page) {
            loadPokemons(currentPage * 10, pageSize)
        } else {
            setCurrentPage(+page - 1);
            loadPokemons(+page * 10, pageSize)
        }
    }, [])

    return (
        <div className={'pokemons-page'}>
            <h2 className={'mx-40'}>Pokemons</h2>
            {isLoading ? <div>Loading..</div> :
                <div className={'pokemons-block px-40'}>{pokemons?.length ? pokemons.map(pokemon => <PokemonCard
                        key={pokemon?.url} name={pokemon?.name}/>) :
                    <p>NotFound</p>}</div>
            }
            <Pagination numberOfPages={numberOfPages} pageSize={pageSize} onLoadPokemons={loadPokemons} currentPage={currentPage}
                        prevPage={prevPage} nextPage={nextPage} isLoading={isLoading} onGetPage={getPage}/>
        </div>
    )
}
