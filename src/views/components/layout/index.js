import {Outlet} from 'react-router-dom'
import {Menu} from "../menu";

export const Layout = () => (
    <div>
        <Menu/>
        <Outlet/>
    </div>
)

