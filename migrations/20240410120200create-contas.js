'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Contas', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('gen_random_uuid()'),
        primaryKey: true
      },
      usuario_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Usuarios',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      instituicao_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Instituicoes',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      agencia: {
        type: Sequelize.STRING,
        allowNull: false
      },
      numero_conta: {
        type: Sequelize.STRING,
        allowNull: false
      },
      saldo: {
        type: Sequelize.DECIMAL(15, 2),
        allowNull: false,
        defaultValue: 0
      },
      data_cadastro: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW')
      }
    });

    await queryInterface.addConstraint('Contas', {
      fields: ['usuario_id', 'instituicao_id', 'numero_conta'],
      type: 'unique',
      name: 'unique_conta_por_usuario_instituicao'
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Contas');
  }
};
