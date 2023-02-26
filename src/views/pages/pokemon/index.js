import {useParams} from "react-router-dom";
import {PokemonDescription} from "../../components/pokemonDescription";
import {PokemonEvolution} from "../../components/pokemonEvolution";

export const Pokemon = () => {
    const {name} = useParams()
    return (
        <div>
            <PokemonDescription pokeName={name}/>
            <PokemonEvolution pokeName={name}/>
        </div>
    )
}