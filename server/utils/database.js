import mongoose from 'mongoose';
import logger from './logger.js';

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      bufferCommands: false,
      bufferMaxEntries: 0,
    });

    logger.info(`📊 MongoDB Connected: ${conn.connection.host}`);
    
    mongoose.connection.on('error', (err) => {
      logger.error('MongoDB connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
      logger.warn('📊 MongoDB disconnected');
    });

    process.on('SIGINT', async () => {
      await mongoose.connection.close();
      logger.info('📊 MongoDB connection closed through app termination');
      process.exit(0);
    });

    return conn;
  } catch (error) {
    logger.error('❌ MongoDB connection failed:', error.message);
    process.exit(1);
  }
};

export const disconnectDB = async () => {
  try {
    await mongoose.connection.close();
    logger.info('📊 MongoDB disconnected successfully');
  } catch (error) {
    logger.error('❌ Error disconnecting from MongoDB:', error.message);
  }
};