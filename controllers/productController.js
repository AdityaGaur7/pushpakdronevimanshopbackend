const Product = require('../models/Product');

exports.createProduct = async (req, res) => {
  const productData = req.body;

  try {
    const newProduct = new Product(productData); // Ensure productData includes images as an array
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

exports.getProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

exports.updateProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedProduct) return res.status(404).json({ message: 'Product not found' });

    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

exports.deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) return res.status(404).json({ message: 'Product not found' });

    res.json({ message: 'Product deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

exports.searchProducts = async (req, res) => {
  const { keyword } = req.params;

  try {
    const products = await Product.find({ name: { $regex: keyword, $options: 'i' } });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

exports.getTop4SoldProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ sold: -1 }).limit(4);
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
