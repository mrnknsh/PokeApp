import {getPokemon} from "../../../services";
import {useEffect, useState} from "react";
import './style.scss'
import '../../../style.scss'

export const PokemonDescription = ({pokeName}) => {
    const [pokemon, setPokemon] = useState([])
    const [pokemonId, setPokemonId] = useState([])
    const [pokemonWeight, setPokemonWeight] = useState([])
    const [pokemonHeight, setPokemonHeight] = useState([])
    const [pokemonAbilities, setPokemonAbilities] = useState([])
    const [pokemonType, setPokemonType] = useState([])
    const [pokemonStat, setPokemonStat] = useState([])

    const loadPokemon = async (pokeName) => {
        try {
            const res = await getPokemon(pokeName)
            setPokemon(res.data.name.toUpperCase())
            setPokemonId(res.data.id)
            setPokemonWeight(res.data.weight)
            setPokemonHeight(res.data.height)
            setPokemonAbilities(res.data.abilities)
            setPokemonType(res.data.types)
            setPokemonStat(res.data.stats)
        } catch (error) {
            console.log(error)
        } finally {

        }
    }

    useEffect(() => {
        loadPokemon(pokeName)
    }, [pokeName])


    return (
        <div className={'pokemon-description'}>
            <h2 className={'mx-40'}>{pokemon}</h2>
            <div className={'poke-info px-40'}>
                <div className={'poke-img'}>
                    <img
                        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`}
                        alt={pokemon}
                    key={pokemonId+pokemon}/>
                </div>
                <div className={'poke-descr'}>
                    <h3>Description</h3>
                    <p>Weight:</p> <span>{pokemonWeight}</span>
                    <br/>
                    <p>Height:</p> <span>{pokemonHeight}</span>
                    <div className={'poke-abilities'}>
                        <p>Abilities:</p>
                        <div>
                            {pokemonAbilities.map(elem => <span key={elem.ability.name}>{elem.ability.name}</span>)}                       </div>
                    </div>
                    <div className={'poke-types'}>
                        <p>Types:</p>
                        <div>
                            {pokemonType.map(elem => <span key={elem.type.name}>{elem.type.name}</span>)}
                        </div>
                    </div>
                </div>
                <div className={'poke-stat'}>
                    <h3>Statistics</h3>
                    <div className={'stats-wrapper'}>
                        {pokemonStat.map((elem, index) => {
                            return (
                                <div>
                                    <p key={elem.stat.name}
                                       style={{backgroundImage: `linear-gradient(to top, hotpink ${elem.base_stat}%, rgba(0,0,0,0) ${elem.base_stat}%)`}}
                                       className={'canvas'}/>
                                    <p key={index+elem.stat.name}>{elem.stat.name[0].toUpperCase() + elem.stat.name.slice(1)}</p>
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