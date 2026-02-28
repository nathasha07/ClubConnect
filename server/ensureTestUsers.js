import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import User from "./models/User.js";

dotenv.config();

async function ensureTestUsers() {
  try {
    // Connect with explicit settings
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 10000,
    });
    
    console.log("✅ Connected to MongoDB");

    // Check and create admin
    let admin = await User.findOne({ email: "admin@test.com" });
    if (!admin) {
      console.log("Creating admin user...");
      const hashedPassword = await bcrypt.hash("password123", 10);
      admin = await User.create({
        name: "Admin User",
        email: "admin@test.com",
        password: hashedPassword,
        role: "Admin",
        department: "Admin Office"
      });
      console.log("✅ Admin created");
    } else {
      console.log("✅ Admin already exists");
    }

    // Check and create coordinator
    let coordinator = await User.findOne({ email: "coordinator@test.com" });
    if (!coordinator) {
      console.log("Creating coordinator user...");
      const hashedPassword = await bcrypt.hash("password123", 10);
      coordinator = await User.create({
        name: "Sarah Coordinator",
        email: "coordinator@test.com",
        password: hashedPassword,
        role: "Coordinator",
        department: "CSE"
      });
      console.log("✅ Coordinator created");
    } else {
      console.log("✅ Coordinator already exists");
    }

    // Check and create student
    let student = await User.findOne({ email: "student@test.com" });
    if (!student) {
      console.log("Creating student user...");
      const hashedPassword = await bcrypt.hash("password123", 10);
      student = await User.create({
        name: "John Student",
        email: "student@test.com",
        password: hashedPassword,
        role: "Student",
        department: "CSE"
      });
      console.log("✅ Student created");
    } else {
      console.log("✅ Student already exists");
    }

    console.log("\n📋 Test Credentials:");
    console.log("  Admin: admin@test.com / password123");
    console.log("  Coordinator: coordinator@test.com / password123");
    console.log("  Student: student@test.com / password123");

    await mongoose.disconnect();
    console.log("\n✅ Done!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error:", error.message);
    process.exit(1);
  }
}

ensureTestUsers();
