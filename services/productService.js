const Product = require('../models/Product');

class ProductService {
    async createProduct(productData) {
        const product = new Product(productData);
        return await product.save();
    }

    async getAllProducts() {
        return await Product.find();
    }

    async getProductById(id) {
        return await Product.findById(id);
    }

    async updateProduct(id, productData) {
        return await Product.findByIdAndUpdate(id, productData, { new: true });
    }

    async deleteProduct(id) {
        return await Product.findByIdAndDelete(id);
    }

    async searchProducts(keyword) {
        return await Product.find({
            name: { $regex: keyword, $options: 'i' },
        });
    }

    async getTop4SoldProducts() {
        return await Product.find().sort({ sold: -1 }).limit(4);
    }

    async updateSoldCount(id, soldCount) {
        return await Product.findByIdAndUpdate(id, { $inc: { sold: soldCount } }, { new: true });
    }
}

module.exports = new ProductService();
