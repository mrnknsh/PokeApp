import {useParams} from "react-router-dom";
import {PokemonDescription} from "../../components/pokemonDescription";

export const Pokemon = () => {
    const {name} = useParams()

    return (
        <div>
            <PokemonDescription pokeName={name}/>

        </div>
    )
}