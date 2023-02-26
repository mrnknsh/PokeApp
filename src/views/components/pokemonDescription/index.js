import {getPokemon} from "../../../services";
import {useEffect, useState} from "react";
import './style.scss'
import '../../../style.scss'

export const PokemonDescription = ({pokeName}) => {
    const [pokemonData, setPokemonData] = useState(null)
    const [isLoading, setIsLoading] = useState(false)


    const loadPokemon = async (pokeName) => {
        setIsLoading(true)
        try {
            const res = await getPokemon(pokeName)
            setPokemonData(res?.data)
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        loadPokemon(pokeName)
    }, [pokeName])


    return (
        isLoading ? <h4>Description is loading...</h4> :
            <div className={'pokemon-description'}>
                {pokemonData?.name && <h2 className={'mx-40'}>{pokemonData.name.toUpperCase()}</h2>}
                <div className={'poke-info px-40'}>
                    <div className={'poke-img'}>
                        {pokemonData?.id && <img
                            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonData.id}.png`}
                            alt={pokemonData.id}/>}
                    </div>
                    <div className={'poke-descr'}>
                        <h3>Description</h3>
                        <p>Weight:</p> {pokemonData?.weight && <span>{pokemonData.weight}</span>}
                        <br/>
                        <p>Height:</p> {pokemonData?.height && <span>{pokemonData.height}</span>}
                        <div className={'poke-abilities'}>
                            <p>Abilities:</p>
                            <div>
                                {pokemonData?.abilities && pokemonData.abilities.map(elem => <span
                                    key={elem.ability.name}>{elem.ability.name}</span>)}</div>
                        </div>
                        <div className={'poke-types'}>
                            <p>Types:</p>
                            <div>
                                {pokemonData?.types && pokemonData.types.map(elem => <span
                                    key={elem.type.name}>{elem.type.name}</span>)}
                            </div>
                        </div>
                    </div>
                    <div className={'poke-stat'}>
                        <h3>Statistics</h3>
                        <div className={'stats-wrapper'}>
                            {pokemonData?.stats && pokemonData.stats.map((elem) => {
                                return (
                                    <div key={elem.stat.name}>
                                        <p style={{backgroundImage: `linear-gradient(to top, hotpink ${elem.base_stat}%, rgba(0,0,0,0) ${elem.base_stat}%)`}}
                                           className={'canvas'}/>
                                        <p>{elem.stat.name[0].toUpperCase() + elem.stat.name.slice(1)}</p>
                                    </div>
                                )
                            })
                            }
                        </div>
                    </div>
                </div>
            </div>
    )
}