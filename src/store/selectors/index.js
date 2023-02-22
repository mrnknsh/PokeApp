import {useSelector} from "react-redux";

export const reduxPokemonsLoading = () => useSelector(state => state.pokemonsData.loading)

export const reduxPokemons = () => useSelector(state => state.pokemonsData.pokemons)

export const reduxPokemonsError = () => useSelector(state => state.pokemonsData.error)