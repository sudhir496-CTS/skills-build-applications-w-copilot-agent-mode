import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const seedDatabase = async (): Promise<void> => {
  const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit-tracker';
  
  try {
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB for seeding');
    
    // Add seed data here
    console.log('Seed data added successfully');
    
    await mongoose.connection.close();
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
};

seedDatabase();
