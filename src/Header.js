import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import API_BASE_URL from "./config";
import { FiMenu, FiX } from "react-icons/fi"; // Ícones do menu

const Header = () => {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [logoUrl, setLogoUrl] = useState("");
  const [nomeEmpresa, setNomeEmpresa] = useState("");
  const images = [
    "/assets/images/campo.jpg",
    "/assets/images/campo2.jpg",
    "/assets/images/campo3.jpg",
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
        const response = await axios.get(`${API_BASE_URL}/api/empresa/`);
        setLogoUrl(response.data.empresa.logo);
        setNomeEmpresa(response.data.empresa.nome);
      } catch (error) {
        console.error("Erro ao buscar a logo:", error);
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
      <header className="sticky top-0 w-full bg-white shadow-md z-50">
        <nav className="max-w-screen-xl mx-auto p-4">
          <div className="flex items-center justify-between">
            {/* Ícone do menu hamburguer (mobile) */}
            <button
              className="md:hidden text-3xl text-gray-700 p-2"
              onClick={toggleMenu}
            >
              {isMenuOpen ? <FiX /> : <FiMenu />}
            </button>

            {/* Logo e Nome */}
            <div className="flex items-center space-x-4">
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/");
                }}
                className="flex items-center"
              >
                <img
                  src={`${API_BASE_URL}/${logoUrl}`}
                  className="h-36 w-36" // Aumentei a logo
                  alt="Logo"
                />
                <span className="text-3xl font-bold text-green-700">
                  {nomeEmpresa}
                </span>{" "}
                {/* Reduzi o título */}
              </a>
            </div>

            {/* Menu de Navegação (Desktop) */}
            <div className="hidden md:flex space-x-8 text-lg font-medium">
              <Link
                to="/"
                className="px-4 py-2 text-gray-900 transition-all rounded hover:underline hover:bg-gray-100 md:hover:bg-transparent md:hover:text-green-700"
              >
                Destaques
              </Link>
              <Link
                to="/produtos"
                className="px-4 py-2 text-gray-900 transition-all rounded hover:underline hover:bg-gray-100 md:hover:bg-transparent md:hover:text-green-700"
              >
                Produtos
              </Link>
              <Link
                to="/sobre"
                className="px-4 py-2 text-gray-900 transition-all rounded hover:underline hover:bg-gray-100 md:hover:bg-transparent md:hover:text-green-700"
              >
                Sobre nós
              </Link>
            </div>
          </div>
        </nav>

        {/* Menu Mobile */}
        {isMenuOpen && (
          <div className="md:hidden bg-white shadow-md absolute w-full left-0 top-[80px] transition-all duration-300">
            <ul className="flex flex-col items-center space-y-4 py-4 text-lg font-medium">
              <li>
                <Link
                  to="/"
                  className="px-4 py-2 text-gray-900 transition-all rounded hover:bg-gray-100"
                  onClick={toggleMenu}
                >
                  Destaques
                </Link>
              </li>
              <li>
                <Link
                  to="/produtos"
                  className="px-4 py-2 text-gray-900 transition-all rounded hover:bg-gray-100"
                  onClick={toggleMenu}
                >
                  Produtos
                </Link>
              </li>
              <li>
                <Link
                  to="/sobre"
                  className="px-4 py-2 text-gray-900 transition-all rounded hover:bg-gray-100"
                  onClick={toggleMenu}
                >
                  Sobre nós
                </Link>
              </li>
            </ul>
          </div>
        )}
      </header>
    </div>
  );
};

export default Header;
