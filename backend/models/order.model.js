const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  productsInCart: { type: Array, required: true, ref: 'cart' },
  order: {
    name: { type: String, required: true },
    surname: { type: String, required: true },
    email: { type: String, required: true },
    adress: { type: String, required: true },
    city: { type: String, required: true },
    postcode: { type: String, required: true },
    message: { type: String },
  },
});

module.exports = mongoose.model('Order', orderSchema);