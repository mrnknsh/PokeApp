import {
    LOAD_POKEMONS, LOAD_POKEMONS_SUCCESS, LOAD_POKEMONS_FAILED,
    LOAD_POKEMON, LOAD_POKEMON_SUCCESS, LOAD_POKEMON_FAILED,
    LOAD_EVOLUTION, LOAD_EVOLUTION_FAILED, LOAD_EVOLUTION_SUCCESS
} from '../types/index'

export const handleLoadPokemons = () => (dispatch) => dispatch({type: LOAD_POKEMONS})
export const handleLoadPokemonsSuccess = (payload) => (dispatch) => dispatch({type: 'LOAD_POKEMONS_SUCCESS', payload})
export const handleLoadPokemonsFailed = (payload) => (dispatch) => dispatch({type: LOAD_POKEMONS_FAILED, payload})

export const handleLoadPokemon = () => (dispatch) => dispatch({type: LOAD_POKEMON})
export const handleLoadPokemonSuccess = (payload) => (dispatch) => dispatch({type: LOAD_POKEMON_SUCCESS, payload})
export const handleLoadPokemonFailed = (payload) => (dispatch) => dispatch({type: LOAD_POKEMON_FAILED, payload})

export const handleLoadEvolution = () => (dispatch) => dispatch({type: LOAD_EVOLUTION})
export const handleLoadEvolutionSuccess = (payload) => (dispatch) => dispatch({type: LOAD_EVOLUTION_SUCCESS, payload})
export const handleLoadEvolutionFailed = (payload) => (dispatch) => dispatch({type: LOAD_EVOLUTION_FAILED, payload})

