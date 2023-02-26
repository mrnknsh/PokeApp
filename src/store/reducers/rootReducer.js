import {combineReducers} from "redux";
import {pokemonsReducer, pokemonReducer, evolutionReducer} from "./index";

export const rootReducer = combineReducers({
    pokemonsData: pokemonsReducer,
    pokemonData: pokemonReducer,
    evolutionData: evolutionReducer
})

