import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './screens/LandingPage';
import DBConnection from './screens/DBConnection';
import Contact from './screens/Contact';
import StrainSim from './screens/StrainSim'
import Header from './components/Header-new';
import Footer from './components/footer-new';


function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/DBConnection" element={<DBConnection />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/StrainSim" element={<StrainSim />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;


