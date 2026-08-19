import dotenv from "dotenv";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env FIRST — before any other module gets imported
dotenv.config({ path: path.resolve(__dirname, "../.env"), quiet: true });

// Import app and connectDB after env vars are set
const { app } = await import("./app.js");
const { default: connectDB } = await import("./db/index.js");

connectDB()
  .then(() => {
    const PORT = process.env.PORT || 5000;

    app.on("error", (error) => {
      console.log("Server error: " + error);
      throw error;
    });

    const server = app.listen(PORT, () => {
      console.log(`✅ Server is running on port: ${PORT}`);
    });

    server.on("close", () => {
      console.log("The server is shutting down.");
    });
  })
  .catch((error) => {
    console.error("MONGO db connection failed !!! ", error);
    process.exit(1);
  });
