import {getPokemon} from "../../../services";
import {useEffect} from "react";
import './style.scss'
import '../../../style.scss'
import {useDispatch} from "react-redux";
import {reduxPokemon, reduxPokemonError, reduxPokemonLoading} from "../../../store/selectors";
import {handleLoadPokemon, handleLoadPokemonSuccess, handleLoadPokemonFailed} from "../../../store/actions";

export const PokemonDescription = ({pokeName}) => {
    const dispatch = useDispatch()
    const reduxGetPokemon = reduxPokemon()
    const reduxIsPokemonLoading = reduxPokemonLoading()
    const reduxGetPokemonError = reduxPokemonError()

    const loadPokemon = async (pokeName) => {
        dispatch(handleLoadPokemon())
        try {
            const res = await getPokemon(pokeName)
            dispatch(handleLoadPokemonSuccess(res?.data || []))
        } catch (error) {
            dispatch(handleLoadPokemonFailed(error))
            console.log(reduxGetPokemonError())
        }
    }

    useEffect(() => {
        loadPokemon(pokeName)
    }, [pokeName])


    return (
        <div>
            {reduxIsPokemonLoading ? <h4>Description is loading...</h4> :
                <div className={'pokemon-description'}>
                    {reduxGetPokemon?.name && <h2 className={'mx-40'}>{reduxGetPokemon.name.toUpperCase()}</h2>}
                    <div className={'poke-info px-40'}>
                        <div className={'poke-img'}>
                            {reduxGetPokemon?.id && <img
                                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${reduxGetPokemon.id}.png`}
                                alt={reduxGetPokemon.id}/>}
                        </div>
                        <div className={'poke-descr'}>
                            <h3>Description</h3>
                            <p>Weight:</p> {reduxGetPokemon?.weight && <span>{reduxGetPokemon.weight}</span>}
                            <br/>
                            <p>Height:</p> {reduxGetPokemon?.height && <span>{reduxGetPokemon.height}</span>}
                            <div className={'poke-abilities'}>
                                <p>Abilities:</p>
                                <div>
                                    {reduxGetPokemon?.abilities && reduxGetPokemon.abilities.map(elem => <span
                                        key={elem.ability.name}>{elem.ability.name}</span>)}</div>
                            </div>
                            <div className={'poke-types'}>
                                <p>Types:</p>
                                <div>
                                    {reduxGetPokemon?.types && reduxGetPokemon.types.map(elem => <span
                                        key={elem.type.name}>{elem.type.name}</span>)}
                                </div>
                            </div>
                        </div>
                        <div className={'poke-stat'}>
                            <h3>Statistics</h3>
                            <div className={'stats-wrapper'}>
                                {reduxGetPokemon?.stats && reduxGetPokemon.stats.map((elem) => {
                                    return (
                                        <div key={elem.stat.name}>
                                            <p style={{backgroundImage: `linear-gradient(to top, hotpink ${elem.base_stat}%, rgba(0,0,0,0) ${elem.base_stat}%)`}}
                                               className={'canvas'}/>
                                            <p>{elem.stat.name[0].toUpperCase() + elem.stat.name.slice(1)}</p>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}