const { Usuario } = require('../models');
const { Op } = require('sequelize');

module.exports = {
  // Criar um novo usuário
  async store(req, res) {
    try {
      const { nome, email, cpf } = req.body;

      // Validação básica
      if (!nome || !email || !cpf) {
        return res.status(400).json({ error: 'Nome, email e CPF são obrigatórios.' });
      }
        //Validação de email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)){
        return res.status(400).json({ error: 'Email inválido.'});
      }

        // Verificar se já existe um usuário com mesmo email ou cpf
        const usuarioExistente = await Usuario.findOne({
          where: {
            [Op.or]: [
              { email: email },
              { cpf: cpf}
            ]
          }
        });
  
        if (usuarioExistente) {
          return res.status(400).json({ error: 'Já existe um usuário com este email ou CPF.' });
        }
     

      const usuario = await Usuario.create({ nome, email, cpf });
      return res.status(201).json(usuario);
    } catch (error) {
      return res.status(400).json({ error: 'Erro ao criar usuário', detalhe: error.message });
    }
  },

  // Listar todos os usuários
  async index(req, res) {
    try {
      const usuarios = await Usuario.findAll();
      return res.status(200).json(usuarios);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao buscar usuários', detalhe: error.message });
    }
  },

  // Buscar usuário por ID
  async show(req, res) {
    try {
      const { id } = req.params;
      const usuario = await Usuario.findByPk(id);

      if (!usuario) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
      }

      return res.status(200).json(usuario);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao buscar usuário', detalhe: error.message });
    }
  },

  // Atualizar usuário
  async update(req, res) {
    try {
      const { id } = req.params;
      const { nome, email, cpf } = req.body;

      const usuario = await Usuario.findByPk(id);
      if (!usuario) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
      }

      await usuario.update({ nome, email, cpf });
      return res.status(200).json(usuario);
    } catch (error) {
      return res.status(400).json({ error: 'Erro ao atualizar usuário', detalhe: error.message });
    }
  },

  // Deletar usuário
  async destroy(req, res) {
    try {
      const { id } = req.params;
      const deletado = await Usuario.destroy({ where: { id } });

      if (!deletado) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
      }

      return res.status(204).send();
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao deletar usuário', detalhe: error.message });
    }
  },
};
