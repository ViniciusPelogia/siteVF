const database = require("../models/");
const { v4: uuidv4 } = require("uuid");
const path = require("path");

module.exports = class DestaqueController {
  static async criaDestaque(req, res) {
    try {
      const { produtoId, descricao } = req.body;

      const destaque = await database.destaques.create({
        product_id: produtoId,
        descricao: descricao,
      });

      res.status(200).json(destaque);
    } catch (error) {
      res.status(400).json(error.message);
    }
  }

  static async todosDestaques(req, res) {
    try {
      // Obter todos os destaques
      const destaques = await database.destaques.findAll();

      // Variável para armazenar os produtos em destaque com suas imagens
      const resultados = [];

      // Iterar sobre cada destaque para buscar os detalhes do produto e suas imagens
      await Promise.all(
        destaques.map(async (destaque) => {
          const produto = await database.produtos.findOne({
            where: { id: destaque.product_id },
          });

          const imagensxprodutos = await database.imagensxprodutos.findAll({
            where: { product_id: destaque.product_id },
            limit: 3, // Limitando a quantidade de imagens a 3
          });

          const imagens = imagensxprodutos.map((ip) => ip.imagem_id);

          resultados.push({
            id: produto.id,
            nome: produto.nome,
            link: produto.link,
            descricao: destaque.descricao,
            imagens: imagens,
          });
        })
      );

      res.status(200).json(resultados);
    } catch (error) {
      res.status(400).json(error.message);
    }
  }

  static async buscarDestaquePorId(req, res) {
    try {
      const { id } = req.params; // Pegar o ID do parâmetro

      // Buscar o destaque pelo product_id
      const destaque = await database.destaques.findOne({
        where: { product_id: id },
      });

      if (!destaque) {
        return res.status(404).json({ message: "Destaque não encontrado" });
      }

      // Buscar detalhes do produto em destaque
      const produto = await database.produtos.findOne({
        where: { id: destaque.product_id },
      });

      // Buscar imagens associadas ao produto em destaque
      const imagensxprodutos = await database.imagensxprodutos.findAll({
        where: { product_id: destaque.product_id },
        limit: 3, // Limitando a quantidade de imagens a 3
      });

      const imagens = imagensxprodutos.map((ip) => ip.imagem_id);

      // Estruturar o resultado
      const resultado = {
        id: produto.id,
        nome: produto.nome,
        link: produto.link,
        descricao: destaque.descricao,
        imagens: imagens,
      };

      res.status(200).json(resultado);
    } catch (error) {
      res.status(400).json(error.message);
    }
  }

  static async deleteDestaque(req, res) {
    try {
      const { id } = req.params;

      const destaque = await database.destaques.findOne({
        where: { product_id: id },
      });

      if (!destaque) {
        return res.status(404).json({ message: "Destaque não encontrado" });
      }

      await database.destaques.destroy({
        where: { product_id: id },
      });

      res.status(200).json({ message: "Destaque excluído com sucesso" });
    } catch (error) {
      res.status(400).json(error.message);
    }
  }

  static async updateDestaque(req, res) {
    try {
      const { id } = req.params;
      const { descricao } = req.body;

      const destaque = await database.destaques.findOne({
        where: { product_id: id },
      });

      if (!destaque) {
        return res.status(404).json({ message: "Destaque não encontrado" });
      }

      await database.destaques.update(
        { descricao },
        { where: { product_id: id } }
      );

      res.status(200).json({ message: "Destaque atualizado com sucesso" });
    } catch (error) {
      res.status(400).json(error.message);
    }
  }
};
