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
                <div className="container w-full px-6 mx-auto mt-4">
                    <div className="p-6 bg-white shadow-md rounded-2xl">
                        <h2 className="mb-6 text-2xl font-bold text-green-600">Destaques</h2>
                        <div className="flex flex-col gap-12">
                            {produtos.map((produto) => (
                                <div
                                    key={produto.id}
                                    className="flex flex-col items-center overflow-hidden bg-white border border-gray-200 rounded-lg shadow-xl lg:flex-row"
                                >
                                    {/* Imagem no lado esquerdo */}
                                    <img
                                        className="object-cover w-full rounded-lg lg:w-96 h-96"
                                        src="https://placehold.co/600"
                                        alt={`Imagem do ${produto.nome}`}
                                    />
                                    {/* Conteúdo no lado direito */}
                                    <div className="flex-1 w-full p-6 lg:w-96">
                                        <h3 className="mb-4 text-2xl font-bold text-gray-800">
                                            {produto.nome}
                                        </h3>
                                        <p className="mb-6 text-lg text-gray-600">{produto.descricao}</p>
                                        <div className="flex flex-wrap gap-4">
                                            <button
                                                onClick={() => navigate(`/detalhes/${produto.id}`)}
                                                className="w-full px-6 py-3 text-center text-white bg-teal-600 rounded-lg lg:w-auto hover:bg-teal-700"
                                            >
                                                Detalhes
                                            </button>
                                            <button className="flex items-center justify-center w-full px-6 py-3 text-center text-white bg-green-600 rounded-lg lg:w-auto hover:bg-green-700">
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
