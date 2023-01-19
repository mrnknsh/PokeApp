import {Link} from "react-router-dom";

export const  PokemonCard = ({name}) =>{
    return(
        <p className={'pokemon-in-main'}>
            <Link to={`/pokemons/${name}`}>
                {name}
            </Link>
        </p>
    )
}