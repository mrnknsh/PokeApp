import {LOAD_POKEMONS, LOAD_POKEMONS_SUCCESS, LOAD_POKEMONS_FAILED} from '../types/index'

const initialState = {
    pokemons: null,
    loading: false,
    error: null
}

export const pokemonsReducer = (state = initialState, action) =>{
    switch (action.type){
        case LOAD_POKEMONS:{
            return {...state, loading: true, error: null}
        }
        case 'LOAD_POKEMONS_SUCCESS':{
            return {...state, pokemons: action.payload, loading: false, error: null}
        }
        case LOAD_POKEMONS_FAILED:{
            return {...state, pokemons: null, loading: false, error: action.payload}
        }

        default: return state
    }
}



