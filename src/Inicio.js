import React from "react";
import { FaWhatsapp } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Inicio = () => {
    const navigate = useNavigate();
    const produtos = [
        { id: 1, nome: "Produto 1", descricao: "Descrição do Produto 1" },
        { id: 2, nome: "Produto 2", descricao: "Descrição do Produto 2" },
        { id: 3, nome: "Produto 3", descricao: "Descrição do Produto 3" },
    ];

    return (
        <>
            <main className="relative">
                <div className="container px-6 mx-auto mt-4 w-full">
                    <div className="p-6 bg-white shadow-md rounded-2xl">
                        <h2 className="text-2xl font-bold text-green-600 mb-6">Destaques</h2>
                        <div className="flex flex-col gap-12">
                            {produtos.map((produto) => (
                                <div
                                    key={produto.id}
                                    className="flex flex-col lg:flex-row items-center bg-white border border-gray-200 rounded-lg shadow-xl overflow-hidden"
                                >
                                    {/* Imagem no lado esquerdo */}
                                    <img
                                        className="w-full lg:w-96 h-96 object-cover rounded-lg"
                                        src="https://via.placeholder.com/600"
                                        alt={`Imagem do ${produto.nome}`}
                                    />
                                    {/* Conteúdo no lado direito */}
                                    <div className="p-6 flex-1 w-full lg:w-96">
                                        <h3 className="text-2xl font-bold text-gray-800 mb-4">
                                            {produto.nome}
                                        </h3>
                                        <p className="text-lg text-gray-600 mb-6">{produto.descricao}</p>
                                        <div className="flex flex-wrap gap-4">
                                            <button
                                                onClick={() => navigate(`/detalhes/${produto.id}`)}
                                                className="px-6 py-3 w-full lg:w-auto text-center text-white bg-teal-600 rounded-lg hover:bg-teal-700"
                                            >
                                                Detalhes
                                            </button>
                                            <button className="px-6 py-3 w-full lg:w-auto text-center text-white bg-green-600 rounded-lg flex items-center justify-center hover:bg-green-700">
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
