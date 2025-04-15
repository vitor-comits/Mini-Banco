'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Transacoes', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('gen_random_uuid()'),
        primaryKey: true
      },
      conta_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Contas',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      data_hora: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW')
      },
      tipo: {
        type: Sequelize.STRING,
        allowNull: false
      },
      valor: {
        type: Sequelize.DECIMAL(15, 2),
        allowNull: false
      },
      descricao: {
        type: Sequelize.TEXT
      },
      instituicao_id: {
        type: Sequelize.UUID,
        references: {
          model: 'Instituicoes',
          key: 'id'
        }
      },
      usuario_id: {
        type: Sequelize.UUID,
        references: {
          model: 'Usuarios',
          key: 'id'
        }
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Transacoes');
  }
};
