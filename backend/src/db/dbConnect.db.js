import mongoose from "mongoose";

const connectDB = async () => {
  const connectionInstance = await mongoose.connect(
    `${process.env.MONGODB_URI}`
  );
};

export default connectDB;
