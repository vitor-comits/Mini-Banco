const { Conta, Transacao, Instituicao } = require('../models');

module.exports = {
  async saldoTotalUsuario(req, res) {
    const { usuario_id } = req.params;
    const contas = await Conta.findAll({ where: { usuario_id } });

    const saldoTotal = contas.reduce((total, conta) => {
      return total + parseFloat(conta.saldo);
    }, 0);

    return res.json({ usuario_id, saldo_total: saldoTotal });
  },

  async saldoPorInstituicao(req, res) {
    const { usuario_id, instituicao_id } = req.params;
    const contas = await Conta.findAll({ where: { usuario_id, instituicao_id } });

    const saldoTotal = contas.reduce((total, conta) => {
      return total + parseFloat(conta.saldo);
    }, 0);

    return res.json({ usuario_id, instituicao_id, saldo: saldoTotal });
  },

  async extratoUsuario(req, res) {
    const { usuario_id } = req.params;
    const transacoes = await Transacao.findAll({
      where: { usuario_id },
      include: ['Conta', 'Instituicao'],
      order: [['data_hora', 'DESC']]
    });

    return res.json(transacoes);
  },

  async extratoPorInstituicao(req, res) {
    const { usuario_id, instituicao_id } = req.params;
    const transacoes = await Transacao.findAll({
      where: { usuario_id, instituicao_id },
      include: ['Conta'],
      order: [['data_hora', 'DESC']]
    });

    return res.json(transacoes);
  }
};