import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/authRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";
import registrationRoutes from "./routes/registrationRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";   // ✅ ADD THIS

dotenv.config();

const app = express();

// ==========================
// Middlewares
// ==========================
app.use(cors());
app.use(express.json());

// ==========================
// Routes
// ==========================
app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/registrations", registrationRoutes);
app.use("/api/admin", adminRoutes);   // ✅ ADD THIS

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

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected ✅");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT} 🚀`);
    });
  })
  .catch((err) => {
    console.error("MongoDB Connection Failed ❌", err);
  });