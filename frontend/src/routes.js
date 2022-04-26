import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';

import Error from './pages/Error';

import Header from './components/Header';
import Footer from './components/Footer';

function RoutesApp(){
  return(
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path="/" element={ <Home/> } />
        <Route path="*" element={ <Error/> } />
      </Routes>
      <Footer/>
    </BrowserRouter>
  )
}

export default RoutesApp;