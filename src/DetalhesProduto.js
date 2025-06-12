import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { FaArrowLeft, FaArrowRight, FaWhatsapp } from "react-icons/fa";
import API_BASE_URL from "./config";

const DetalhesProduto = () => {
  const { id } = useParams();
  const [produto, setProduto] = useState(null);
  const [imagensFiltradas, setImagensFiltradas] = useState([]);
  const [cores, setCores] = useState([]);
  const [corSelecionada, setCorSelecionada] = useState(null);
  const [imagemAtual, setImagemAtual] = useState(0);
  const [paginaMiniaturas, setPaginaMiniaturas] = useState(0);
  const miniaturasPorPagina = 3;
  const numeroWhatsApp = "5512992173256";

  useEffect(() => {
    const fetchProduto = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/produto/${id}`);
        const produtoData = response.data;
        produtoData.imagensxprodutos = produtoData.imagensxprodutos || [];
        produtoData.cores = produtoData.cores || [];
        setProduto(produtoData);
        setCores(produtoData.cores);

        const filtradas = produtoData.imagensxprodutos.filter((item) =>
          corSelecionada === null ? true : item.cor_id === corSelecionada
        );
        setImagensFiltradas(filtradas);
      } catch (error) {
        console.error("Erro ao buscar o produto:", error);
      }
    };

    fetchProduto();
  }, [id, corSelecionada]);

  useEffect(() => {
    setImagemAtual(0);
    setPaginaMiniaturas(0);
  }, [imagensFiltradas]);

  const handleImagemAnterior = () => {
    setImagemAtual((prev) =>
      prev === 0 ? imagensFiltradas.length - 1 : prev - 1
    );
  };

  const handleImagemProxima = () => {
    setImagemAtual((prev) =>
      prev === imagensFiltradas.length - 1 ? 0 : prev + 1
    );
  };

  const handleThumbnailClick = (index) => {
    setImagemAtual(index);
  };

  const handleMiniaturasAnterior = () => {
    setPaginaMiniaturas((prev) => Math.max(prev - 1, 0));
  };

  const handleMiniaturasProxima = () => {
    setPaginaMiniaturas((prev) =>
      Math.min(
        prev + 1,
        Math.ceil(imagensFiltradas.length / miniaturasPorPagina) - 1
      )
    );
  };

  if (!produto) {
    return <div>Carregando...</div>;
  }

  return (
    <main className="relative min-h-screen select-none">
      <div className="container w-full px-6 mx-auto mt-8 max-w-7xl">
        <div className="p-6 bg-white shadow-md rounded-2xl">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            {produto.nome}
          </h2>
          <div className="flex flex-col items-start gap-6 lg:flex-row">
            <div className="flex flex-col items-center w-full lg:w-1/3">
              {imagensFiltradas.length > 0 ? (
                <>
                  <div className="relative">
                    <img
                      className="w-full h-96 object-cover rounded-lg border border-gray-200"
                      src={`${API_BASE_URL}/${
                        imagensFiltradas[imagemAtual].imagem?.caminho ||
                        imagensFiltradas[imagemAtual].caminho
                      }`}
                      alt={`Imagem ${imagemAtual + 1}`}
                    />
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
                  <div className="flex items-center mt-4">
                    <button
                      onClick={handleMiniaturasAnterior}
                      disabled={paginaMiniaturas === 0}
                      className="p-2 bg-gray-300 rounded-full mx-2 disabled:opacity-50"
                    >
                      <FaArrowLeft />
                    </button>
                    <div className="grid grid-cols-3 gap-2">
                      {imagensFiltradas
                        .slice(
                          paginaMiniaturas * miniaturasPorPagina,
                          (paginaMiniaturas + 1) * miniaturasPorPagina
                        )
                        .map((img, index) => (
                          <img
                            key={index}
                            className={`w-20 h-20 object-cover border-2 cursor-pointer rounded-md ${
                              index + paginaMiniaturas * miniaturasPorPagina ===
                              imagemAtual
                                ? "border-green-600"
                                : "border-gray-300"
                            }`}
                            src={`${API_BASE_URL}/${
                              img.imagem?.caminho || img.caminho
                            }`}
                            alt={`Miniatura ${index + 1}`}
                            onClick={() =>
                              handleThumbnailClick(
                                index + paginaMiniaturas * miniaturasPorPagina
                              )
                            }
                          />
                        ))}
                    </div>
                    <button
                      onClick={handleMiniaturasProxima}
                      disabled={
                        (paginaMiniaturas + 1) * miniaturasPorPagina >=
                        imagensFiltradas.length
                      }
                      className="p-2 bg-gray-300 rounded-full mx-2 disabled:opacity-50"
                    >
                      <FaArrowRight />
                    </button>
                  </div>
                </>
              ) : (
                <div className="w-full h-96 flex items-center justify-center bg-gray-100">
                  <span>Sem imagens para esta cor.</span>
                </div>
              )}
            </div>

            <div className="flex-1">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Descrição do Produto
              </h3>
              <p className="text-gray-600 mb-6">{produto.descricao}</p>

              <div className="mt-6">
                <label className="block text-lg font-semibold text-gray-800">
                  Escolha a Cor:
                </label>
                <select
                  className="mt-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700"
                  value={corSelecionada !== null ? corSelecionada : ""}
                  onChange={(e) => {
                    const val = e.target.value;
                    setCorSelecionada(val === "" ? null : Number(val));
                  }}
                >
                  <option value="">Sem filtro</option>
                  {produto.cores &&
                    produto.cores.map((cor) => (
                      <option key={cor.id} value={cor.id}>
                        {cor.nome}
                      </option>
                    ))}
                </select>
              </div>

              <button
                onClick={() => {
                  const corInfo = cores.find(
                    (c) => c.id === Number(corSelecionada)
                  );
                  const nomeCor = corInfo ? corInfo.nome : null;
                  const mensagem = nomeCor
                    ? `Olá, tenho interesse no produto ${produto.nome.replace(
                        /\//g,
                        "-"
                      )} na cor ${nomeCor}`
                    : `Olá, tenho interesse no produto ${produto.nome.replace(
                        /\//g,
                        "-"
                      )}`;

                  const urlMobile = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(
                    mensagem
                  )}`;
                  const urlDesktop = `https://web.whatsapp.com/send?phone=${numeroWhatsApp}&text=${encodeURIComponent(
                    mensagem
                  )}`;

                  const isMobile = /Android|iPhone|iPad|iPod/i.test(
                    navigator.userAgent
                  );
                  window.open(isMobile ? urlMobile : urlDesktop, "_blank");
                }}
                className="mt-6 px-6 py-3 text-white bg-green-600 rounded-lg flex items-center justify-center hover:bg-green-700"
              >
                <FaWhatsapp className="mr-2" /> Preço sob consulta
              </button>
            </div>
          </div>

          <div className="mt-12">
            <h3 className="text-2xl font-bold text-green-600 mb-4">Detalhes</h3>
            <div className="text-lg text-gray-600 whitespace-pre-wrap">
              {produto.detalhes}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default DetalhesProduto;
