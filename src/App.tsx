import React, { useState } from 'react';
import Header from './components/Header';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import './scss/app.scss';
import { Routes, Route } from 'react-router-dom'
import Cart from './pages/Cart';

interface IContext {
  search: string,
  setSearch: Function
}

export const SearchContext = React.createContext<IContext>({
  search: '',
  setSearch: Function
})

const App: React.FC = () => {
  const [ search, setSearch ] = useState<string>('')

  console.log(typeof setSearch)

  return (
    <div className="wrapper app">
      <SearchContext.Provider value={{ search, setSearch }}>
        <Header/>
        <div className="content">
          <Routes>
            <Route path='' element={<Home/>} />
            <Route path='/cart' element={<Cart />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </div>
      </SearchContext.Provider>
    </div>
  );

}

export default App;
