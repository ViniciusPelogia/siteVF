const database = require("../models");
const uuidv4 = require('uuid')

module.exports = class ProdutoController {
  static async criaProduto(req, res) {
    const { nome, descricao, link } = req.body;
    try {
        const produto = await database.produtos.create({
            id: uuidv4(),
            nome: nome,
            descricao: descricao,
            link: link
        })

        const imagem = await database.imagens.create({
            id: uuidv4(),
            caminho: 
        })

    } catch (error) {
      res.status(400).json(error.message);
    }
  }
};
