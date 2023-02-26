import {useSelector} from "react-redux";

export const reduxPokemonsLoading = () => useSelector(state => state.pokemonsData.loading)
export const reduxPokemons = () => useSelector(state => state.pokemonsData.pokemons)
export const reduxPokemonsError = () => useSelector(state => state.pokemonsData.error)

export const reduxPokemonLoading = () => useSelector(state => state.pokemonData.loadingPokemon)
export const reduxPokemon = () => useSelector(state => state.pokemonData.pokemon)
export const reduxPokemonError = () => useSelector(state => state.pokemonData.pokemonError)

export const reduxEvolutionLoading = () => useSelector(state => state.evolutionData.loadingEvolution)
export const reduxEvolution = () => useSelector(state => state.evolutionData.evolution)
export const reduxEvolutionError = () => useSelector(state => state.evolutionData.evolutionError)

