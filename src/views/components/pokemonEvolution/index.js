import axios from "axios";
import {useEffect, useState} from "react";
import {getPokemon} from "../../../services";
import {API} from "../../../API";
import './style.scss'
import {Link} from "react-router-dom";

export const PokemonEvolution = ({pokeName}) => {
    const [evolution, setEvolution] = useState([])


    const getEvolution = async (pokeName) => {
        try {
            const evolutionNames = []
            const evolutionUrls = []
            const evolutionIds = []
            const res = await getPokemon(pokeName)
            await axios.get(res.data.species.url)
                .then(response => axios.get(response.data.evolution_chain.url))
                .then(response => {
                        evolutionNames.push(response.data.chain.species.name)
                        if (response.data.chain.evolves_to.length) {
                            evolutionNames.push(response.data.chain.evolves_to[0].species.name)
                        }
                        if (response.data.chain.evolves_to[0].evolves_to.length) {
                            evolutionNames.push(response.data.chain.evolves_to[0].evolves_to[0].species.name)
                        }
                        evolutionNames.forEach(elem => evolutionUrls.push(`${API}/pokemon/${elem}`))
                    }
                )
            await axios.all(evolutionUrls.map(url => axios.get(url)))
                .then(res => res.forEach(elem => evolutionIds.push(elem.data.id)));
            setEvolution(evolutionIds.map((id, index) => ({id, name: evolutionNames[index]})))
        } catch (error) {
            console.log(error)
        } finally {

        }
    }

    useEffect(() => {
        getEvolution(pokeName)
        window.scrollTo(0, 0)
    }, [pokeName])

    return (
        <div className={'evolution-wrapper'}>
            <h3 id={'start'}>Pokemon's evolution tree</h3>
            {
                evolution.map((elem, index) => {
                    return (
                        <div className={'evolution-item'}>
                            <p key={index + 1} className={'evolution-step'}>Evolution step {index + 1}</p>
                            <img
                                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${elem.id}.png`}
                                alt={elem.name} key={elem.id * 1000}/>
                            <p>
                                <Link
                                    to={`/pokemons/${elem.name}`}
                                    className={pokeName === elem.name ? 'pointer-none' : ''}
                                >
                                    {elem.name[0].toUpperCase() + elem.name.slice(1)}
                                </Link>
                            </p>
                        </div>
                    )
                })
            }
        </div>
    )
}