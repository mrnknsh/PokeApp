import {Link} from 'react-router-dom'
import './style.scss'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faBars, faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons'
import { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import {menuItems} from "./menu";


export const Menu = ({onSearchPokemon}) => {
    const location = useLocation()

    const [isMenuActive, setIsMenuActive] = useState(false)
    const [activeKey, setActiveKey] = useState(null)
    const [searchingValue, setSearchingValue] = useState('')
    const handleActiveKey = (key) => setActiveKey(key)

    const getSearchingValue = (e) =>{
        setSearchingValue(e.target.value)
    }

    const searchPokemon = (e) =>{
        e.preventDefault()
        onSearchPokemon(searchingValue)
        setSearchingValue('')
    }

    useEffect(() => {
        let isActiveItem = false;
        menuItems.map(menuItem => {
            if(location.pathname.indexOf(menuItem.existUrl) !== -1) {
                setActiveKey(menuItem.key)
                isActiveItem = true
            }
        });
        if(!isActiveItem) {
            setActiveKey('mainMenu1')
        }
    }, [])

    return (
        <nav className={'main-menu'}>
            <h1 onClick={()=>setActiveKey('mainMenu1')}>
                <Link to='/'>
                    <img src="pngwing.png" alt="logo" className={'logo-icon'}/>
                </Link>
            </h1>
            <ul className={isMenuActive ? 'open-menu' : ''} onClick={() => setIsMenuActive(!isMenuActive)}>
                {
                    menuItems.map(elem => (
                        <li key={elem.key} className={`${activeKey === elem.key ? 'active' : ''}`}>
                            <Link to={elem.link} onClick={() => handleActiveKey(elem.key)}>{elem.name}</Link>
                        </li>
                    ))
                }
            </ul>
            <div className={'search-container'}>
                <input type="text" placeholder={'Find pokemon'} value={searchingValue} onChange={getSearchingValue}/>
                <button onClick={searchPokemon}><FontAwesomeIcon icon={faMagnifyingGlass}/></button>
            </div>
            <div className={'burger-menu'} onClick={() => setIsMenuActive(!isMenuActive)}>
                <FontAwesomeIcon icon={faBars}/>
            </div>
        </nav>
    )
}



