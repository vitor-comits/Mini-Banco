const { Instituicao } = require('../models');

module.exports = {
  // Criar nova instituição
  async store(req, res) {
    try {
      const { nome, codigo_banco } = req.body;

      if (!nome || !codigo_banco) {
        return res.status(400).json({ error: 'Nome e código do banco são obrigatórios.' });
      }

      const instituicao = await Instituicao.create({ nome, codigo_banco });
      return res.status(201).json(instituicao);
    } catch (error) {
      return res.status(400).json({
        error: 'Erro ao criar instituição',
        detalhe: error.message
      });
    }
  },

  // Listar todas as instituições
  async index(req, res) {
    try {
      const instituicoes = await Instituicao.findAll();
      return res.json(instituicoes);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao buscar instituições' });
    }
  },

  // Buscar uma instituição por ID
  async show(req, res) {
    try {
      const { id } = req.params;
      const instituicao = await Instituicao.findByPk(id);

      if (!instituicao) {
        return res.status(404).json({ error: 'Instituição não encontrada' });
      }

      return res.json(instituicao);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao buscar instituição' });
    }
  },

  // Atualizar instituição
  async update(req, res) {
    try {
      const { id } = req.params;
      const { nome, codigo_banco } = req.body;

      const instituicao = await Instituicao.findByPk(id);

      if (!instituicao) {
        return res.status(404).json({ error: 'Instituição não encontrada' });
      }

      await instituicao.update({ nome, codigo_banco });

      return res.json(instituicao);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao atualizar instituição' });
    }
  },

  // Excluir instituição
  async destroy(req, res) {
    try {
      const { id } = req.params;
      const instituicao = await Instituicao.findByPk(id);

      if (!instituicao) {
        return res.status(404).json({ error: 'Instituição não encontrada' });
      }

      await instituicao.destroy();
      return res.status(204).send();
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao deletar instituição' });
    }
  }
};