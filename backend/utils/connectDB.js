const mongoose = require('mongoose');

const connectDB = async (mongoURI) => {
  try {
    if (!mongoURI) {
      console.warn('Warning: MONGODB_URI is not set. Skipping DB connection. Set MONGODB_URI in Render environment variables for production.');
      return;
    }
    await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    // Do not exit the process; allow the server to start so deployment logs show the error and app can fail gracefully.
  }
};

module.exports = connectDB;
