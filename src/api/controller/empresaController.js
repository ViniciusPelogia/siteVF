const database = require("../models/");
const { v4: uuidv4 } = require("uuid");
const path = require("path");

module.exports = class empresaController {
  static async criaEmpresa(req, res) {
    const { nome, descricao, instagram, telefone, cnpj } = req.body;
    const logo = req.file; // Corrigi a extração do 'file'
    try {
      const empresa = await database.empresa.create({
        id: uuidv4(),
        nome: nome,
        descricao: descricao,
        instagram: instagram,
        telefone: telefone,
        cnpj: cnpj,
        logo: logo.path,
      });

      res.status(202).json(empresa); // Responda com um objeto JSON
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async criaImagensEmpresa(req, res) {
    const { id } = req.params;
    const file  = req.file;

    try {
      const imagem = await database.imagens.create({
        id: uuidv4(),
        caminho: file.path,
      });

      const relacao = await database.imagensxempresa.create({
        imagem_id: imagem.id,
        empresa_id: id,
      });
      res.status(202).json({ imagem, relacao });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async buscaEmpresa(req, res) {
    try {
      const empresa = await database.empresa.findByPk('86e964b9-25df-4f6e-aacd-70c6d2161772');
      if (!empresa) {
        return res.status(404).json({ message: "Empresa não encontrada" });
      }
  
      const imagensxempresa = await database.imagensxempresa.findAll({
        where: { empresa_id: empresa.id }
      });
  
      const imagens = await Promise.all(
        imagensxempresa.map(async (ip) => {
          const imagem = await database.imagens.findOne({
            where: { id: ip.imagem_id },
            attributes: ['caminho']
          });
          return imagem ? path.basename(imagem.caminho).replace(/\\/g, '/') : null;
        })
      );
  
      const resultado = {
        empresa: {
          id: empresa.id,
          nome: empresa.nome,
          descricao: empresa.descricao,
          // Adicione outros campos que você quiser incluir
        },
        imagens: imagens.filter(caminho => caminho !== null)
      };
  
      res.status(200).json(resultado);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
  

  static async atualizaEmpresa(req, res) {
    const { id } = req.params;
    const { nome, descricao, logo, telefone, instagram, cnpj } = req.body;
    try {
      const empresa = await database.empresa.findByPk(id);
      if (empresa) {
        empresa.nome = nome;
        empresa.descricao = descricao;
        empresa.logo = logo;
        empresa.instagram = instagram;
        empresa.telefone = telefone;
        empresa.cnpj = cnpj;
        await empresa.save();
      }

      res.status(200).json(empresa);
    } catch (error) {
      res.status(400).json(error.message);
    }
  }

  static async apagaImagemEmpresa(req, res) {
    const { id } = req.body;

    try {
      await database.imagensxempresa.destroy({ where: { id: id } });
      await database.imagens.destroy({ where: { id: id } });

      res.status(200).json({ message: "Fundo Imagem Apagada" });
    } catch (error) {
      res.status(400).json(error.message);
    }
  }

  static async criaFundo(req, res) {
    const file = req.file; // Corrigi a extração do 'file'
    try {
      const imagem = await database.imagens.create({
        id: uuidv4(),
        caminho: file.path,
      });

      const fundo = await database.fundos.create({
        imagem_id: imagem.id,
      });

      res.status(202).json(fundo); // Responda com um objeto JSON
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async apagaFundo(req, res) {
    const { id } = req.params;

    try {
      await database.imagens.destroy({ where: { id: id } });
      await database.fundos.destroy({ where: { id: id } });

      res.status(200).json({ message: "Fundo apagado" });
    } catch (error) {
      res.status(400).json(error.message);
    }
  }
};
