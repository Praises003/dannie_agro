const cartService = require("../services/cartService");

const addToCart = async (req, res) => {

  try {

    const { productId, quantity } = req.body;

    const cartItem = await cartService.addToCart(
      req.user.id,
      productId,
      quantity
    );

    res.status(201).json(cartItem);

  } catch (error) {

    res.status(400).json({ error: error.message });

  }
};


const getCart = async (req, res) => {

  try {

    const cart = await cartService.getCart(req.user.id);

    res.status(200).json(cart);

  } catch (error) {

    res.status(400).json({ error: error.message });

  }
};


const removeItem = async (req, res) => {

  try {

    const result = await cartService.removeCartItem(req.params.id);

    res.status(200).json(result);

  } catch (error) {

    res.status(400).json({ error: error.message });

  }
};


module.exports = {
  addToCart,
  getCart,
  removeItem
};