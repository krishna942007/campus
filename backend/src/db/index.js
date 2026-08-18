import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI || "mongodb://127.0.0.1:27017"}/${process.env.DB_NAME || "vitara_db"}`
    );
    console.log(
      `\n⚙️ MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`
    );
    return connectionInstance;
  } catch (error) {
    console.warn("⚠️ MONGODB Connection Warning: Local MongoDB is offline or MONGODB_URI is unconfigured.");
    console.warn("   Backend server will run in standalone Mode with in-memory state fallback.");
    return null;
  }
};

export default connectDB;
