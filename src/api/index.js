const express = require("express");
const cors = require("cors");
require('dotenv').config()
const path = require("path");
const routes = require("../api/routes/index.js");
const sequelize = require("./config/database.js");

const app = express();
const port = process.env.PORT || 5000;

// Middleware para servir os arquivos estáticos do React
app.use(express.static(path.join(__dirname, "../../build")));

// Servir imagens e uploads
app.use("/uploads", express.static(path.join(__dirname, "../api/uploads")));
app.use("/src/api/uploads", express.static(path.join(__dirname, "../api/uploads")));

// Permitir requisições apenas do frontend
app.use(cors({
  origin: [process.env.REACT_APP_API_BASE_URL || "http://localhost:3000",  "http://localhost:5000"]
}));

// Rotas do backend
app.use(express.json());
routes(app);


// Sincronização forçada do Sequelize
sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("Sincronização forçada com o banco de dados concluída.");
  })
  .catch((error) => {
    console.error("Erro ao sincronizar com o banco de dados:", error);
  });

// 🔹 Qualquer outra rota que não seja API, redireciona para o React
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../../build", "index.html"));
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
