import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import "./index.css";
import Header from "./Header";
import Footer from "./Footer";
import { FaWhatsapp } from "react-icons/fa";

import produtos from "./produtos";
import Sobre from "./Sobre";
import Destaques from "./Destaques";
import Inicio from "./Inicio";
import DetalhesProduto from "./DetalhesProduto";

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
        <Route path="/" element={<Inicio />} />
        <Route path="/destaques" element={<Destaques />} />
        <Route path="/produtos" element={<produtos />} />
        <Route path="/sobre" element={<Sobre />} />
        <Route path="/detalhes/:id" element={<DetalhesProduto />} /> {/* Página de detalhes */}
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;