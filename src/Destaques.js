import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { FaWhatsapp } from "react-icons/fa";

const Destaques = () => {
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
        <div className="relative min-h-screen">
            {/* Imagem de Fundo - Carrossel de Imagens */}
            <div
                className="absolute top-0 left-0 w-full h-full transition-all duration-500 bg-center bg-cover"
                style={{
                    backgroundImage: `url(${images[currentImageIndex]})`,
                    zIndex: -1, // Garante que a imagem fique atrás de todos os outros elementos
                    backgroundSize: "cover", // Garante que a imagem cubra toda a área sem distorcer
                    backgroundPosition: "center", // Mantém a imagem centralizada
                    minHeight: "100vh",  // Isso garante que o tamanho da imagem de fundo seja responsivo
                }}
            ></div>

            {/* Header */}
            <Header />

            {/* Main */}
            <main className="relative">
                <div className="container px-6 mx-auto mt-4 min-w-3/4">
                    <div className="p-6 bg-white shadow-md rounded-2xl">
                        <div className="flex flex-col gap-6 lg:flex-row">
                            <aside className="p-4 bg-white shadow-md lg:w-1/4 rounded-2xl">
                                <h2 className="text-lg font-bold text-black">Filtros</h2>
                                <div className="mt-4">
                                    {/* a gente coloca as opcoes aqui, sempre dentro de um mt-4 */}
                                </div>
                                <button
                                    class="mt-6 w-full bg-green-500 text-white py-2 rounded-2xl hover:bg-green-600 transition">
                                    Aplicar filtro
                                </button>
                            </aside>

                            {/* PRODUTOS */}
                            <section className="lg:w-3/4">
                                <div className="grid grid-cols-2 gap-6 md:grid-cols-3 xl:grid-cols-4">
                                    {/* Produto 1*/}
                                    <div className="flex flex-col items-center p-4 bg-white shadow-md rounded-2xl">
                                        <div className="flex items-center justify-center w-full h-32 mb-4 bg-gray-200 ">
                                        </div>
                                        <h3 className="font-medium text-center text-black">Nome do produto</h3>
                                        <div className="flex flex-col w-full gap-2 mt-4">
                                            <button
                                                class="bg-blue-500 font-bold text-white text-sm px-4 py-2 rounded hover:bg-blue-600 transition w-full">
                                                Detalhes
                                            </button>
                                            <button
                                                class="bg-green-500 font-bold text-white text-sm px-4 py-2 rounded flex items-center justify-center gap-2 hover:bg-green-600 transition w-full">
                                                <FaWhatsapp className="w-4 h-4" />
                                                WhatsApp
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}

export default Destaques;