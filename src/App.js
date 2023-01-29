import {Routes, Route, BrowserRouter as Router, redirect} from 'react-router-dom'
import {Layout} from "./views/components/layout";
import {Home} from "./views/pages/home";
import {NotFound} from "./views/pages/notFound";
import {Pokemons} from "./views/pages/pokemons";
import {Pokemon} from "./views/pages/pokemon";
import {useState} from "react";


export const App = () => {
    const [searchingPokemon, setSearchingPokemon] = useState('')
    const onSearchPokemon = (value) => {
        redirect('/pokemons/page/1')
        setSearchingPokemon(value)
    }

    return (
        <div className="App">
            <Router>
                <Routes>
                    <Route path='/' element={<Layout onSearchPokemon={onSearchPokemon}/>}>
                        <Route index element={<Home/>}/>
                        <Route path='/pokemons/page/:pageNum' element={<Pokemons searchingPokemon={searchingPokemon}/>}/>
                        <Route path='/pokemons/:name' element={<Pokemon/>}/>
                        <Route path='*' element={<NotFound/>}/>
                    </Route>
                </Routes>
            </Router>
        </div>
    );
}

export default App



