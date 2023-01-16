import {Link} from 'react-router-dom'
import './style.scss'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faBars} from '@fortawesome/free-solid-svg-icons'
import {useState} from "react";
import {menuItems} from "./menu";
import {keyboard} from "@testing-library/user-event/dist/keyboard";

export const Menu = () => {
    const [isMenuActive, setIsMenuActive] = useState(false)
    const [activeKey, setActiveKey] = useState('mainMenu1')
    const handleActiveKey = (key) => setActiveKey(key)

    return (
        <nav className={'main-menu'}>
            <h1>
                <Link to='/'>
                    <img src="pngwing.png" alt="logo" className={'logo-icon'}/>
                </Link>
            </h1>
            <div className={'burger-menu'} onClick={() => setIsMenuActive(!isMenuActive)}>
                <FontAwesomeIcon icon={faBars}/>
            </div>
            <ul className={isMenuActive ? 'open-menu' : ''} onClick={() => setIsMenuActive(!isMenuActive)}>
                {
                    menuItems.map(elem => (
                        <li key={elem.key} className={`${activeKey === elem.key ? 'active' : ''}`}>
                            <Link to={elem.link} onClick={() => handleActiveKey(elem.key)}>{elem.name}</Link>
                        </li>
                    ))
                }
            </ul>
        </nav>
    )
}



