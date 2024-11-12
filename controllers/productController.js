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

  if (!keyword) {
    return res.status(400).json({ message: 'Keyword is required' });
  }

  try {
    const products = await Product.find({
      $or: [
        { name: { $regex: keyword, $options: 'i' } },   // Search in 'name' field
        { description: { $regex: keyword, $options: 'i' } },  // Search in 'description' field
        { category: { $regex: keyword, $options: 'i' } }   // Search in 'category' field
      ]
    });

    res.json(products);
  } catch (error) {
    console.error("Error searching for products:", error);
    res.status(500).json({ message: 'Server error', error });
  }
};


exports.getTop4SoldProducts = async (req, res) => {
  try {
    // Ensure 'sold' exists in your schema, or replace with the correct field name
    const products = await Product.find()
      .sort({ sold: -1 }) // Adjust this field to match the actual field for sold count
      .limit(4);
    
    if (!products.length) {
      return res.status(404).json({ message: 'No products found' });
    }

    res.json(products);
  } catch (error) {
    console.error('Error fetching top sold products:', error); // Log error for debugging
    res.status(500).json({
      message: 'Server error',
      error: error.message || error // Send the error message for debugging
    });
  }


};
