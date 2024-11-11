const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  images: {
    type: [String],
    required: true,
  },
  sold: {
    type: Number,
    default: 0,
  },
  link: {
    type: String,
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
