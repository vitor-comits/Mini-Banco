const express = require('express');
const routes = express.Router();

 routes.get('/', (req, res) => {
  res.json({ mensagem: 'API está funcionando!' });
});

module.exports = routes;


// Controllers
const UsuarioController = require('../controllers/usuario-controller');
const InstituicaoController = require('../controllers/instituicao-controller');
const ContaController = require('../controllers/conta-controller');
const TransacaoController = require('../controllers/transacao-controller');

// Usuários (CRUD)
routes.post('/usuarios', UsuarioController.store);
routes.get('/usuarios', UsuarioController.index);
routes.get('/usuarios/:id', UsuarioController.show);
routes.put('/usuarios/:id', UsuarioController.update);
routes.delete('/usuarios/:id', UsuarioController.destroy);

// Instituições (CRUD)
routes.post('/instituicoes', InstituicaoController.store);
routes.get('/instituicoes', InstituicaoController.index);
routes.get('/instituicoes/:id', InstituicaoController.show);
routes.put('/instituicoes/:id', InstituicaoController.update);
routes.delete('/instituicoes/:id', InstituicaoController.destroy);

// Contas (CRUD)
routes.post('/contas', ContaController.store);
routes.get('/contas', ContaController.index);
routes.get('/contas/:id', ContaController.show);
routes.put('/contas/:id', ContaController.update);
routes.delete('/contas/:id', ContaController.destroy);

// Transações (CRUD)
routes.post('/transacoes', TransacaoController.store);      // Criar transação
routes.get('/transacoes', TransacaoController.index);        // Listar todas
routes.get('/transacoes/:id', TransacaoController.show);     // Detalhar por ID
routes.delete('/transacoes/:id', TransacaoController.destroy); // Remover

const RelatorioController = require('../controllers/relatorio-controller');

// Relatórios

//Saldo por instituição
routes.get('/relatorios/saldo/usuario/:usuario_id/instituicao/:instituicao_id', RelatorioController.saldoPorInstituicao);

//Extrato por instituição
routes.get('/relatorios/extrato/usuario/:usuario_id/instituicao/:instituicao_id', RelatorioController.extratoPorInstituicao);

//Extrato sem filtro
routes.get('/usuarios/:id/extrato', TransacaoController.extrato); 

//Saldo sem filtro
routes.get('/usuarios/:id/saldo', TransacaoController.saldo);     

module.exports = routes;