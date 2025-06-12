import React, { useEffect, useState } from "react";
import axios from "axios";
import { Maximize, Minimize } from "lucide-react";
import { FaArrowLeft, FaArrowRight, FaInstagram } from "react-icons/fa";
import API_BASE_URL from "./config";

const Sobre = () => {
  const [empresa, setEmpresa] = useState(null);
  const [imagens, setImagens] = useState([]);
  const [imagemAtual, setImagemAtual] = useState(0);
  const [paginaMiniaturas, setPaginaMiniaturas] = useState(0);
  const miniaturasPorPagina = 3;
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    mensagem: "",
  });

  // Estado para controle de expansão da imagem principal
  const [expandida, setExpandida] = useState(false);

  useEffect(() => {
    const fetchEmpresa = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/empresa/api/`);
        setEmpresa(response.data.empresa);
        setImagens(response.data.imagens);
      } catch (error) {
        console.error("Erro ao buscar os dados da empresa:", error);
      }
    };

    fetchEmpresa();
  }, []);

  useEffect(() => {
    if (imagens.length > 0) {
      const interval = setInterval(() => {
        setImagemAtual((prev) => (prev === imagens.length - 1 ? 0 : prev + 1));
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [imagens]);

  const handleImagemAnterior = () => {
    setImagemAtual((prev) => (prev === 0 ? imagens.length - 1 : prev - 1));
  };

  const handleImagemProxima = () => {
    setImagemAtual((prev) => (prev === imagens.length - 1 ? 0 : prev + 1));
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_BASE_URL}/newsletter`, formData);
      alert("Mensagem enviada com sucesso!");
      setFormData({ nome: "", email: "", mensagem: "" });
    } catch (error) {
      console.error("Erro ao enviar a mensagem:", error);
      alert("Erro ao enviar a mensagem. Tente novamente.");
    }
  };

  if (!empresa) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="relative min-h-screen">
      <div className="container px-6 mx-auto mt-4">
        {/* Seção superior: Carrossel e "Sobre nós" lado a lado */}
        <section className="flex flex-col md:flex-row bg-white shadow-lg p-6 rounded-lg mb-6">
          <div className="flex flex-col md:flex-row gap-6 mb-6">
            {/* Carrossel com tamanho reduzido */}
            <div className="w-full md:w-1/2 flex flex-col">
              {/* Container da imagem principal */}
              <div className={`relative ${expandida ? "h-auto" : "h-64"} min-h-[100px]`}>
                {imagens.length > 0 ? (
                  <>
                    <img
                      className="w-full h-full object-contain rounded-lg border border-gray-200"
                      src={`${API_BASE_URL}/uploads/${imagens[imagemAtual]}`}
                      alt={`Imagem ${imagemAtual + 1}`}
                    />
                    <button
                      onClick={handleImagemAnterior}
                      className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-green-600 rounded-full text-white p-2 hover:bg-green-700"
                    >
                      <FaArrowLeft />
                    </button>
                    <button
                      onClick={handleImagemProxima}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-green-600 rounded-full text-white p-2 hover:bg-green-700"
                    >
                      <FaArrowRight />
                    </button>
                  </>
                ) : (
                  <p className="text-xl text-gray-700">Nenhuma imagem disponível</p>
                )}
              </div>
              {/* Botão para expandir/contrair a imagem principal */}
              <button
                onClick={() => setExpandida((prev) => !prev)}
                className="bg-green-600 text-white px-4 py-2 rounded-lg ml-auto mt-4 flex"
              >
                {expandida ? <Minimize size={20} /> : <Maximize size={20} />}
              </button>
              {/* Miniaturas com navegação (igual a DetalhesProduto) */}
              <div className="flex items-center justify-center mt-4">
                <button
                  onClick={() => setPaginaMiniaturas((prev) => Math.max(prev - 1, 0))}
                  disabled={paginaMiniaturas === 0}
                  className="p-2 mx-2 bg-gray-300 rounded-full disabled:opacity-50"
                >
                  <FaArrowLeft />
                </button>
                <div className="grid grid-cols-3 gap-2">
                  {imagens
                    .slice(
                      paginaMiniaturas * miniaturasPorPagina,
                      (paginaMiniaturas + 1) * miniaturasPorPagina
                    )
                    .map((imagem, index) => (
                      <img
                        key={index}
                        src={`${API_BASE_URL}/uploads/${imagem}`}
                        alt={`Miniatura ${paginaMiniaturas * miniaturasPorPagina + index + 1}`}
                        className={`w-16 h-16 object-cover rounded-lg cursor-pointer transition-transform transform hover:scale-105 mx-1 ${
                          paginaMiniaturas * miniaturasPorPagina + index === imagemAtual
                            ? "border-4 border-green-600"
                            : "border-2 border-gray-300"
                        }`}
                        onClick={() =>
                          setImagemAtual(paginaMiniaturas * miniaturasPorPagina + index)
                        }
                      />
                    ))}
                </div>
                <button
                  onClick={() =>
                    setPaginaMiniaturas((prev) =>
                      Math.min(prev + 1, Math.ceil(imagens.length / miniaturasPorPagina) - 1)
                    )
                  }
                  disabled={(paginaMiniaturas + 1) * miniaturasPorPagina >= imagens.length}
                  className="p-2 mx-2 bg-gray-300 rounded-full disabled:opacity-50"
                >
                  <FaArrowRight />
                </button>
              </div>
            </div>
            {/* Bloco "Sobre nós" */}
            <div className="flex-1 flex flex-col justify-center p-4">
              <p className="text-xl font-semibold text-green-600">Sobre nós:</p>
              <p className="text-gray-600">{empresa.descricao}</p>
            </div>
          </div>
        </section>

        {/* Seção principal com Newsletter e Informações de Contato */}
        <section className="flex flex-col md:flex-row bg-white shadow-lg p-6 rounded-lg">
          {/* Newsletter */}
          <div className="flex-1 bg-gray-100 p-6 rounded-lg">
            <h2 className="text-2xl font-bold text-green-600 mb-4">{empresa.nome}</h2>
            <img
              src={`${API_BASE_URL}/${empresa.logo}`}
              alt="Logo da Empresa"
              className="w-28 h-28 object-contain rounded-lg mb-4 border border-gray-300"
            />
            <h3 className="text-xl font-semibold text-green-600">Entre em contato</h3>
            <p className="text-gray-600 mb-4">
              Preencha o formulário abaixo para nos enviar uma mensagem.
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-700 font-semibold">Nome</label>
                <input
                  type="text"
                  name="nome"
                  value={formData.nome}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold">Mensagem</label>
                <textarea
                  name="mensagem"
                  value={formData.mensagem}
                  onChange={handleChange}
                  rows="4"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
              >
                Enviar Mensagem
              </button>
            </form>
          </div>

          {/* Informações de Contato */}
          <div className="flex-1 mt-6 md:mt-0 md:ml-8">
            <h3 className="text-xl font-semibold text-green-600">Informações de Contato</h3>
            <p className="text-xl font-semibold text-green-600 mt-2">Endereço:</p>
            <p className="text-gray-600">{empresa.endereco || "Não disponível"}</p>
            <p className="text-xl font-semibold text-green-600 mt-2">Telefone:</p>
            <p className="text-gray-600">{empresa.telefone || "Não disponível"}</p>
            <p className="text-xl font-semibold text-green-600 mt-2">Email:</p>
            <p className="text-gray-600">{empresa.email || "Não disponível"}</p>
            <p className="text-xl font-semibold text-green-600 mt-2">Instagram:</p>
            <a
              href={empresa.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-blue-600"
            >
              <FaInstagram className="mr-2" />{" "}
              {empresa.instagram ? "Siga-nos" : "Não disponível"}
            </a>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Sobre;
