import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';


import MainHeader from './components/header/MainHeader';
import NavBar from './components/header/NavBar';
import TopBar from './components/header/TopBar';
import Banner from './components/home/Banner';
import Sectors from './components/home/Sectors';


import { ofertasDoDia, descontosEspeciais } from './data/Product';
import ProductSection from './components/ProductCard/ProductSection'; 

function App() {
  return (
    <div className="app-container">
      <header>
        <TopBar />
        <div className="sticky-top bg-white shadow-sm" style={{ top: 0, zIndex: 1020 }}>
          <MainHeader />
          <NavBar />
        </div>
      </header>

      <main>
          <Banner/>
          <Sectors/>
          
          
          <ProductSection titulo="Ofertas do Dia" lista={ofertasDoDia} />
          <ProductSection titulo="Descontos especiais" lista={descontosEspeciais} />
      </main>
    </div>
  );
}

export default App;