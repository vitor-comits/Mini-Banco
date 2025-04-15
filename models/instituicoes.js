module.exports = (sequelize, DataTypes) => {
  const Instituicao = sequelize.define('Instituicao', {
    id: {
      type: DataTypes.UUID,
      defaultValue: sequelize.literal('gen_random_uuid()'),
      primaryKey: true
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false
    },
    codigo_banco: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    data_cadastro: {
      type: DataTypes.DATE,
      defaultValue: sequelize.fn('NOW')
    }
  }, {
    tableName: 'Instituicoes',
    timestamps: false
  });
  Instituicao.associate = (models) => {
    Instituicao.hasMany(models.Conta, { foreignKey: 'instituicao_id' });
  };

  return Instituicao;
};