const express = require("express");
const cors = require("cors");
require('dotenv').config();
const path = require("path");
const routes = require("../api/routes/index.js");
const sequelize = require("./config/database.js");

const app = express();
const port = process.env.PORT || 5000;

// Middleware para JSON
app.use(express.json());

// Permitir requisições apenas do frontend
app.use(cors({
  origin: [
    process.env.REACT_APP_API_BASE_URL || "http://localhost:3000",
    "http://localhost:5000"
  ]
}));

// Servir imagens e uploads
app.use("/uploads", express.static(path.join(__dirname, "../api/uploads")));
app.use("/src/api/uploads", express.static(path.join(__dirname, "../api/uploads")));

// 🔹 Rotas da API devem vir ANTES da aplicação React
routes(app);

// 🔹 Servir o React apenas se não for uma chamada de API
app.use(express.static(path.join(__dirname, "../../build")));
app.get("*", (req, res) => {
  // Se for rota de API, não responde com index.html
  if (req.originalUrl.startsWith("/api")) {
    return res.status(404).json({ message: "API route not found." });
  }
  res.sendFile(path.join(__dirname, "../../build", "index.html"));
});

// 🔹 Sincronizar banco de dados
sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("Sincronização forçada com o banco de dados concluída.");
  })
  .catch((error) => {
    console.error("Erro ao sincronizar com o banco de dados:", error);
  });

// 🔹 Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
