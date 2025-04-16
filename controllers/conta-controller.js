const { Conta, Usuario } = require('../models');

module.exports = {
  // Criar conta
  async store(req, res) {
    try {
      const { usuario_id, instituicao_id, agencia, numero_conta, saldo } = req.body;

      if (!usuario_id || !instituicao_id || !agencia || !numero_conta) {
        return res.status(400).json({ error: 'Todos os campos obrigatórios devem ser preenchidos.' });
      }

       // Buscar CPF do usuário pelo ID
       const usuario = await Usuario.findByPk(usuario_id);
       if (!usuario) {
         return res.status(404).json({ error: 'Usuário não encontrado.' });
       }
 
       const { cpf } = usuario;
 
       // Verificar se já existe uma conta com o mesmo CPF e mesma instituição
       const contaExistente = await Conta.findOne({
         where: {
           instituicao_id,
           usuario_id
         }
       });
 
       if (contaExistente) {
         return res.status(409).json({
           error: 'Usuário já possui uma conta nesta instituição.'
         });
       }

      
      const conta = await Conta.create({ usuario_id, instituicao_id, agencia, numero_conta, saldo });
      return res.status(201).json(conta);
    } catch (error) {
      return res.status(400).json({
        error: 'Erro ao criar conta',
        detalhe: error.message
      });
    }
  },

  // Listar todas as contas
  async index(req, res) {
    try {
      const contas = await Conta.findAll();
      return res.json(contas);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao buscar contas' });
    }
  },

  // Buscar uma conta por ID
  async show(req, res) {
    try {
      const { id } = req.params;
      const conta = await Conta.findByPk(id);

      if (!conta) {
        return res.status(404).json({ error: 'Conta não encontrada' });
      }

      return res.json(conta);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao buscar conta' });
    }
  },

  // Atualizar conta
  async update(req, res) {
    try {
      const { id } = req.params;
      const { agencia, numero_conta, saldo } = req.body;

      const conta = await Conta.findByPk(id);

      if (!conta) {
        return res.status(404).json({ error: 'Conta não encontrada' });
      }

      await conta.update({ agencia, numero_conta, saldo });

      return res.json(conta);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao atualizar conta' });
    }
  },

  // Deletar conta
  async destroy(req, res) {
    try {
      const { id } = req.params;
      const conta = await Conta.findByPk(id);

      if (!conta) {
        return res.status(404).json({ error: 'Conta não encontrada' });
      }

      await conta.destroy();
      return res.status(204).send();
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao deletar conta' });
    }
  }
};