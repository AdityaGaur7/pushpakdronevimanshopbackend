const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/env');

class UserService {
    async register(userData) {
        const { username, email, password, address, image } = userData;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, email, password: hashedPassword, address, image });
        return await user.save();
    }

    async login(email, password) {
        const user = await User.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            throw new Error('Invalid credentials');
        }
        return user;
    }

    async findById(id) {
        return await User.findById(id);
    }

    async findByUsername(username) {
        return await User.findOne({ username });
    }

    async findByEmail(email) {
        return await User.findOne({ email });
    }

    generateToken(user) {
        return jwt.sign({ id: user._id, isAdmin: user.isAdmin }, JWT_SECRET, { expiresIn: '1h' });
    }
}

module.exports = new UserService();
