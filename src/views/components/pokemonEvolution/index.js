import axios from "axios";
import {useEffect, useState} from "react";
import {getPokemon} from "../../../services";
import {API} from "../../../API";
import './style.scss'
import {Link} from "react-router-dom";

export const PokemonEvolution = ({pokeName}) => {
    const [evolution, setEvolution] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const getEvolution = async (pokeName) => {
        try {
            setIsLoading(true)
            let evolutionNames = []
            let evolutionUrls = []
            let evolutionIds = []

            const pokemonRes = await getPokemon(pokeName)

            const speciesRes = await axios.get(pokemonRes?.data?.species?.url)

            const evolutionChainRes = await axios.get(speciesRes.data.evolution_chain.url)

            evolutionNames.push(evolutionChainRes?.data?.chain?.species?.name)
            if (evolutionChainRes?.data?.chain?.evolves_to?.length) {
                evolutionNames.push(evolutionChainRes?.data?.chain?.evolves_to[0]?.species?.name)
            }
            if (evolutionChainRes?.data?.chain?.evolves_to[0]?.evolves_to?.length) {
                evolutionNames.push(evolutionChainRes?.data?.chain?.evolves_to[0]?.evolves_to[0]?.species?.name)
            }
            evolutionNames.forEach(name => evolutionUrls.push(`${API}/pokemon/${name}`))

            const pokemonsIdRes = await axios.all(evolutionUrls.map(url => axios.get(url)))
            pokemonsIdRes.forEach(id => evolutionIds.push(id.data.id));
            setEvolution(evolutionIds.map((id, index) => ({id, name: evolutionNames[index]})))

        } catch
            (error) {
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        getEvolution(pokeName)
        window.scrollTo(0, 0)
    }, [pokeName])

    return (
        <div className={'evolution-wrapper'}>
            {isLoading ? <p>Evolution is loading..</p> : <>
                <h3 id={'start'}>Pokemon's evolution tree</h3>
                {evolution?.length > 0 &&
                evolution.map((elem, index) => {
                    return (
                        <div className={'evolution-item'} key={elem.id}>
                            <p className={'evolution-step'}>Evolution step {index + 1}</p>
                            <img
                                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${elem.id}.png`}
                                alt={elem.name}/>
                            <p>
                                <Link
                                    to={`/pokemons/${elem.name}`}
                                    className={pokeName === elem.name ? 'pointer-none' : ''}>
                                    {elem.name[0].toUpperCase() + elem.name.slice(1)}
                                </Link>
                            </p>
                        </div>
                    )
                })
                }
            </>
            }
        </div>
    )
}