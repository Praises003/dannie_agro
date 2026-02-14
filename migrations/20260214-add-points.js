module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Users', 'points', {
      type: Sequelize.INTEGER,
      defaultValue: 0,
    });
  },

  async down(queryInterface) {
    await queryInterface.removeColumn('Users', 'points');
  },
};
