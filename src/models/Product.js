const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Product = sequelize.define('Product', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    slug: {
      type: DataTypes.STRING,
      unique: true,
    },

    productCode: {
      type: DataTypes.STRING,
      unique: true, // SKU
      allowNull: false,
    },

    description: {
      type: DataTypes.TEXT,
    },

    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },

    points: {
      type: DataTypes.INTEGER,
      defaultValue: 0, // points earned per purchase
    },

    category: {
      type: DataTypes.STRING,
    },

    stock: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },

    image: {
      type: DataTypes.STRING,
    },
    imagePublicId: {
      type: DataTypes.STRING,
    },

    isFeatured: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  });

  return Product;
};