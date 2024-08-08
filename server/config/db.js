import mongoose from "mongoose";

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, { autoIndex: true });
    console.log("MongoDB connected...");
  } catch (error) {
    console.log("Failed to connect...");
  }
};

export default connectDb;
