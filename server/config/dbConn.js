import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const CONNECTION_URL = process.env.CONNECTION_URL;

const connectDB = async () => {
  try {
    await mongoose.connect(CONNECTION_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (err) {
    console.log(err);
  }
};

export default connectDB;
