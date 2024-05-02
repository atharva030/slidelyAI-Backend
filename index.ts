require('dotenv').config();
import mongoose, { ConnectOptions } from 'mongoose';
import app from './src/configs/express.config';
import http from 'http';
import logger from './src/configs/logger.config';
const mongoURI=process.env.MONGOURI
const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

export const connectToMongoDB = async (mongoURI: string) => {
  try {
    await mongoose.connect(mongoURI as string)
    logger.info('Connected to MongoDB');
    server.listen(PORT, () => {
      logger.info(`Server running at ${PORT}`);
  });
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1); // Exit the process if MongoDB connection fails
  }
};

connectToMongoDB(mongoURI);