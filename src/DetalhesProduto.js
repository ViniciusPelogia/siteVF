import React from "react";
import { FaWhatsapp } from "react-icons/fa";

const DetalhesProduto = () => {
  const imagens = [
    "https://placehold.co/300",
    "https://placehold.co/300",
    "https://placehold.co/300",
  ];

  const [imagemAtual, setImagemAtual] = React.useState(0);

  const handleImagemAnterior = () => {
    setImagemAtual((prev) => (prev === 0 ? imagens.length - 1 : prev - 1));
  };

  const handleImagemProxima = () => {
    setImagemAtual((prev) => (prev === imagens.length - 1 ? 0 : prev + 1));
  };

  return (
    <main className="relative min-h-screen select-none">
      <div className="container w-full px-6 mx-auto mt-8 max-w-7xl">
        <div className="p-6 bg-white shadow-md rounded-2xl">
          {/* Nome do Produto */}
          <h2 className="mb-6 text-3xl font-bold text-gray-800">Nome do Produto</h2>

          {/* Container Principal */}
          <div className="flex flex-col items-start gap-6 lg:flex-row">
            {/* Seção de Imagens */}
            <div className="flex flex-col items-center w-full lg:w-1/3">
              {/* Imagem Principal */}
              <div className="relative">
                <img
                  className="object-cover w-full border border-gray-200 rounded-lg h-80"
                  src={imagens[imagemAtual]}
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
              <div className="flex gap-2 mt-4 overflow-x-auto">
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
            <div className="flex-1 lg:ml-8">
              <h3 className="mb-4 text-xl font-semibold text-gray-800">Descrição do Produto</h3>
              <p className="mb-6 text-gray-600">
                Esta é uma descrição detalhada do produto. Aqui você pode adicionar
                informações importantes como características, benefícios e outros
                detalhes relevantes para o cliente.
              </p>
              <button className="flex items-center justify-center px-6 py-3 text-white bg-green-600 rounded-lg hover:bg-green-700">
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
