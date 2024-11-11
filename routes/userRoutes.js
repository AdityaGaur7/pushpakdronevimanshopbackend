const express = require('express');
const { signUp, login, updateUser, getUserById } = require('../controllers/userController');
const { authenticate } = require('../middlewares/authMiddleware')
const router = express.Router();

router.post('/signup', signUp);
router.post('/login', login);
router.put('/update/:id', authenticate, updateUser);
router.get('/:id', authenticate, getUserById);

module.exports = router;
