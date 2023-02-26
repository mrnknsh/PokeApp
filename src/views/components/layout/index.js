import {Outlet} from 'react-router-dom'
import {Menu} from "../menu";
import '../../../style.scss'

export const Layout = ({onSearchPokemons}) => {
    return (
        <div>
            <Menu onSearchPokemons={onSearchPokemons}/>
            <div className={'mt-100'}>
                <Outlet/>
            </div>
        </div>
    )
}




