import React from "react";
import { FaWhatsapp } from "react-icons/fa";

const DetalhesProduto = () => {
  const imagens = [
    "https://via.placeholder.com/300",
    "https://via.placeholder.com/300",
    "https://via.placeholder.com/300",
  ];

  const [imagemAtual, setImagemAtual] = React.useState(0);

  const handleImagemAnterior = () => {
    setImagemAtual((prev) => (prev === 0 ? imagens.length - 1 : prev - 1));
  };

  const handleImagemProxima = () => {
    setImagemAtual((prev) => (prev === imagens.length - 1 ? 0 : prev + 1));
  };

  return (
    <main className="relative min-h-screen">
      <div className="container px-6 mx-auto mt-8 w-full">
        <div className="p-6 bg-white shadow-md rounded-2xl">
          {/* Nome do Produto */}
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Nome do Produto</h2>

          {/* Container Principal */}
          <div className="flex flex-col lg:flex-row items-start gap-6">
            {/* Seção de Imagens */}
            <div className="flex flex-col items-center">
              {/* Imagem Principal */}
              <div className="relative">
                <img
                  className="w-80 h-80 object-cover rounded-lg border border-gray-200"
                  src={imagens[imagemAtual]}
                  alt={`Imagem ${imagemAtual + 1}`}
                />
                {/* Botões de Navegação */}
                <button
                  onClick={handleImagemAnterior}
                  className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-gray-200 p-2 rounded-full shadow-md hover:bg-gray-300"
                >
                  {"<"}
                </button>
                <button
                  onClick={handleImagemProxima}
                  className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-gray-200 p-2 rounded-full shadow-md hover:bg-gray-300"
                >
                  {">"}
                </button>
              </div>

              {/* Miniaturas */}
              <div className="flex gap-2 mt-4">
                {imagens.map((imagem, index) => (
                  <img
                    key={index}
                    src={imagem}
                    alt={`Miniatura ${index + 1}`}
                    className={`w-16 h-16 object-cover border-2 ${
                      index === imagemAtual
                        ? "border-green-600"
                        : "border-gray-300"
                    } rounded-lg cursor-pointer`}
                    onClick={() => setImagemAtual(index)}
                  />
                ))}
              </div>
            </div>

            {/* Seção de Descrição */}
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Descrição do Produto</h3>
              <p className="text-gray-600 mb-6">
                Esta é uma descrição detalhada do produto. Aqui você pode adicionar
                informações importantes como características, benefícios e outros
                detalhes relevantes para o cliente.
              </p>
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