const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  productsInCart: { type: Array, required: true, ref: 'cart' },
  order: {
    name: { type: String, required: [true, 'Name missing'], maxlength: 30},
    surname: { type: String, required: [true, 'Surname missing'], maxlength: 40 },
    email: { type: String, required: [true, 'Email missing'], match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Email not valid'] },
    adress: { type: String, required: [true, 'Adress missing'] },
    city: { type: String, required: [true, 'City missing'] },
    postcode: { type: String, required: [true, 'Postcode missing'], match: [/\d{2}-\d{3}/, 'Postcode not valid'] }, 
    message: { type: String, maxlength: 200 },
    delivery: { type: String, required: [true, 'Delivery method missing'] },
    orderId: { type: String, required: [true, 'Order ID missing'] },
    timestamp: { type: String, required: [true, 'Timestamp missing'] },
  },
});

module.exports = mongoose.model('Order', orderSchema);