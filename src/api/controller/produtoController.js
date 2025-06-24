const database = require("../models/");
const { v4: uuidv4 } = require("uuid");
const path = require("path");

module.exports = class ProdutoController {
  static async criaProduto(req, res) {
    const { nome, descricao, detalhes, cores } = req.body; // Pegando as cores enviadas na requisição

    try {
      const produto = await database.produtos.create({
        id: uuidv4(),
        nome: nome,
        descricao: descricao,
        detalhes: detalhes,
      });

      // Se cores foram enviadas, cria a relação na tabela produtosxcores
      if (cores && Array.isArray(cores)) {
        await Promise.all(
          cores.map(async (corId) => {
            await database.produtosxcores.create({
              product_id: produto.id,
              cor_id: corId, // Usando o ID da cor enviada no JSON
            });
          })
        );
      }

      res.status(202).json(produto); // Mantendo o código de resposta original
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async criaImagem(req, res) {
    const { id } = req.params;
    const file = req.file;
    const { cor_id } = req.body; // cor_id pode vir vazio
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

      // Se cor_id estiver vazio, armazena null
      const relacao = await database.imagensxprodutos.create({
        imagem_id: imagem.id,
        product_id: produtoExiste.id,
        cor_id: cor_id || null, // Se cor_id for falsy (vazio), fica null
      });

      res.status(202).json({ imagem, relacao });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async buscaTodosprodutos(req, res) {
    try {
      const produtos = await database.produtos.findAll();

      const produtosComImagens = await Promise.all(
        produtos.map(async (produto) => {
          const imagensxprodutos = await database.imagensxprodutos.findAll({
            where: { product_id: produto.id },
            limit: 1, // Limitando a quantidade de imagens a 1
          });

          const imagens = await Promise.all(
            imagensxprodutos.map(async (ip) => {
              const imagem = await database.imagens.findOne({
                where: { id: ip.imagem_id },
                attributes: ["caminho"],
              });
              return imagem ? path.basename(imagem.caminho) : null;
            })
          );

          // Buscar as relações de cores do produto
          const produtosxcores = await database.produtosxcores.findAll({
            where: { product_id: produto.id },
          });

          // Para cada relação, busque o objeto completo da cor
          const cores = await Promise.all(
            produtosxcores.map(async (relacao) => {
              const cor = await database.cores.findOne({
                where: { id: relacao.cor_id },
                attributes: ["id", "nome", "codigo_hex"],
              });
              return cor;
            })
          );

          return {
            id: produto.id,
            nome: produto.nome,
            detalhes: produto.detalhes,
            descricao: produto.descricao,
            imagem: imagens.filter((caminho) => caminho !== null)[0],
            cores: cores.filter((cor) => cor !== null), // Retorna array com objetos de cor
          };
        })
      );

      res.status(200).json(produtosComImagens);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async buscaProdutoPorId(req, res) {
    const { id } = req.params;
    try {
      const produto = await database.produtos.findOne({ where: { id } });
      if (!produto) return res.status(404).json({ message: "Produto não encontrado" });
  
      const imagensxprodutos = await database.imagensxprodutos.findAll({ where: { product_id: id } });
  
      const imagensComCor = await Promise.all(
        imagensxprodutos.map(async (rel) => {
          const imagem = await database.imagens.findOne({
            where: { id: rel.imagem_id },
            attributes: ["caminho"]
          });
          if (!imagem) return null;
  
          // aqui garantimos que `caminho` fique no formato "/uploads/xxx.ext"
          const fileName = path.basename(imagem.caminho);
          return {
            cor_id: rel.cor_id,
            caminho: `/uploads/${fileName}`
          };
        })
      );
  
      // busca de cores (igual você já faz)
      const relacoesDeCores = await database.produtosxcores.findAll({ where: { product_id: id } });
      const coresDoProduto = await Promise.all(
        relacoesDeCores.map(async (rel) => {
          const cor = await database.cores.findOne({
            where: { id: rel.cor_id },
            attributes: ["id", "nome", "codigo_hex"]
          });
          return cor;
        })
      );
  
      return res.json({
        id: produto.id,
        nome: produto.nome,
        detalhes: produto.detalhes,
        descricao: produto.descricao,
        imagensxprodutos: imagensComCor.filter(Boolean),
        cores: coresDoProduto.filter(Boolean)
      });
  
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }
  

  static async buscaCor(req, res) {
    const produtoId = req.params.id;

    try {
      const produto = await database.produtos.findByPk(produtoId, {
        include: [{ model: database.cores, through: { attributes: [] } }],
      });

      if (!produto) {
        return res.status(404).json({ error: "Produto não encontrado" });
      }

      res.json(produto.cores);
    } catch (error) {
      console.error("Erro ao buscar cores:", error);
      res.status(500).json({ error: "Erro interno do servidor" });
    }
  }

  static async atualizaProduto(req, res) {
    const { id } = req.params;
    const { nome, descricao, detalhes, cores } = req.body;

    try {
      const produto = await database.produtos.findByPk(id);
      if (!produto) {
        return res.status(404).json({ message: "Produto não encontrado" });
      }

      // Atualiza os dados do produto
      produto.nome = nome;
      produto.descricao = descricao;
      produto.detalhes = detalhes;
      await produto.save();

      // Se um array de cores foi enviado, atualiza as cores do produto
      if (cores && Array.isArray(cores)) {
        // Remove todas as cores atuais do produto
        await database.produtosxcores.destroy({ where: { produto_id: id } });

        // Adiciona as novas cores
        await Promise.all(
          cores.map(async (corId) => {
            await database.produtosxcores.create({
              produto_id: id,
              cor_id: corId,
            });
          })
        );
      }

      res.status(200).json(produto);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async excluiProduto(req, res) {
    const transaction = await database.sequelize.transaction();
    try {
      const { id } = req.params;

      // Verifica se o produto existe
      const produto = await database.produtos.findByPk(id, { transaction });
      if (!produto) {
        await transaction.rollback();
        return res.status(404).json("Produto não encontrado");
      }

      // Remove as relações com imagens e cores
      await database.imagensxprodutos.destroy({
        where: { product_id: id },
        transaction,
      });
      await database.produtosxcores.destroy({
        where: { produto_id: id },
        transaction,
      });

      // Exclui o produto
      await database.produtos.destroy({ where: { id: id }, transaction });

      await transaction.commit();
      res
        .status(200)
        .json("Produto e todas suas associações foram excluídos com sucesso");
    } catch (error) {
      await transaction.rollback();
      res.status(400).json({ error: error.message });
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

  static async removeCorDoProduto(req, res) {
    const { id } = req.params; // ID do produto
    const { corId } = req.body; // ID da cor a ser removida

    try {
      const produto = await database.produtos.findByPk(id);
      if (!produto) {
        return res.status(404).json({ message: "Produto não encontrado" });
      }

      const deletado = await database.produtosxcores.destroy({
        where: {
          produto_id: id,
          cor_id: corId,
        },
      });

      if (deletado === 0) {
        return res
          .status(404)
          .json({ message: "Cor não encontrada no produto" });
      }

      res.status(200).json({ message: "Cor removida do produto com sucesso" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
};
