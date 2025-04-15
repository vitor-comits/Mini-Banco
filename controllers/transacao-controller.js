const { Transacao, Conta, Instituicao, Usuario } = require('../models');
const { Op } = require('sequelize');

module.exports = {
  // Criar nova transação
  async store(req, res) {
    try {
      const { conta_id, tipo, valor, descricao, instituicao_id, usuario_id } = req.body;

      const conta = await Conta.findByPk(conta_id);
      if (!conta) return res.status(404).json({ error: 'Conta não encontrada' });

      const novoSaldo = tipo === 'credito'
        ? parseFloat(conta.saldo) + parseFloat(valor)
        : parseFloat(conta.saldo) - parseFloat(valor);

      if (novoSaldo < 0 && tipo === 'debito') {
        return res.status(400).json({ error: 'Saldo insuficiente para débito' });
      }

      conta.saldo = novoSaldo;
      await conta.save();

      const transacao = await Transacao.create({
        conta_id,
        tipo,
        valor,
        descricao,
        instituicao_id,
        usuario_id
      });

      return res.status(201).json(transacao);
    } catch (err) {
      return res.status(500).json({ error: 'Erro ao criar transação', details: err.message });
    }
  },

  // Listar todas as transações
  async index(req, res) {
    try {
      const transacoes = await Transacao.findAll({
        include: [
          { model: Conta, include: [Instituicao] }
        ],
        order: [['data_hora', 'DESC']]
      });
      return res.json(transacoes);
    } catch (err) {
      return res.status(500).json({ error: 'Erro ao listar transações', details: err.message });
    }
  },

  // Buscar transação por ID
  async show(req, res) {
    try {
      const { id } = req.params;
      const transacao = await Transacao.findByPk(id, {
        include: [{ model: Conta, include: [Instituicao] }]
      });

      if (!transacao) {
        return res.status(404).json({ error: 'Transação não encontrada' });
      }

      return res.json(transacao);
    } catch (err) {
      return res.status(500).json({ error: 'Erro ao buscar transação', details: err.message });
    }
  },

  // Deletar transação
  async destroy(req, res) {
    try {
      const { id } = req.params;
      const transacao = await Transacao.findByPk(id);
      if (!transacao) return res.status(404).json({ error: 'Transação não encontrada' });

      await transacao.destroy();
      return res.status(204).send();
    } catch (err) {
      return res.status(500).json({ error: 'Erro ao deletar transação', details: err.message });
    }
  },

  // Extrato consolidado (por usuário e opcionalmente por instituição)
  async extrato(req, res) {
    const { id: usuario_id } = req.params;
    const { instituicao } = req.query;

    try {
      const where = { usuario_id };
      if (instituicao) {
        const inst = await Instituicao.findOne({ where: { nome: instituicao } });
        if (!inst) return res.status(404).json({ error: 'Instituição não encontrada' });
        where.instituicao_id = inst.id;
      }

      const transacoes = await Transacao.findAll({
        where,
        include: [{ model: Conta, include: [Instituicao] }],
        order: [['data_hora', 'DESC']]
      });

      return res.json(transacoes);
    } catch (err) {
      return res.status(500).json({ error: 'Erro ao buscar extrato', details: err.message });
    }
  },

  // Saldo consolidado (por usuário e opcionalmente por instituição)
  async saldo(req, res) {
    const { id: usuario_id } = req.params;
    const { instituicao } = req.query;

    try {
      let where = { usuario_id };

      if (instituicao) {
        const inst = await Instituicao.findOne({ where: { nome: instituicao } });
        if (!inst) return res.status(404).json({ error: 'Instituição não encontrada' });
        where.instituicao_id = inst.id;
      }

      const contas = await Conta.findAll({ where });
      const saldoTotal = contas.reduce((total, conta) => total + parseFloat(conta.saldo), 0);

      return res.json({ saldo: saldoTotal });
    } catch (err) {
      return res.status(500).json({ error: 'Erro ao buscar saldo', details: err.message });
    }
  }
};