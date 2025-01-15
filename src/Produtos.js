import React, { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Produtos = () => {
  const [produtos, setProdutos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        const response = await axios.get('http://localhost:5000/produto');
        console.log('Dados recebidos:', response.data); // Verifique os dados recebidos

        if (response.data && response.data.length > 0) {
          const produtosComImagens = response.data.map(produto => ({
            ...produto,
            imagem: `http://localhost:5000/uploads/${produto.imagem}`
          }));
          console.log('Produtos processados:', produtosComImagens); // Verifique os produtos processados
          setProdutos(produtosComImagens);
        } else {
          console.warn('Nenhum produto encontrado na resposta da API');
        }
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
      }
    };

    fetchProdutos();
  }, []);

  const handleWhatsApp = () => {
    window.open("https://wa.me/SEU_NUMERO?text=Olá,%20quero%20saber%20mais%20sobre%20o%20produto.", "_blank");
  };

  return (
    <>
      <main className="relative min-h-screen">
        <div className="container px-6 mx-auto mt-4">
          <div className="p-6 bg-white shadow-md rounded-2xl">
            <div className="flex flex-col gap-6 lg:flex-row">
              <aside className="p-4 bg-white shadow-md lg:w-1/4 rounded-2xl">
                <h2 className="text-lg font-bold text-black">Filtros</h2>
                <div className="mt-4">
                  {/* Coloque as opções de filtro aqui */}
                </div>
                <button className="w-full py-2 mt-6 text-white transition bg-green-500 rounded-2xl hover:bg-green-600">
                  Aplicar filtro
                </button>
              </aside>

              {/* Grid de Produtos */}
              <section className="lg:w-3/4">
                <div className="grid grid-cols-2 gap-6 md:grid-cols-3 xl:grid-cols-4">
                  {/* Mapeando os produtos */}
                  {produtos.length > 0 ? (
                    produtos.map((produto) => (
                      <div
                        key={produto.id}
                        className="flex flex-col items-center p-4 bg-white shadow-md rounded-2xl"
                      >
                        <div className="flex items-center justify-center w-full h-32 mb-4 bg-gray-200">
                          <img src={produto.imagem} alt={produto.nome} className="object-cover w-full h-full rounded-lg" />
                        </div>
                        <h3 className="font-medium text-center text-black">{produto.nome}</h3>
                        <div className="flex flex-col w-full gap-2 mt-4">
                          <button
                            onClick={() => navigate(`/detalhes/${produto.id}`)}
                            className="w-full px-4 py-2 text-sm font-bold text-white transition bg-blue-500 rounded hover:bg-blue-600"
                          >
                            Detalhes
                          </button>
                          <button
                            onClick={handleWhatsApp}
                            className="flex items-center justify-center w-full gap-2 px-4 py-2 text-sm font-bold text-white transition bg-green-500 rounded hover:bg-green-600"
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
