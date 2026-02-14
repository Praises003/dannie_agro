const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    referralCode: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
    },

    referredBy: {
      type: DataTypes.INTEGER, // stores referrer user ID
      allowNull: true,
    },

    isAdmin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  });

  return User;
};
