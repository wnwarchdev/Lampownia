const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String },
  image: { type: String },
  description: { type: String },
  price: { type: Number },
  value: { type: Number },
  id: { type: String },
});

module.exports = mongoose.model('Product', productSchema);