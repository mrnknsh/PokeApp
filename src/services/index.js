import {API} from "../API";
import axios from "axios";

export const getPokemons = async (limit, offset) => {
    return axios.get(`${API}/pokemon?limit=${limit}&offset=${offset}`)
}

export const getPokemon = async (name) => {
    return axios.get(`${API}/pokemon/${name}`)
}