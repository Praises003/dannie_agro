'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

const basename = path.basename(__filename);
const config = require(__dirname + '/../config/config.js').development;

const db = {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

/*
|--------------------------------------------------------------------------
| Load all models
|--------------------------------------------------------------------------
*/

fs.readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js'
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

/*
|--------------------------------------------------------------------------
| Model Associations
|--------------------------------------------------------------------------
*/

const { User, Product, Cart, CartItem } = db;

/*
User -> Cart
*/

if (User && Cart) {

  User.hasOne(Cart, {
    foreignKey: "userId",
    onDelete: "CASCADE"
  });

  Cart.belongsTo(User, {
    foreignKey: "userId"
  });

}

/*
Cart -> CartItem
*/

if (Cart && CartItem) {

  Cart.hasMany(CartItem, {
    foreignKey: "cartId",
    onDelete: "CASCADE"
  });

  CartItem.belongsTo(Cart, {
    foreignKey: "cartId"
  });

}

/*
Product -> CartItem
*/

if (Product && CartItem) {

  Product.hasMany(CartItem, {
    foreignKey: "productId"
  });

  CartItem.belongsTo(Product, {
    foreignKey: "productId"
  });

}

/*
|--------------------------------------------------------------------------
| Export DB
|--------------------------------------------------------------------------
*/

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;