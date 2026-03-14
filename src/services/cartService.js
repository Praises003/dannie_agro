const { Cart, CartItem, Product } = require("../models");

const addToCart = async (userId, productId, quantity) => {

  let cart = await Cart.findOne({ where: { userId } });

  if (!cart) {
    cart = await Cart.create({ userId });
  }

  let cartItem = await CartItem.findOne({
    where: {
      cartId: cart.id,
      productId
    }
  });

  if (cartItem) {

    cartItem.quantity += quantity;
    await cartItem.save();

  } else {

    cartItem = await CartItem.create({
      cartId: cart.id,
      productId,
      quantity
    });

  }

  return cartItem;
};


// Get User Cart
const getCart = async (userId) => {

  const cart = await Cart.findOne({
    where: { userId },

    include: [
      {
        model: CartItem,

        include: [
          {
            model: Product
          }
        ]
      }
    ]
  });

  return cart;
};

// Remove Item from Cart

const removeCartItem = async (cartItemId) => {

  const item = await CartItem.findByPk(cartItemId);

  if (!item) {
    throw new Error("Cart item not found");
  }

  await item.destroy();

  return { message: "Item removed from cart" };
};

module.exports = {addToCart, getCart, removeCartItem}