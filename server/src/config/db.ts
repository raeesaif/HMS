import 'dotenv/config';
import mongoose from 'mongoose';

const mongoUrl = process.env.MONGO_URI;

if (!mongoUrl) {
  console.log(
    'MongoDB connection string is not defined in the environment variables.'
  );
  process.exit(1);
}

mongoose
  .connect(mongoUrl)
  .then(() => {
    console.log('Connected to MongoDB successfully.');
  })
  .catch((error: unknown) => {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  });
