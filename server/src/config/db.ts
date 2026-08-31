import 'dotenv/config';
import mongoose from 'mongoose';

const mongoUrl = process.env.MONGO_URI;

if (!mongoUrl) {
  console.error(
    'MongoDB connection string is not defined in the environment variables.'
  );
} else {
  mongoose
    .connect(mongoUrl)
    .then(() => {
      console.log('Connected to MongoDB successfully.');
    })
    .catch((error: unknown) => {
      console.error('Error connecting to MongoDB:', error);
    });
}
