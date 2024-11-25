import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Importe o Link do react-router-dom
import { useNavigate } from "react-router-dom";

const Header = () => {
    const navigate = useNavigate();
    const [isScrolled, setIsScrolled] = useState(false); // Estado para controlar o scroll
    const [isMenuOpen, setIsMenuOpen] = useState(false); // Estado para o menu burger
    const [currentImageIndex, setCurrentImageIndex] = useState(0); // Estado para o índice da imagem
    const images = [
        '/assets/images/campo.jpg', // Substitua com suas imagens
        '/assets/images/campo2.jpg',
        '/assets/images/campo3.jpg',
    ];

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 100); // Ativa quando o scroll for maior que 100px
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length); // Troca a imagem a cada 4 segundos
        }, 4000);

        return () => clearInterval(intervalId); // Limpa o intervalo quando o componente for desmontado
    }, []);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen); // Alterna o estado do menu
    };

    return (
        <div>
            {/* Imagem de fundo */}
            <div
                className="absolute top-0 left-0 w-full h-full transition-all duration-1000 bg-center bg-cover"
                style={{
                    backgroundImage: `url(${images[currentImageIndex]})`,
                    zIndex: -1, // Garante que a imagem fique atrás de todos os outros elementos
                    backgroundSize: "cover", // Garante que a imagem cubra toda a área sem distorcer
                    backgroundPosition: "center", // Mantém a imagem centralizada
                    minHeight: "100vh",  // Isso garante que o tamanho da imagem de fundo seja responsivo
                }}
            ></div>

            {/* Header */}
            <header className={`sticky pt-8 px-8 pb-4 transition-all duration-300 ${isScrolled ? "bg-transparent" : ""}`}>
                <nav className={`bg-white border-gray-200 rounded-2xl shadow-md sticky top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? "shadow-md-lg" : ""}`}>
                    <div className="flex flex-wrap items-center justify-between max-w-screen-xl p-4 mx-auto">
                        <a
                            href="#"
                            onClick={(e) => {
                                e.preventDefault(); // Evita o comportamento padrão do link
                                navigate("/"); // Redireciona para a rota "/"
                            }}
                            className="flex items-center space-x-3">
                            <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Logo" />
                            <span className="self-center text-2xl font-semibold whitespace-nowrap">LOGO DA EMPRESA</span>
                        </a>

                        {/* Botão de menu */}
                        <button
                            onClick={toggleMenu}
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

                        {/* Menu dropdown */}
                        <div className={`md:block w-full md:w-auto transition-all duration-500 ease-in-out transform ${isMenuOpen ? "block" : "hidden"}`} id="navbar-dropdown">
                            <ul className="flex flex-col p-4 mt-4 font-medium border border-gray-100 rounded-lg md:p-0 bg-gray-50 md:space-x-8 md:flex-row md:mt-0 md:border-0 md:bg-white">
                                <li>
                                    <Link to="/" className="block px-3 py-2 text-gray-900 transition-all transition rounded hover:bg-green-700 md:bg-transparent md:text-green-700 md:p-0 hover:text-white hover:underline hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-green-700 hover:scale-105">
                                        Destaques
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/produtos" className="block px-3 py-2 text-gray-900 transition-all transition rounded hover:bg-green-700 md:bg-transparent md:text-green-700 md:p-0 hover:text-white hover:underline hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-green-700 hover:scale-105">
                                        Produtos
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/sobre" className="block px-3 py-2 text-gray-900 transition-all transition rounded hover:bg-green-700 md:bg-transparent md:text-green-700 md:p-0 hover:text-white hover:underline hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-green-700 hover:scale-105">
                                        Sobre nós
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </header>
        </div>
    );
};

export default Header;
