'use strict';


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Users', 'onboardingCompleted', {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    });

    await queryInterface.addColumn('Users', 'fullName', {
      type: Sequelize.STRING,
    });

    await queryInterface.addColumn('Users', 'username', {
      type: Sequelize.STRING,
    });

    await queryInterface.addColumn('Users', 'dateOfBirth', {
      type: Sequelize.DATE,
    });

    await queryInterface.addColumn('Users', 'phoneNumber', {
      type: Sequelize.STRING,
    });

    await queryInterface.addColumn('Users', 'altPhoneNumber', {
      type: Sequelize.STRING,
    });

    await queryInterface.addColumn('Users', 'address', {
      type: Sequelize.TEXT,
    });

    await queryInterface.addColumn('Users', 'nin', {
      type: Sequelize.STRING,
    });

    await queryInterface.addColumn('Users', 'bankName', {
      type: Sequelize.STRING,
    });

    await queryInterface.addColumn('Users', 'accountNumber', {
      type: Sequelize.STRING,
    });

    await queryInterface.addColumn('Users', 'accountName', {
      type: Sequelize.STRING,
    });

    await queryInterface.addColumn('Users', 'preferredCommunication', {
      type: Sequelize.STRING,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Users', 'onboardingCompleted');
    await queryInterface.removeColumn('Users', 'fullName');
    await queryInterface.removeColumn('Users', 'username');
    await queryInterface.removeColumn('Users', 'dateOfBirth');
    await queryInterface.removeColumn('Users', 'phoneNumber');
    await queryInterface.removeColumn('Users', 'altPhoneNumber');
    await queryInterface.removeColumn('Users', 'address');
    await queryInterface.removeColumn('Users', 'nin');
    await queryInterface.removeColumn('Users', 'bankName');
    await queryInterface.removeColumn('Users', 'accountNumber');
    await queryInterface.removeColumn('Users', 'accountName');
    await queryInterface.removeColumn('Users', 'preferredCommunication');
  }
};
    
