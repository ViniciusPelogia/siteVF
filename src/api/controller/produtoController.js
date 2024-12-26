const database = require("../models/");
const { v4: uuidv4 } = require("uuid");
const path = require("path");

module.exports = class ProdutoController {
  static async criaProduto(req, res) {
    const { nome, descricao, link } = req.body;
    const file = req.file; // Corrigi a extração do 'file'
    try {
      const produto = await database.produtos.create({
        id: uuidv4(),
        nome: nome,
        descricao: descricao,
        link: link,
      });

      res.status(202).json(produto); // Responda com um objeto JSON
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async criaImagem(req, res) {
    const { id } = req.params;
    const { file } = req;
    console.log("ID do Produto:", id);
    console.log("Arquivo:", file);
    try {
      const produtoExiste = await database.produtos.findByPk(id);
      if (!produtoExiste) {
        throw new Error("Produto não encontrado");
      }
      const imagem = await database.imagens.create({
        id: uuidv4(),
        caminho: file.path,
      });

      const relacao = await database.imagensxprodutos.create({
        imagem_id: imagem.id,
        product_id: produtoExiste.id,
      });

      res.status(202).json({ imagem, relacao });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async buscaTodosprodutos(req, res) {
    try {
      const produtos = await database.produtos.findAll({
        include: [
          {
            model: database.imagensxprodutos,
            as: "imagensxprodutos",
            attributes: ["imagem_id"], // Incluindo apenas o ID da imagem
            order: [["createdAt", "ASC"]], // Ordenando pela data de criação
            limit: 1,
          },
        ],
      });
      res.status(200).json(produtos);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async buscaProdutoPorId(req, res) {
    const { id } = req.params;
    try {
      const produto = await database.produtos.findOne({
        where: {
          id: id,
        },
        include: [
          {
            model: database.imagens,
            as: "imagens",
            attributes: ["id"],
            order: [["createdAt", "ASC"]],
          },
        ],
      });

      res.status(200).json(produto);
    } catch (error) {
      res.status(400).json(error.message);
    }
  }

  static async atualizaProduto(req, res) {
    const { id } = req.params;
    const { nome, descricao, link } = req.body;
    try {
      const produto = await database.produtos.findByPk(id);
      if (produto) {
        produto.nome = nome;
        produto.descricao = descricao;
        produto.link = link;
        await produto.save();
      }

      res.status(200).json(produto);
    } catch (error) {
      res.status(400).json(error.message);
    }
  }

  static async excluiProduto(req, res) {
    const transaction = await database.sequelize.transaction();
    try {
      const { id } = req.params;

      // Verifique se o produto existe
      const produto = await database.produtos.findByPk(id, { transaction });
      if (!produto) {
        await transaction.rollback();
        return res.status(404).json("Produto não encontrado");
      }

      // Obter a relação das imagens associadas ao produto
      const relacao = await database.imagensxprodutos.findAll({
        where: { product_id: id },
        transaction,
      });

      const imagensId = relacao.map((im) => im.imagem_id);

      console.log("Produto:", produto);
      console.log("Relação de Imagens:", relacao);
      console.log("IDs das Imagens:", imagensId);

      // Excluir a relação produto-imagens primeiro
      const deleteRelacao = await database.imagensxprodutos.destroy({
        where: { product_id: id },
        transaction,
      });
      console.log("Resultado da Exclusão da Relação:", deleteRelacao);

      if (imagensId.length > 0) {
        // Excluir as imagens associadas ao produto após excluir a relação
        const deleteImagens = await database.imagens.destroy({
          where: { id: imagensId },
          transaction,
        });
        console.log("Resultado da Exclusão de Imagens:", deleteImagens);
      }

      // Excluir o produto
      const deleteProduto = await database.produtos.destroy({
        where: { id: id },
        transaction,
      });
      console.log("Resultado da Exclusão do Produto:", deleteProduto);

      await transaction.commit();
      res.status(200).json("PRODUTO EXCLUIDO COM SUCESSO");
    } catch (error) {
      await transaction.rollback();
      res.status(400).json(error.message);
    }
  }

  static async excluiImagem(req, res) {
    try {
      const { id } = req.params;

      const relacao = await database.imagensxprodutos.findAll({
        where: {
          product_id: id,
        },
      });

      const imagensId = relacao.map((im) => im.imagem_id);

      await database.imagens.destroy({
        where: {
          id: imagensId,
        },
      });

      await database.imagensxprodutos.destroy({
        where: {
          product_id: id,
        },
      });

      res.status(200).json("IMAGEM EXCLUIDO COM SUCESSO");
    } catch (error) {
      res.status(400).json(error.message);
    }
  }
};
