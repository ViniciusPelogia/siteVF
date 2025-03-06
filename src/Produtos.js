import React, { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import API_BASE_URL from "./config";

const Produtos = () => {
  const [produtos, setProdutos] = useState([]);
  const [filtro, setFiltro] = useState("");
  const [ordem, setOrdem] = useState("A-Z");
  const [filtroAplicado, setFiltroAplicado] = useState({ filtro, ordem: "A-Z" });
  const navigate = useNavigate();
  const numeroWhatsApp = "5512992173256"; // Substitua pelo número do WhatsApp

  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/produto`);

        if (response.data && response.data.length > 0) {
          const produtosComImagens = response.data.map((produto) => ({
            ...produto,
            imagem: `${API_BASE_URL}/uploads/${produto.imagem}`,
          }));
          setProdutos(produtosComImagens);
        } else {
          console.warn("Nenhum produto encontrado na resposta da API");
        }
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
      }
    };

    fetchProdutos();
  }, []);

  const handleWhatsApp = (nomeProduto) => {
    const mensagem = `Olá, tenho interesse no produto ${nomeProduto.replace(/\//g, "-")}`;
    const urlMobile = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensagem)}`;
    const urlDesktop = `https://web.whatsapp.com/send?phone=${numeroWhatsApp}&text=${encodeURIComponent(mensagem)}`;
  
    // Verifica se o usuário está em um dispositivo móvel
    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    window.open(isMobile ? urlMobile : urlDesktop, "_blank");
  };
  
  

  const handleFiltroChange = (event) => {
    setFiltro(event.target.value);
  };

  const handleOrdemChange = (event) => {
    setOrdem(event.target.value);
  };

  const handleAplicarFiltro = () => {
    setFiltroAplicado({ filtro, ordem });
  };

  const produtosFiltrados = produtos
    .filter((produto) => {
      const regex = new RegExp(filtroAplicado.filtro, "i");
      return regex.test(produto.nome);
    })
    .sort((a, b) => {
      if (filtroAplicado.ordem === "A-Z") {
        return a.nome.localeCompare(b.nome);
      } else if (filtroAplicado.ordem === "Z-A") {
        return b.nome.localeCompare(a.nome);
      }
      return 0;
    });

  return (
    <>
      <main className="relative min-h-screen">
        <div className="container px-6 mx-auto mt-4">
          <div className="p-6 bg-white shadow-md rounded-2xl">
            <div className="flex flex-col gap-6 lg:flex-row">
              <aside className="p-4 bg-white shadow-md lg:w-1/4 rounded-2xl">
                <h2 className="text-lg font-bold text-black">Filtros</h2>
                <div className="mt-4">
                  <input
                    type="text"
                    placeholder="Pesquisar produtos..."
                    value={filtro}
                    onChange={handleFiltroChange}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500 w-full mb-4"
                  />
                  <select
                    value={ordem}
                    onChange={handleOrdemChange}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500 w-full"
                  >
                    <option value="A-Z">Ordenar de A-Z</option>
                    <option value="Z-A">Ordenar de Z-A</option>
                  </select>
                </div>
                <button
                  className="w-full py-2 mt-6 text-white transition bg-green-500 rounded-md hover:bg-green-600"
                  onClick={handleAplicarFiltro}
                >
                  Aplicar filtro
                </button>
              </aside>

              {/* Grid de Produtos */}
              <section className="lg:w-3/4">
                <div className="grid grid-cols-2 gap-6 md:grid-cols-3 xl:grid-cols-4">
                  {produtosFiltrados.length > 0 ? (
                    produtosFiltrados.map((produto) => (
                      <div
                        key={produto.id}
                        className="flex flex-col items-center p-4 bg-white shadow-md rounded-2xl"
                      >
                        <div className="flex items-center justify-center w-full h-64 mb-4 bg-gray-200"> {/* Tamanho ajustado */}
                          <img
                            src={produto.imagem}
                            alt={produto.nome}
                            className="object-cover w-full h-full rounded-lg"
                          />
                        </div>
                        <h3 className="font-medium text-center text-black">
                          {produto.nome}
                        </h3>
                        <div className="flex flex-col w-full gap-2 mt-4">
                          <button
                            onClick={() => navigate(`/detalhes/${produto.id}`)}
                            className="w-full px-4 py-2 text-sm font-bold text-white bg-teal-600 rounded-md hover:bg-teal-700"
                          >
                            Detalhes
                          </button>

                          <button
                            onClick={() => handleWhatsApp(produto.nome)}
                            className="flex items-center justify-center w-full gap-2 px-4 py-2 text-sm font-bold text-white transition bg-green-500 rounded-md hover:bg-green-600"
                          >
                            <FaWhatsapp className="w-4 h-4" />
                            WhatsApp
                          </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p>Nenhum produto encontrado.</p>
                  )}
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Produtos;
