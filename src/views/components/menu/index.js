import {Link} from 'react-router-dom'
import './style.scss'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faBars} from '@fortawesome/free-solid-svg-icons'
import {useState} from "react";

export const Menu = () => {
    const [isMenuActive, setIsMenuActive] = useState(false)
    console.log(isMenuActive)
    return(
        <nav className={'main-menu'}>
            <h1>
                <Link to='/'>
                    <img src="pngwing.png" alt="logo" className={'logo-icon'}/>
                </Link>
            </h1>
            <div className={'burger-menu'} onClick={()=>setIsMenuActive(!isMenuActive)}>
                <FontAwesomeIcon icon={faBars}/>
            </div>
            <ul className={isMenuActive ? 'active' : ''}>
                <li>
                    <Link to='/'>Home</Link>
                </li>
                <li>
                    <Link to='/pokemons'>Pokemons</Link>
                </li>
            </ul>
        </nav>
    )
}



