const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {

  const CartItem = sequelize.define("CartItem", {

    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },

    cartId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    productId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    quantity: {
      type: DataTypes.INTEGER,
      defaultValue: 1
    }

  });

  return CartItem;
};