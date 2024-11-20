import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import "./index.css";
import Header from "./Header";
import Footer from "./Footer";
import { FaWhatsapp } from "react-icons/fa";

import Produtos from "./Produtos";
import Sobre from "./Sobre";

const App = () => {
  const [isScrolled, setIsScrolled] = useState(false); // Estado para controlar o scroll
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Estado para o menu burger
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = [
    "/assets/images/campo.jpg",
    "/assets/images/campo2.jpg",
    "/assets/images/campo3.jpg",
  ];

  return (
    <Router> {/* Envolvendo toda a aplicação com o Router */}
      <Header />
      <Routes>
        {/* Definindo as rotas para as páginas */}
        <Route path="/produtos" element={<Produtos />} />
        <Route path="/sobre" element={<Sobre />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;