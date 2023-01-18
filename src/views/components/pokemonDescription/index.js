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

    const loadPokemon = async (pokeName) => {
        try {
            // let urls = [];
            const res = await getPokemon(pokeName)
            // urls.push()
            // await Promise.all(
            //     res.data["characters"].map(url=>{
            //         return axios.get(url).then(character=>{
            //             array.push(character.data.name);
            //         })
            //     })
            // ).then(result=>{
            //     console.log("array:",array);
            //     JSON.stringify(array);
            // })

            console.log(res.data)
            setPokemon(res.data.name[0].toUpperCase() + res.data.name.slice(1))
            setPokemonId(res.data.id)
            setPokemonWeight(res.data.weight)
            setPokemonHeight(res.data.height)
            setPokemonAbilities(res.data.abilities)
            setPokemonType(res.data.types)
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
            <div className={'poke-info px-10 py-40'}>
                <div className={'poke-img'}>
                    <img
                        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`}
                        alt={pokemon}/>
                </div>
                <div className={'poke-descr'}>
                    <h3>DESCRIPTION</h3>
                    <div>
                        <p>Weight:</p> <span>{pokemonWeight}</span>
                    </div>
                    <div>
                        <p>Height:</p> <span>{pokemonHeight}</span>
                    </div>
                    <div className={'poke-abilities'}>
                        <p>Abilities:</p>
                        <div>
                            {pokemonAbilities.map(elem => {
                                return (
                                    <span key={elem.ability.name}>{elem.ability.name}</span>
                                )
                            })
                            }
                        </div>
                    </div>
                    <div className={'poke-types'}>
                        <p>Types:</p>
                        <div>
                            {pokemonType.map(elem => {
                                return (
                                    <span key={elem.type.name}>{elem.type.name}</span>
                                )
                            })
                            }
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )

}