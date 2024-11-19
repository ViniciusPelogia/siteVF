import React, { useState, useEffect } from "react";
import "./App.css";
import "./index.css";

const App = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Estado para o menu burger

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
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
    <div className="bg-gray-500">
      {/* Header */}
      <nav className={`bg-white border-gray-200 fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? "shadow-lg" : ""}`}>
        <div className="flex flex-wrap items-center justify-between max-w-screen-xl p-4 mx-auto">
          <a href="#" className="flex items-center space-x-3 rtl:space-x-reverse">
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
          <div className={`md:block w-full md:w-auto ${isMenuOpen ? "block" : "hidden"}`} id="navbar-dropdown"> {/* Altera a classe com base no estado */}
            <ul className="flex flex-col p-4 mt-4 font-medium border border-gray-100 rounded-lg md:p-0 bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white">
              <li>
                <a href="#" className="block px-3 py-2 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0" aria-current="page">
                  Home
                </a>
              </li>
              <li>
                <button
                  className="flex items-center justify-between w-full px-3 py-2 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:w-auto"
                  onClick={toggleDropdown}
                >
                  Dropdown
                  <svg
                    className="w-2.5 h-2.5 ms-2.5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                  >
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                  </svg>
                </button>
                {isDropdownOpen && (
                  <div className="absolute z-10 mt-2 font-normal bg-white divide-y divide-gray-100 rounded-lg shadow w-44">
                    <ul className="py-2 text-sm text-gray-700" aria-labelledby="dropdownLargeButton">
                      <li>
                        <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                          Dashboard
                        </a>
                      </li>
                      <li>
                        <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                          Settings
                        </a>
                      </li>
                      <li>
                        <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                          Earnings
                        </a>
                      </li>
                    </ul>
                    <div className="py-1">
                      <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        Sign out
                      </a>
                    </div>
                  </div>
                )}
              </li>
              <li>
                <a href="#" className="block px-3 py-2 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0">
                  Services
                </a>
              </li>
              <li>
                <a href="#" className="block px-3 py-2 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#" className="block px-3 py-2 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Main */}
      <main className="pt-40">
        <div className="container px-6 mx-auto mt-6">
          <div className="p-6 bg-white rounded-lg shadow-lg">
            <h1 className="mb-6 text-2xl font-bold">TESTE</h1>
            <p>teste teste teste</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;