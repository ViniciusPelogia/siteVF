import React, { useState, useEffect } from "react";
import "./App.css";
import "./index.css";

const App = () => {
  const [isScrolled, setIsScrolled] = useState(false); // Estado para controlar o scroll
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Estado para o menu burger

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100); // Ativa quando o scroll for maior que 100px
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen); // Alterna o estado do menu
  };

  return (
    <div className="relative min-h-screen">
      {/* Imagem de Fundo - Posicionada atrás de tudo */}
      <div
        className="absolute top-0 left-0 w-full h-full bg-center bg-cover"
        style={{
          backgroundImage: 'url(/assets/images/campo.jpg)',
          zIndex: -1, // Garante que a imagem fique atrás de todos os outros elementos
        }}
      ></div>

      {/* Header */}
      <header className={`sticky p-8 transition-all duration-300 ${isScrolled ? "bg-transparent" : ""}`}>
        <nav className={`bg-white border-gray-200 rounded-2xl shadow-md sticky top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? "shadow-lg" : ""}`}>
          <div className="flex flex-wrap items-center justify-between max-w-screen-xl p-4 mx-auto">
            <a href="#" className="flex items-center space-x-3">
              <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Logo" />
              <span className="self-center text-2xl font-semibold whitespace-nowrap">LOGO DA EMPRESA</span>
            </a>
            <button
              onClick={toggleMenu} // Ativa o toggle do menu
              type="button"
              className="inline-flex items-center justify-center w-10 h-10 p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
              aria-controls="navbar-dropdown"
              aria-expanded={isMenuOpen ? "true" : "false"}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
            <div className={`md:block w-full md:w-auto ${isMenuOpen ? "block" : "hidden"}`} id="navbar-dropdown">
              <ul className="flex flex-col p-4 mt-4 font-medium border border-gray-100 rounded-lg md:p-0 bg-gray-50 md:space-x-8 md:flex-row md:mt-0 md:border-0 md:bg-white">
                <li>
                  <a href="#" className="block px-3 py-2 text-white transition-all bg-green-700 rounded md:bg-transparent md:text-green-700 md:p-0 hover:scale-105">
                    Produtos
                  </a>
                </li>
                <li>
                  <a href="#" className="block px-3 py-2 text-gray-900 transition-all rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-green-700 md:p-0 hover:scale-105">
                    Sobre nós
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>

      {/* Main */}
      <main className="relative z-10 p-10">
        <div className="bg-white">
          <h1 className="text-4xl text-white">Conteúdo Principal</h1>
          <p className="text-white"></p>
        </div>
      </main>
      <footer class="bg-white shadow dark:bg-gray-900 m-4 rounded-lg">
        <div class="w-full max-w-screen-xl mx-auto p-4 md:py-8">
          <span class="block text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023 <a href="" class="hover:underline">Logo da empresa</a>. All Rights Reserved.</span>
        </div>
      </footer>
    </div>
  );
};

export default App;
