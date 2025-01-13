import { FaWhatsapp } from "react-icons/fa";

const Produtos = () => {
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

              {/* PRODUTOS */}
              <section className="lg:w-3/4">
                <div className="grid grid-cols-2 gap-6 md:grid-cols-3 xl:grid-cols-4">
                  {/* Produto 1 */}
                  <div className="flex flex-col items-center p-4 bg-white shadow-md rounded-2xl">
                    <div className="flex items-center justify-center w-full h-32 mb-4 bg-gray-200">
                      {/* Aqui você pode colocar uma imagem de produto */}
                    </div>
                    <h3 className="font-medium text-center text-black">Nome do produto</h3>
                    <div className="flex flex-col w-full gap-2 mt-4">
                      <button className="w-full px-4 py-2 text-sm font-bold text-white transition bg-blue-500 rounded hover:bg-blue-600">
                        Detalhes
                      </button>
                      <button className="flex items-center justify-center w-full gap-2 px-4 py-2 text-sm font-bold text-white transition bg-green-500 rounded hover:bg-green-600">
                        <FaWhatsapp className="w-4 h-4" />
                        WhatsApp
                      </button>
                    </div>
                  </div>
                  {/* Repita para outros produtos */}
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