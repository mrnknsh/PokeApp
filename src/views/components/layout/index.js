import {Outlet} from 'react-router-dom'
import {Menu} from "../menu";
import '../../../style.scss'

export const Layout = ({onSearchPokemon}) => {
    return (
        <div>
            <Menu onSearchPokemon={onSearchPokemon}/>
            <div className={'mt-100'}>
                <Outlet/>
            </div>
        </div>
    )
}




