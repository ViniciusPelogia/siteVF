import { FaWhatsapp } from "react-icons/fa";

const Produtos = () => {
  // Array com dados dos produtos
  const produtos = [
    { nome: "Produto 1", imagem: "https://placehold.co/150" },
    { nome: "Produto 2", imagem: "https://placehold.co/150" },
    { nome: "Produto 3", imagem: "https://placehold.co/150" },
    { nome: "Produto 4", imagem: "https://placehold.co/150" },
  ];

  const handleWhatsApp = () => {
    // Aqui precisa colocar o zapzap e o recado qdo entrar em contato 
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
                  {produtos.map((produto, index) => (
                    <div
                      key={index}
                      className="flex flex-col items-center p-4 bg-white shadow-md rounded-2xl"
                    >
                      <div className="flex items-center justify-center w-full h-32 mb-4 bg-gray-200">
                        <img src={produto.imagem} alt={produto.nome} className="object-cover w-full h-full rounded-lg" />
                      </div>
                      <h3 className="font-medium text-center text-black">{produto.nome}</h3>
                      <div className="flex flex-col w-full gap-2 mt-4">
                        <button className="w-full px-4 py-2 text-sm font-bold text-white transition bg-blue-500 rounded hover:bg-blue-600">
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
                  ))}
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