import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/authRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";
import registrationRoutes from "./routes/registrationRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import clubRoutes from "./routes/clubRoutes.js";

dotenv.config();

const app = express();

// ==========================
// Middlewares
// ==========================
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://club-connect-3844-git-main-nathasha07s-projects.vercel.app"
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));
app.use(express.json());

// ==========================
// Routes
// ==========================
app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/registrations", registrationRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/clubs", clubRoutes);

// Health Check Route
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Smart Campus API Running 🚀"
  });
});

// ==========================
// Global Error Handler
// ==========================
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: "Something went wrong!",
    error: err.message
  });
});

// ==========================
// Database Connection
// ==========================
const PORT = process.env.PORT || 5000;

console.log("Starting server...");
console.log("MONGO_URI:", process.env.MONGO_URI ? "✓ Configured" : "✗ Missing");
console.log("JWT_SECRET:", process.env.JWT_SECRET ? "✓ Configured" : "✗ Missing");

// Start server first, attempt DB connection separately
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 🚀`);
});

mongoose.connect(process.env.MONGO_URI, {
  serverSelectionTimeoutMS: 5000,
  connectTimeoutMS: 10000,
})
  .then(() => {
    console.log("MongoDB Connected ✅");
  })
  .catch((err) => {
    console.error("MongoDB Connection Failed ❌");
    console.error("Error:", err.message);
    console.error("\n⚠️  IP WHITELIST ERROR?");
    console.error("If you're getting 'not whitelisted' error, go to:");
    console.error("https://www.mongodb.com/docs/atlas/security-whitelist/");
    console.error("Add your current IP or 0.0.0.0/0 (all IPs) to the whitelist");
    console.error("\nServer is still running on port", PORT);
  });
