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
      <header className={`sticky pt-8 px-8 pb-4 transition-all duration-300 ${isScrolled ? "bg-transparent" : ""}`}>
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
      <main className="relative">
        <div className="container px-6 mx-auto mt-4 min-w-3/4">
          <div className="p-6 bg-white rounded-lg shadow-lg">
            <div className="flex flex-col gap-6 lg:flex-row">
              <aside className="p-4 bg-white shadow-md lg:w-1/4 rounded-2xl">
                <h2 className="text-lg font-bold text-gray-800">Filtros</h2>
                <div className="mt-4">
                  {/* a gente coloca as opcoes aqui, sempre dentro de um mt-4 */}
                </div>
                <button
                  class="mt-6 w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition">
                  Aplicar filtro
                </button>
              </aside>

              {/* PRODUTOS */}
              <section className="lg:w-3/4">
                <div className="grid grid-cols-2 md:grid-cols-3"></div>
              </section>
            </div>
          </div>
        </div>
      </main>
      <footer class="bg-white shadow dark:bg-gray-900 m-10 rounded-2xl">
        <div class="w-full max-w-screen-xl mx-auto p-2 md:py-8">
          <span class="block text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2024 <a href="" class="hover:underline">Nome da empresa</a>. Todos os Direitos Reservados.</span>
        </div>
      </footer>
    </div>
  );
};

export default App;
