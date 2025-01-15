import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa";

const DetalhesProduto = () => {
  const { id } = useParams();
  const [produto, setProduto] = useState(null);
  const [imagemAtual, setImagemAtual] = useState(0);
  const [miniaturaInicio, setMiniaturaInicio] = useState(0);

  useEffect(() => {
    const fetchProduto = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/produto/${id}`);
        console.log('Dados recebidos do produto:', response.data); // Verifique os dados recebidos
        setProduto(response.data);
      } catch (error) {
        console.error("Erro ao buscar o produto:", error);
      }
    };

    fetchProduto();
  }, [id]);

  if (!produto) {
    return <div>Carregando...</div>;
  }

  const handleImagemAnterior = () => {
    setImagemAtual((prev) => (prev === 0 ? produto.imagens.length - 1 : prev - 1));
  };

  const handleImagemProxima = () => {
    setImagemAtual((prev) => (prev === produto.imagens.length - 1 ? 0 : prev + 1));
  };

  const handleMiniaturasAnterior = () => {
    setMiniaturaInicio((prev) => Math.max(prev - 3, 0));
  };

  const handleMiniaturasProxima = () => {
    setMiniaturaInicio((prev) => Math.min(prev + 3, produto.imagens.length - 3));
  };

  const miniaturasVisiveis = produto.imagens.slice(miniaturaInicio, miniaturaInicio + 3);

  return (
    <main className="relative min-h-screen select-none">
      <div className="container w-full px-6 mx-auto mt-8 max-w-7xl">
        <div className="p-6 bg-white shadow-md rounded-2xl">
          {/* Nome do Produto */}
          <h2 className="text-3xl font-bold text-gray-800 mb-6">{produto.nome}</h2>

          {/* Container Principal */}
          <div className="flex flex-col items-start gap-6 lg:flex-row">
            {/* Seção de Imagens */}
            <div className="flex flex-col items-center w-full lg:w-1/3">
              {/* Imagem Principal */}
              <div className="relative">
                <img
                  className="w-80 h-80 object-cover rounded-lg border border-gray-200"
                  src={`http://localhost:5000/${produto.imagens[imagemAtual]}`}
                  alt={`Imagem ${imagemAtual + 1}`}
                />
                {/* Botões de Navegação */}
                <button
                  onClick={handleImagemAnterior}
                  className="absolute left-0 p-2 transform -translate-y-1/2 bg-gray-200 rounded-full shadow-md top-1/2 hover:bg-gray-300"
                >
                  {"<"}
                </button>
                <button
                  onClick={handleImagemProxima}
                  className="absolute right-0 p-2 transform -translate-y-1/2 bg-gray-200 rounded-full shadow-md top-1/2 hover:bg-gray-300"
                >
                  {">"}
                </button>
              </div>

              {/* Miniaturas */}
              <div className="flex gap-2 mt-4">
                <button
                  onClick={handleMiniaturasAnterior}
                  disabled={miniaturaInicio === 0}
                  className="p-2 bg-gray-200 rounded-full shadow-md hover:bg-gray-300"
                >
                  {"<"}
                </button>
                {miniaturasVisiveis.map((caminho, index) => (
                  <img
                    key={index}
                    src={`http://localhost:5000/${caminho}`}
                    alt={`Miniatura ${miniaturaInicio + index + 1}`}
                    className={`w-16 h-16 object-cover border-2 ${
                      miniaturaInicio + index === imagemAtual ? "border-green-600" : "border-gray-300"
                    } rounded-lg cursor-pointer`}
                    onClick={() => setImagemAtual(miniaturaInicio + index)}
                  />
                ))}
                <button
                  onClick={handleMiniaturasProxima}
                  disabled={miniaturaInicio + 3 >= produto.imagens.length}
                  className="p-2 bg-gray-200 rounded-full shadow-md hover:bg-gray-300"
                >
                  {">"}
                </button>
              </div>
            </div>

            {/* Seção de Descrição */}
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Descrição do Produto</h3>
              <p className="text-gray-600 mb-6">{produto.descricao}</p>
              <button className="px-6 py-3 text-white bg-green-600 rounded-lg flex items-center justify-center hover:bg-green-700">
                <FaWhatsapp className="mr-2" /> WhatsApp
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default DetalhesProduto;
