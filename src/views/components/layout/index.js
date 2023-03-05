import {Outlet} from 'react-router-dom'
import {Menu} from "../menu";
import '../../../style.scss'

export const Layout = () => {
    return (
        <div>
            <Menu/>
            <div className={'mt-100'}>
                <Outlet/>
            </div>
        </div>
    )
}




