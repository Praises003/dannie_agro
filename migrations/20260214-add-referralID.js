'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Users', 'referredBy', {
      type: Sequelize.INTEGER,
      allowNull: true,  // temporarily allow null for existing users
      references: {
        model: 'Users', // self-reference
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Users', 'referredBy');
  }
};
