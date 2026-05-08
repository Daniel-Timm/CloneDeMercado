import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Search, Person, Cart3 } from 'react-bootstrap-icons';
import MainHeader from './components/header/MainHeader';
import NavBar from './components/header/NavBar';
import TopBar from './components/header/TopBar';
import logo from './assets/logo.png';
import Banner from './components/home/Banner';
import Sectors from './components/home/Sectors';
import Ofertas from './components/home/Ofertas';

import OfertasSeçao from './components/ProductCard/ProductCard';

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
          
          <OfertasSeçao/>
      </main>
    </div>

  );
}

export default App;