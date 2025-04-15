'use strict';
module.exports = (sequelize, DataTypes) => {
  const Transacao = sequelize.define('Transacao', {
    id: {
      type: DataTypes.UUID,
      defaultValue: sequelize.literal('gen_random_uuid()'),
      primaryKey: true
    },
    conta_id: {
      type: DataTypes.UUID,
      allowNull: false
    },
    data_hora: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false
    },
    tipo: {
      type: DataTypes.STRING,
      allowNull: false
    },
    valor: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: false
    },
    descricao: {
      type: DataTypes.TEXT
    },
    instituicao_id: {
      type: DataTypes.UUID
    },
    usuario_id: {
      type: DataTypes.UUID
    }
  }, {
    tableName: 'Transacoes',
    timestamps: false
  });

  Transacao.associate = (models) => {
    Transacao.belongsTo(models.Conta, { foreignKey: 'conta_id' });
    Transacao.belongsTo(models.Instituicao, { foreignKey: 'instituicao_id' });
    Transacao.belongsTo(models.Usuario, { foreignKey: 'usuario_id' });
  };

  return Transacao;
};