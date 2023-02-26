import {Routes, Route, BrowserRouter as Router} from 'react-router-dom'
import {Layout} from "./views/components/layout";
import {Home} from "./views/pages/home";
import {NotFound} from "./views/pages/notFound";
import {Pokemons} from "./views/pages/pokemons";
import {Pokemon} from "./views/pages/pokemon";
import {Search} from "./views/pages/search";
import {useState} from "react";
import {store} from "./store";
import {Provider} from "react-redux";


export const App = () => {
    const [searchingPokemons, setSearchingPokemons] = useState('')
    const onSearchPokemons = (value) => {
        setSearchingPokemons(value)
    }

    return (
        <Provider store={store}>
        <div className="App">
            <Router>
                <Routes>
                    <Route path='/' element={<Layout onSearchPokemons={onSearchPokemons}/>}>
                        <Route index element={<Home/>}/>
                        <Route path='/pokemons/page/:pageNum' element={<Pokemons/>}/>
                        <Route path='/pokemons/search/:name' element={<Search searchingPokemons={searchingPokemons}/>}/>
                        <Route path='/pokemons/:name' element={<Pokemon/>}/>
                        <Route path='*' element={<NotFound/>}/>
                    </Route>
                </Routes>
            </Router>
        </div>
        </Provider>
    );
}

export default App



