const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');
dotenv.config();

const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const errorMiddleware = require('./middlewares/errorMiddleware');

const app = express();
const PORT = process.env.PORT || 8080;

// CORS Setup
const allowedOrigins = [
  'http://localhost:4200',  // Local Development
  'https://pushpakdronevimanshop.vercel.app', // Vercel frontend URL (no trailing slash)
];

app.use(cors({
  origin: function(origin, callback) {
    console.log('Origin:', origin);  // Log the origin for debugging
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      // Allow requests from allowed origins
      callback(null, true);
    } else {
      // Reject requests from disallowed origins
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,  // Allow cookies and authorization headers
}));

// Handle OPTIONS preflight request
app.options('*', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.status(200).end();
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);

// Default route
app.use('/', (req, res) => {
  res.send('API is running...');
});

// Error handling middleware (must be placed after routes)
app.use(errorMiddleware);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
