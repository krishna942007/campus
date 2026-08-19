import mongoose from "mongoose";
import dns from "dns";

const connectDB = async () => {
  try {
    // Set reliable public DNS servers to resolve MongoDB Atlas SRV records on Windows/ISPs
    try {
      dns.setServers(["8.8.8.8", "1.1.1.1", "8.8.4.4"]);
    } catch (dnsErr) {
      // Ignore if system restricts custom DNS servers
    }

    const uri = process.env.MONGODB_URI;
    if (!uri) {
      throw new Error("MONGODB_URI environment variable is not defined in .env");
    }

    const dbName = process.env.DB_NAME || "vitara";

    const connectionInstance = await mongoose.connect(uri, {
      dbName: dbName,
    });

    console.log(
      `\n⚙️ MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`
    );
    return connectionInstance;
  } catch (error) {
    console.error("MONGODB Connection Error: ", error.message || error);
    process.exit(1);
  }
};

export default connectDB;
