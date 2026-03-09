const { Op } = require('sequelize');
const { Product } = require('../models');

const getAllProducts = async (query) => {
  const page = parseInt(query.page) || 1;
  const limit = parseInt(query.limit) || 10;
  const offset = (page - 1) * limit;

  const whereClause = {};

  if (query.search) {
    whereClause.name = {
      [Op.like]: `%${query.search}%`
    };
  }

  if (query.category) {
    whereClause.category = query.category;
  }

  if (query.minPrice && query.maxPrice) {
    whereClause.price = {
      [Op.between]: [query.minPrice, query.maxPrice]
    };
  }

  const { rows, count } = await Product.findAndCountAll({
    where: whereClause,
    limit,
    offset,
    order: [['createdAt', 'DESC']]
  });

  return {
    products: rows,
    total: count,
    page,
    pages: Math.ceil(count / limit)
  };
};

const getProductById = async (id) => {
  const product = await Product.findByPk(id);
  if (!product) throw new Error("Product not found");
  return product;
};

const createProduct = async (data) => {
  const {
    name,
    productCode,
    price,
    description,
    category,
    stock,
    image,
    points,
    isFeatured
  } = data;

  if (!productCode) {
    throw new Error("Product code (SKU) is required");
  }

  // Check duplicate SKU
  const existingSKU = await Product.findOne({
    where: { productCode }
  });

  if (existingSKU) {
    throw new Error("Product code already exists");
  }

  const product = await Product.create({
    name,
    productCode,
    price,
    description,
    category,
    stock,
    image,
    points,
    isFeatured
  });

  return product;
};

const updateProduct = async (id, data) => {
  const product = await Product.findByPk(id);

  if (!product) {
    throw new Error("Product not found");
  }

  await product.update(data);

  return product;
};

const deleteProduct = async (id) => {
  const product = await Product.findByPk(id);

  if (!product) {
    throw new Error("Product not found");
  }

  await product.destroy();

  return product;
};

module.exports = { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct };