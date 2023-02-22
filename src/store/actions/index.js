import {LOAD_POKEMONS, LOAD_POKEMONS_SUCCESS, LOAD_POKEMONS_FAILED} from '../types/index'

export const handleLoadPokemons = () => (dispatch) => dispatch({type: LOAD_POKEMONS})

export const handleLoadPokemonsSuccess = (payload) => (dispatch) => dispatch({type: 'LOAD_POKEMONS_SUCCESS', payload})

export const handleLoadPokemonsFailed = (payload) => (dispatch) => dispatch({type: LOAD_POKEMONS_FAILED, payload})

