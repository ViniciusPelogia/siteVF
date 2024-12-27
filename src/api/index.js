const express = require("express");
const cors = require("cors"); // Importa o middleware cors
const routes = require("../api/routes/index.js");
const sequelize = require("./config/database.js");

const app = express();
const port = 5000;

app.use(
  cors({
    origin: "http://localhost:3000", // Permite apenas requisições da origem especificada
  })
);

app.use(express.json());
routes(app);

// Sincronização forçada do Sequelize
sequelize
  .sync({ force: true })
  .then(() => {
    console.log("Sincronização forçada com o banco de dados concluída.");
  })
  .catch((error) => {
    console.error("Erro ao sincronizar com o banco de dados:", error);
  });

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
