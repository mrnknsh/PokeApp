import {useParams} from "react-router-dom";
import {PokemonDescription} from "../../components/pokemonDescription";
import {PokemonEvolution} from "../../components/pokemonEvolution";
import {reduxPokemons} from "../../../store/selectors";

export const Pokemon = () => {
    const {name} = useParams()
    const pokemons = reduxPokemons()

    return (
        <div>
            <h4>{pokemons?.name || 'NotFound'}</h4>
            <PokemonDescription pokeName={name}/>
            <PokemonEvolution pokeName={name}/>
        </div>
    )
}