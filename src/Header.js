import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

const Header = () => {
    const navigate = useNavigate();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [logoUrl, setLogoUrl] = useState('');
    const images = [
        '/assets/images/campo.jpg',
        '/assets/images/campo2.jpg',
        '/assets/images/campo3.jpg',
    ];

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 100);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 4000);

        return () => clearInterval(intervalId);
    }, []);

    useEffect(() => {
        const fetchLogo = async () => {
            try {
                const response = await axios.get('http://localhost:5000/empresa');
                setLogoUrl(response.data.empresa.logo);
            } catch (error) {
                console.error('Erro ao buscar a logo:', error);
            }
        };

        fetchLogo();
    }, []);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div className="select-none">
            {/* Imagem de fundo */}
            <div
                className="absolute top-0 left-0 w-full h-full transition-all duration-1000 bg-center bg-cover"
                style={{
                    backgroundImage: `url(${images[currentImageIndex]})`,
                    zIndex: -1,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    minHeight: "100vh",
                }}
            ></div>

            {/* Header */}
            <header className={`sticky pt-8 px-8 pb-4 transition-all duration-300 ${isScrolled ? "bg-transparent" : ""}`}>
                <nav className={`bg-white border-gray-200 rounded-md shadow-md sticky top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? "shadow-md-lg" : ""}`}>
                    <div className="flex flex-wrap items-center justify-between max-w-screen-xl p-4 mx-auto">
                        <div className="flex items-center">
                            {/* Botão de menu */}
                            <button
                                onClick={toggleMenu}
                                type="button"
                                className="inline-flex items-center justify-center w-10 h-10 p-2 text-sm text-gray-500 md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
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
                            {/* Logo da Empresa */}
                            <a
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    navigate("/");
                                }}
                                className="flex items-center space-x-3 ml-2">
                                <img src={`http://localhost:5000/${logoUrl}`} className="h-8 w-8" alt="Logo" />
                                <span className="self-center text-2xl font-semibold whitespace-nowrap">LOGO DA EMPRESA</span>
                            </a>
                        </div>
                        {/* Menu dropdown */}
                        <div className={`md:block w-full md:w-auto transition-all duration-500 ease-in-out transform ${isMenuOpen ? "block" : "hidden"}`} id="navbar-dropdown">
                            <ul className="flex flex-col p-4 mt-4 font-medium border border-gray-100 md:p-0 bg-gray-50 md:space-x-8 md:flex-row md:mt-0 md:border-0 md:bg-white">
                                <li>
                                    <Link to="/" className="block px-3 py-2 text-gray-900 transition-all rounded md:bg-transparent md:text-green-700 md:p-0 hover:text-white hover:underline hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-green-700 hover:scale-105">
                                        Destaques
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/produtos" className="block px-3 py-2 text-gray-900 transition-all rounded md:bg-transparent md:text-green-700 md:p-0 hover:text-white hover:underline hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-green-700 hover:scale-105">
                                        Produtos
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/sobre" className="block px-3 py-2 text-gray-900 transition-all rounded md:bg-transparent md:text-green-700 md:p-0 hover:text-white hover:underline hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-green-700 hover:scale-105">
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
