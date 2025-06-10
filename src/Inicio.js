import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FaWhatsapp,
  FaShippingFast,
  FaLock,
  FaStar,
  FaArrowLeft,
  FaArrowRight,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import API_BASE_URL from "./config";

const Inicio = () => {
  const navigate = useNavigate();
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/destaques`);
        setProdutos(response.data);
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
      }
    };
    fetchProdutos();
  }, []);

  const handleWhatsApp = () => {
    const numeroWhatsApp = "5512992173256";
    const mensagem = "Olá, gostaria de mais informações!";
    const urlMobile = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(
      mensagem
    )}`;
    const urlDesktop = `https://web.whatsapp.com/send?phone=${numeroWhatsApp}&text=${encodeURIComponent(
      mensagem
    )}`;
    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    window.open(isMobile ? urlMobile : urlDesktop, "_blank");
  };

  // Imagem de fundo do banner
  const backgroundImage = "/assets/images/banner1.jpeg";

  return (
    <>
      {/* Seção do Banner */}
      <div className="relative w-full h-64 md:h-80 lg:h-[90vh] overflow-hidden mb-8 lg:mb-12">
        {/* Imagem de fundo animada */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
          className="absolute top-0 left-0 w-full h-full bg-cover bg-center"
          style={{
            backgroundImage: `url(${backgroundImage})`,
          }}
        />

        {/* Sombreamento degradê escuro na parte inferior */}
        <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-black via-black/80 to-transparent"></div>

        {/* Letreiro animado */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 2, delay: 0.8 }}
          className="absolute left-1/2 transform -translate-x-1/2 bottom-16 text-center text-white text-3xl md:text-4xl font-bold bg-green-600 py-2 px-6 rounded-md"
        >
          Entrega em todo Brasil
        </motion.p>
      </div>

      {/* Seção para Preencher o Espaço Vazio */}
      <section className="py-4 bg-gray-100 mb-4">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            {/* Benefício 1 */}
            <div className="flex flex-col items-center">
              <FaShippingFast className="text-4xl text-green-600 mb-3" />
              <h3 className="text-lg font-bold text-gray-800 mb-2">
                Entrega Rápida
              </h3>
              <p className="text-gray-600 text-sm">
                Receba seus produtos em tempo recorde, com total segurança.
              </p>
            </div>
            {/* Benefício 2 */}
            <div className="flex flex-col items-center">
              <FaLock className="text-4xl text-green-600 mb-3" />
              <h3 className="text-lg font-bold text-gray-800 mb-2">
                Pagamento Seguro
              </h3>
              <p className="text-gray-600 text-sm">
                Seu pagamento protegido com os melhores sistemas de segurança.
              </p>
            </div>
            {/* Benefício 3 */}
            <div className="flex flex-col items-center">
              <FaStar className="text-4xl text-green-600 mb-3" />
              <h3 className="text-lg font-bold text-gray-800 mb-2">
                Qualidade Garantida
              </h3>
              <p className="text-gray-600 text-sm">
                Todos os nossos produtos são selecionados para garantir o
                melhor.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Seção de Destaques */}
      <main className="relative">
        <div className="container px-4 sm:px-6 mx-auto w-full">
          <div className="p-4 sm:p-6 bg-white shadow-md rounded-2xl">
            <h2 className="text-2xl font-bold text-green-600 mb-6">
              Destaques
            </h2>
            <div className="flex flex-col gap-8 sm:gap-12">
              {Array.isArray(produtos) &&
                produtos.map((produto) => (
                  <div
                    key={produto.id}
                    className="flex flex-col lg:flex-row items-center bg-white border border-gray-200 rounded-lg shadow-xl overflow-hidden"
                  >
                    <div className="w-full lg:w-96 h-80 lg:h-96 relative">
                      <Carousel
                        showArrows
                        showStatus={false}
                        showIndicators={false}
                        infiniteLoop
                        autoPlay
                        interval={3000}
                        stopOnHover
                        swipeable
                        emulateTouch
                        showThumbs={false}
                        renderArrowPrev={(clickHandler, hasPrev) =>
                          hasPrev && (
                            <button
                              onClick={clickHandler}
                              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-green-600 rounded-full text-white p-2 hover:bg-green-700 transition z-10"
                            >
                              <FaArrowLeft size={20} />
                            </button>
                          )
                        }
                        renderArrowNext={(clickHandler, hasNext) =>
                          hasNext && (
                            <button
                              onClick={clickHandler}
                              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-green-600 rounded-full text-white p-2 hover:bg-green-700 transition z-10"
                            >
                              <FaArrowRight size={20} />
                            </button>
                          )
                        }
                      >
                        {produto.imagens.map((caminho, index) => (
                          <div key={index} className="h-80 lg:h-96">
                            <img
                              className="w-full h-full object-cover rounded-lg"
                              src={`${API_BASE_URL}${caminho}`}
                              alt={`Imagem do ${produto.nome}`}
                            />
                          </div>
                        ))}
                      </Carousel>
                    </div>
                    <div className="p-4 sm:p-6 flex-1 w-full lg:w-96">
                      <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">
                        {produto.nome}
                      </h3>
                      <p className="text-base sm:text-lg text-gray-600 mb-6">
                        {produto.descricao}
                      </p>
                      <div className="flex flex-col sm:flex-row flex-wrap gap-4">
                        <button
                          onClick={() => navigate(`/detalhes/${produto.id}`)}
                          className="px-6 py-3 w-full sm:w-auto text-center text-white bg-teal-600 rounded-lg hover:bg-teal-700"
                        >
                          Detalhes
                        </button>
                        <button
                          onClick={handleWhatsApp}
                          className="px-6 py-3 w-full sm:w-auto text-center text-white bg-green-600 rounded-lg flex items-center justify-center hover:bg-green-700"
                        >
                          <FaWhatsapp className="mr-2" /> WhatsApp
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Inicio;
