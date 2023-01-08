import {Routes, Route, BrowserRouter as Router} from 'react-router-dom'
import {Layout} from "./views/components/layout";
import {Home} from "./views/pages/home";
import {NotFound} from "./views/pages/notFound";
import {Pokemons} from "./views/pages/pokemons";


export const App = () => {
    return (
        <div className="App">
            <Router>
                <Routes>
                    <Route path='/' element={<Layout/>}>
                        <Route index element={<Home/>}/>
                        <Route path='/pokemons' element={<Pokemons/>}/>
                        <Route path='/pokemons/:name' element={<Pokemons/>}/>
                        <Route path='*' element={<NotFound/>}/>
                    </Route>
                </Routes>
            </Router>
        </div>
    );
}

export default App



