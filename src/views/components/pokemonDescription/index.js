import {getPokemon} from "../../../services";
import {useEffect, useState} from "react";

export const PokemonDescription = ({pokeName}) => {
    const [pokemon, setPokemon] = useState([])
    const loadPokemon = async () => {
        try {
            // let urls = [];
            const res = await getPokemon(pokeName)
            // urls.push()
            // await Promise.all(
            //     res.data["characters"].map(url=>{
            //         return axios.get(url).then(character=>{
            //             array.push(character.data.name);
            //         })
            //     })
            // ).then(result=>{
            //     console.log("array:",array);
            //     JSON.stringify(array);
            // })

            console.log(res.data)
            setPokemon(res.data)
        } catch (error) {
            console.log(error)
        } finally {

        }
    }


    useEffect(() => {
        loadPokemon()
    }, [pokeName])


    return (
        <div>
            {/*<h2>{pokemon.name[0].toUpperCase() + pokemon.name.slice(1)}</h2>*/}

            <div>
                <p>Weight: <span>{pokemon.weight}</span></p>
            </div>
            <div>
                <p>Height: <span>{pokemon.height}</span></p>
            </div>
            <div>
                <p>Types:
                    {pokemon?.length ?
                        pokemon.types.map(elem => {
                            return (
                                <span key={elem.type.name}>{elem.type.name}</span>
                            )
                        }) : <span>t</span>
                    }
                </p>
            </div>


        </div>
    )

}