const express = require('express');
const { createProduct, getAllProducts, getProduct, updateProduct, deleteProduct, searchProducts, getTop4SoldProducts } = require('../controllers/productController');
const { authenticate } = require('../middlewares/authMiddleware')
const router = express.Router();

router.post('/', authenticate, createProduct);
router.get('/', getAllProducts);
router.get('/:id', getProduct);
router.put('/:id', authenticate, updateProduct);
router.delete('/:id', authenticate, deleteProduct);
router.get('/search/:keyword', searchProducts);
router.get('/topsold', getTop4SoldProducts);

module.exports = router;
