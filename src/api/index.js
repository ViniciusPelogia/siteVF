const express = require("express");
const cors = require("cors");
require('dotenv').config();
const path = require("path");
const routes = require("../api/routes/index.js");
const sequelize = require("./config/database.js");

const app = express();
const port = process.env.PORT || 5000;

// Middleware para tratar JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware para permitir requisições do frontend
app.use(cors({
  origin: [process.env.REACT_APP_API_BASE_URL || "http://localhost:3000"]
}));

// Servir imagens e uploads
app.use('/uploads', express.static(path.join(__dirname, 'api/uploads')));
console.log('Servindo imagens de:', path.join(__dirname, 'api/uploads'));


// Servir arquivos estáticos do React
app.use(express.static(path.join(__dirname, "../../build")));

// ✅ Aplicar o prefixo /api a TODAS as rotas
app.use("/api", routes);

// Rota fallback para React Router (SPA), mas ignora /uploads
app.get(/^\/(?!uploads).*/, (req, res) => {
  res.sendFile(path.join(__dirname, "../../build", "index.html"));
});

// Conectar ao banco e iniciar servidor
sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
  });
}).catch(err => {
  console.error("Erro ao conectar com o banco de dados:", err);
});
