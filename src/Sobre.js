import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const Sobre = () => {
  const [empresa, setEmpresa] = useState(null);
  const [imagens, setImagens] = useState([]);
  const [imagemAtual, setImagemAtual] = useState(0);

  useEffect(() => {
    const fetchEmpresa = async () => {
      try {
        const response = await axios.get('http://localhost:5000/empresa');
        console.log('Dados recebidos da empresa:', response.data); // Verifique os dados recebidos
        setEmpresa(response.data.empresa);
        setImagens(response.data.imagens);
      } catch (error) {
        console.error("Erro ao buscar os dados da empresa:", error);
      }
    };

    fetchEmpresa();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setImagemAtual((prev) => (prev === imagens.length - 1 ? 0 : prev + 1));
    }, 3000);

    return () => clearInterval(interval);
  }, [imagens]);

  const handleImagemAnterior = () => {
    setImagemAtual((prev) => (prev === 0 ? imagens.length - 1 : prev - 1));
  };

  const handleImagemProxima = () => {
    setImagemAtual((prev) => (prev === imagens.length - 1 ? 0 : prev + 1));
  };

  if (!empresa) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="relative min-h-screen">
      <div className="container px-6 mx-auto mt-4">
        <section id="sobre-nos" className="flex flex-col md:flex-row bg-white shadow-lg p-6 rounded-lg">
          <div className="flex-1">
            <div className="relative mb-6">
              <div className="relative">
                <img
                  className="w-full h-80 object-cover rounded-lg border border-gray-200"
                  src={`http://localhost:5000/uploads/${imagens[imagemAtual]}`}
                  alt={`Imagem ${imagemAtual + 1}`}
                />
                {/* Botões de Navegação */}
                <button
                  onClick={handleImagemAnterior}
                  className="absolute left-2 p-2 transform -translate-y-1/2 bg-green-600 rounded-full text-white top-1/2 hover:bg-green-700"
                >
                  <FaArrowLeft />
                </button>
                <button
                  onClick={handleImagemProxima}
                  className="absolute right-2 p-2 transform -translate-y-1/2 bg-green-600 rounded-full text-white top-1/2 hover:bg-green-700"
                >
                  <FaArrowRight />
                </button>
              </div>

              {/* Miniaturas */}
              <div className="flex gap-2 mt-4 justify-center">
                {imagens.map((caminho, index) => (
                  <img
                    key={index}
                    src={`http://localhost:5000/uploads/${caminho}`}
                    alt={`Miniatura ${index + 1}`}
                    className={`w-16 h-16 object-cover border-2 ${
                      index === imagemAtual ? "border-green-600" : "border-gray-300"
                    } rounded-lg cursor-pointer`}
                    onClick={() => setImagemAtual(index)}
                  />
                ))}
              </div>
            </div>
            <p className="text-xl text-gray-700"></p>
          </div>
          <div className="flex-1 mt-6 md:mt-0 md:ml-8">
            <h2 className="text-3xl font-bold text-green-600">Sobre nós</h2>
            <p className="mt-4 text-lg text-gray-600">
            {empresa.descricao}
            </p>
            <div className="mt-6">
              <h3 className="text-2xl font-semibold text-green-600">Contate-nos</h3>
              <p className="text-lg text-gray-600">Telefone: {empresa.telefone ? empresa.telefone : "Não disponível"}</p>
              <p className="text-lg text-gray-600">Instagram: {empresa.instagram ? empresa.instagram : "Não disponível"}</p>
              <p className="text-lg text-gray-600">CNPJ: {empresa.cnpj ? empresa.cnpj : "Não disponível"}</p>
              <p className="text-lg text-gray-600">EMAIL: {empresa.email ? empresa.email : "Não disponível"}</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Sobre;
