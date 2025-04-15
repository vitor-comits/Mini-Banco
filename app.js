require('dotenv').config();
const db = require('./models');
const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');

const { sequelize } = require('./models');

const app = express();

//Rota utilizada 3333
const PORT = process.env.PORT || 3333;

app.use(bodyParser.json());

// Testa conexão com o banco
sequelize.authenticate()
  .then(() => console.log(' Conectado ao banco de dados com sucesso'))
  .catch(err => console.error(' Erro ao conectar no banco:', err));

// Rotas
app.use('/', require('./routes'));

// Rota padrão para erros
app.use((req, res) => res.status(404).json({ error: 'Rota não encontrada' }));

app.listen(PORT, () => {
  console.log(` Servidor rodando na porta ${PORT}`);
});

app.use(express.json());
app.use(routes);