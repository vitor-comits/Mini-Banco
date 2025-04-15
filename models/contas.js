module.exports = (sequelize, DataTypes) => {
  const Conta = sequelize.define('Conta', {
    id: {
      type: DataTypes.UUID,
      defaultValue: sequelize.literal('gen_random_uuid()'),
      primaryKey: true
    },
    usuario_id: {
      type: DataTypes.UUID,
      allowNull: false
    },
    instituicao_id: {
      type: DataTypes.UUID,
      allowNull: false
    },
    agencia: {
      type: DataTypes.STRING,
      allowNull: false
    },
    numero_conta: {
      type: DataTypes.STRING,
      allowNull: false
    },
    saldo: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: false,
      defaultValue: 0
    },
    data_cadastro: {
      type: DataTypes.DATE,
      defaultValue: sequelize.fn('NOW')
    }
  }, {
    tableName: 'Contas',
    timestamps: false
  });

  Conta.associate = (models) => {
    Conta.belongsTo(models.Usuario, { foreignKey: 'usuario_id' });
    Conta.belongsTo(models.Instituicao, { foreignKey: 'instituicao_id' });
  };

  return Conta;
};