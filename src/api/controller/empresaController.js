const database = require("../models/");
const { v4: uuidv4 } = require("uuid");
const nodemailer = require("nodemailer");
const path = require("path");
require('dotenv').config();

module.exports = class empresaController {
  static async criaEmpresa(req, res) {
    const { nome, descricao, instagram, telefone, cnpj, email, endereco } =
      req.body;
    const logo = req.file; // Corrigi a extração do 'file'
    try {
      const empresa = await database.empresa.create({
        id: uuidv4(),
        nome: nome,
        descricao: descricao,
        endereco: endereco,
        instagram: instagram,
        telefone: telefone,
        cnpj: cnpj,
        email: email,
        logo: logo.path,
      });

      res.status(202).json(empresa); // Responda com um objeto JSON
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async newsletter(req, res) {
    const { nome, email, mensagem } = req.body;

    try {
      // Buscar o e-mail da empresa no banco de dados
      const dadosEmpresa = await database.empresa.findOne();
      if (!dadosEmpresa || !dadosEmpresa.email) {
        return res
          .status(404)
          .json({ message: "E-mail da empresa não encontrado" });
      }

      // Configuração do Nodemailer com credenciais do .env
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: false, // true para 465, false para outras portas
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      // Configuração do e-mail
      const mailOptions = {
        from: `"${nome}" <${email}>`, // Nome e e-mail do remetente
        to: dadosEmpresa.email, // E-mail da empresa
        subject: "Mensagem via Newsletter",
        text: `Você recebeu uma nova mensagem:
        
        Nome: ${nome}
        Email: ${email}
        Mensagem: ${mensagem}
      `,
        html: `
          <h3>Você recebeu uma nova mensagem:</h3>
          <p><strong>Nome:</strong> ${nome}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Mensagem:</strong> ${mensagem}</p>
        `,
      };

      console.log(mailOptions)

      // Envio do e-mail com async/await
      const info = await transporter.sendMail(mailOptions);
      console.log("E-mail enviado:", info.messageId);

      return res.status(200).json({ message: "E-mail enviado com sucesso!" });
    } catch (error) {
      console.error("Erro ao enviar e-mail:", error);
      return res.status(500).json({ error: "Erro ao enviar e-mail" });
    }
  }

  static async criaImagensEmpresa(req, res) {
    const { id } = req.params;
    const file = req.file;

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
      const empresa = await database.empresa.findByPk(
        "e04b837d-4c6d-43ed-be6e-35d86937a90a"
      );
      if (!empresa) {
        return res.status(404).json({ message: "Empresa não encontrada" });
      }
  
      const imagensxempresa = await database.imagensxempresa.findAll({
        where: { empresa_id: empresa.id },
      });
  
      const imagens = await Promise.all(
        imagensxempresa.map(async (ip) => {
          const imagem = await database.imagens.findOne({
            where: { id: ip.imagem_id },
            attributes: ["caminho"],
          });
          if (!imagem) return null;
          const fileName = path.basename(imagem.caminho);
          return `/uploads/${fileName}`;
        })
      );
  
      const resultado = {
        empresa: {
          id: empresa.id,
          nome: empresa.nome,
          descricao: empresa.descricao,
          telefone: empresa.telefone,
          instagram: empresa.instagram,
          endereco: empresa.endereco,
          cnpj: empresa.cnpj,
          email: empresa.email,
          logo: empresa.logo
            ? `/uploads/${path.basename(empresa.logo)}`
            : null,
        },
        imagens: imagens.filter(Boolean),
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
