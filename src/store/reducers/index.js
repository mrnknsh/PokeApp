import {
    LOAD_POKEMONS, LOAD_POKEMONS_FAILED,
    LOAD_POKEMON, LOAD_POKEMON_SUCCESS, LOAD_POKEMON_FAILED,
    LOAD_EVOLUTION, LOAD_EVOLUTION_SUCCESS, LOAD_EVOLUTION_FAILED
} from '../types/index'

const initialStatePokemons = {
    pokemons: null,
    loading: false,
    error: null
}

const initialStatePokemon = {
    pokemon: null,
    loadingPokemon: false,
    pokemonError: null,
}

const initialStateEvolution = {
    evolution: null,
    loadingEvolution: false,
    evolutionError: null
}

export const pokemonsReducer = (state = initialStatePokemons, action) => {
    switch (action.type) {
        case LOAD_POKEMONS: {
            return {...state, loading: true, error: null}
        }
        case 'LOAD_POKEMONS_SUCCESS': {
            return {...state, pokemons: action.payload, loading: false, error: null}
        }
        case LOAD_POKEMONS_FAILED: {
            return {...state, pokemons: null, loading: false, error: action.payload}
        }
        default:
            return state
    }
}

export const pokemonReducer = (state = initialStatePokemon, action) => {
    switch (action.type) {
        case LOAD_POKEMON: {
            return {...state, loadingPokemon: true, pokemonError: null, pokemon: null}
        }
        case LOAD_POKEMON_SUCCESS: {
            return {...state, pokemon: action.payload, loadingPokemon: false, pokemonError: null}
        }
        case LOAD_POKEMON_FAILED: {
            return {...state, pokemonError: action.payload, loadingPokemon: false, pokemon: null}
        }
        default:
            return state
    }
}

export const evolutionReducer = (state = initialStateEvolution, action) => {
    switch (action.type) {
        case LOAD_EVOLUTION: {
            return {...state, loadingEvolution: true, evolutionError: null, evolution: null}
        }
        case LOAD_EVOLUTION_SUCCESS: {
            return {...state, evolution: action.payload, evolutionError: null, loadingEvolution: false}
        }
        case LOAD_EVOLUTION_FAILED: {
            return {...state, evolutionError: action.payload, loadingEvolution: false, evolution: null}
        }
        default:
            return state
    }
}



