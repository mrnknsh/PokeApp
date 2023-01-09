import {Outlet} from 'react-router-dom'
import {Menu} from "../menu";

export const Layout = () => (
    <div>
        <Menu/>
        <div style={{marginTop: '100px'}}>
            <Outlet/>
        </div>

    </div>
)

