'use strict';

const { v4: uuidv4 } = require('uuid'); // optional, or you can use your generateReferralCode util

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Get all users
    const users = await queryInterface.sequelize.query(
      `SELECT id, name FROM Users;`,
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    // Update each user with a referral code
    for (const user of users) {
      const referralCode = `REF-${user.name.toUpperCase().replace(/\s+/g, '')}-${Math.floor(Math.random() * 10000)}`;
      await queryInterface.sequelize.query(
        `UPDATE Users SET referralCode = :referralCode WHERE id = :id`,
        { replacements: { referralCode, id: user.id } }
      );
    }
  },

  down: async (queryInterface, Sequelize) => {
    // Undo: reset referral codes to null
    await queryInterface.sequelize.query(
      `UPDATE Users SET referralCode = NULL;`
    );
  }
};
