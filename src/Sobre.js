import React from 'react'

const Sobre = () => {
  return (
    <div className="relative min-h-screen">
      <div className="container px-6 mx-auto mt-4">
        <section id="sobre-nos" className="flex flex-col md:flex-row bg-white shadow-lg p-6 rounded-lg">
          <div className="flex-1">
            <div className="relative mb-6">
              <img
                src="https://via.placeholder.com/600x400.png?text=Imagem+da+Empresa"
                alt="Imagem sobre a empresa"
                className="w-full h-auto rounded-lg"
              />
              <div className="absolute top-1/2 left-0 right-0 flex justify-between px-4">
                <button className="text-white bg-green-600 p-2 rounded-full">{"<"}</button>
                <button className="text-white bg-green-600 p-2 rounded-full">{">"}</button>
              </div>
            </div>
            <p className="text-xl text-gray-700">Apresentação da empresa...</p>
          </div>
          <div className="flex-1 mt-6 md:mt-0 md:ml-8">
            <h2 className="text-3xl font-bold text-green-600">Sobre nós</h2>
            <p className="mt-4 text-lg text-gray-600">
              Somos uma empresa dedicada a oferecer soluções inovadoras para o seu negócio.
              Nosso compromisso é com qualidade, sustentabilidade e inovação em tudo o que fazemos.
            </p>
            <div className="mt-6">
              <h3 className="text-2xl font-semibold text-green-600">Contate-nos</h3>
              <p className="text-lg text-gray-600">DDD: 99999-9999</p>
              <p className="text-lg text-gray-600">@instagram</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default Sobre