const productService = require('../services/productService');
const cloudinary = require('../config/cloudinary');


// ================== GET PRODUCTS ==================
const getProducts = async (req, res) => {
  try {
    const result = await productService.getAllProducts(req.query);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// ================== CREATE PRODUCT ==================
const createProduct = async (req, res) => {
  try {
    let imageUrl = null;
    let imagePublicId = null;

    const price = parseFloat(req.body.price);
    if (isNaN(price)) {
      return res.status(400).json({ error: "Invalid price value" });
    }

    if (req.files && req.files.image) {
      const file = req.files.image;

      const result = await cloudinary.uploader.upload(
        file.tempFilePath,
        { folder: "products" }
      );

      imageUrl = result.secure_url;
      imagePublicId = result.public_id;
    }

    const productData = {
      ...req.body,
      price,
      image: imageUrl,
      imagePublicId
    };

    const product = await productService.createProduct(productData);

    res.status(201).json(product);

  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


// ================== UPDATE PRODUCT ==================
const updateProduct = async (req, res) => {
  try {
    const product = await productService.getProductById(req.params.id);

    let updatedData = { ...req.body };

    // Validate price if updating
    if (req.body.price) {
      const price = parseFloat(req.body.price);
      if (isNaN(price)) {
        return res.status(400).json({ error: "Invalid price value" });
      }
      updatedData.price = price;
    }

    // If new image uploaded
    if (req.files && req.files.image) {

      // Delete old image from cloudinary
      if (product.imagePublicId) {
        await cloudinary.uploader.destroy(product.imagePublicId);
      }

      const result = await cloudinary.uploader.upload(
        req.files.image.tempFilePath,
        { folder: "products" }
      );

      updatedData.image = result.secure_url;
      updatedData.imagePublicId = result.public_id;
    }

    const updatedProduct = await productService.updateProduct(
      req.params.id,
      updatedData
    );

    res.status(200).json(updatedProduct);

  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


// ================== DELETE PRODUCT ==================
const deleteProduct = async (req, res) => {
  try {
    const product = await productService.getProductById(req.params.id);

    // Delete image from Cloudinary first
    if (product.imagePublicId) {
      await cloudinary.uploader.destroy(product.imagePublicId);
    }

    await productService.deleteProduct(req.params.id);

    res.status(200).json({ message: "Product deleted successfully" });

  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


module.exports = {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct
};