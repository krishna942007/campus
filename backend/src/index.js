import dotenv from "dotenv";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env FIRST — before any other module gets imported
dotenv.config({ path: path.resolve(__dirname, "../.env"), quiet: true });

// Dynamically import app AFTER env vars are set
const { app } = await import("./app.js");

// Optionally load DB connection if available
let connectDB = null;
try {
  const dbModule = await import("./db/index.js");
  connectDB = dbModule.default || dbModule.connectDB;
} catch (error) {
  // DB module not yet created or optional
}

const startServer = () => {
  const PORT = process.env.PORT || 8000;

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
};

if (connectDB) {
  connectDB()
    .then(() => {
      startServer();
    })
    .catch((error) => {
      console.log("Database connection failed !! ", error);
    });
} else {
  startServer();
}
