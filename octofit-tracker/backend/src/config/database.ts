import mongoose from 'mongoose';

const connectDB = async (): Promise<void> => {
  const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

  try {
    await mongoose.connect(mongoUri);
    console.log(`MongoDB connected successfully to ${mongoUri}`);
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

export default connectDB;
