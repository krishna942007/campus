import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI || "mongodb://127.0.0.1:27017"}/${process.env.DB_NAME || "vitara_db"}`
    );
    console.log(
      `\n⚙️ MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.log("MONGODB connection FAILED: ", error);
    process.exit(1);
  }
};

export default connectDB;
