import {API} from "../API";
import axios from "axios";

export const getPokemons = async (offset, limit) => {
    return axios.get(`${API}/pokemon?offset=${offset}&limit=${limit}`)
}

export const getPokemon = async (name) => {
    return axios.get(`${API}/pokemon/${name}`)
}

export const getSearchingPokemons = async (limit) => {
    return axios.get(`${API}/pokemon?limit=${limit}`)
}