import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import User from "./models/User.js";

dotenv.config();

const testUsers = [
  {
    name: "John Student",
    email: "student@test.com",
    password: "password123",
    role: "Student",
    department: "CSE"
  },
  {
    name: "Sarah Coordinator",
    email: "coordinator@test.com",
    password: "password123",
    role: "Coordinator",
    department: "CSE"
  },
  {
    name: "Admin User",
    email: "admin@test.com",
    password: "password123",
    role: "Admin",
    department: "Admin Office"
  }
];

const createTestUsers = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("📦 MongoDB Connected");

    for (const userData of testUsers) {
      try {
        // Check if user exists
        const existingUser = await User.findOne({ email: userData.email });
        if (existingUser) {
          console.log(`⚠️  ${userData.role} (${userData.email}): Already exists`);
          continue;
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(userData.password, 10);

        // Create user
        const user = await User.create({
          name: userData.name,
          email: userData.email,
          password: hashedPassword,
          role: userData.role,
          department: userData.department
        });

        console.log(`✅ Created ${userData.role}: ${userData.email}`);
      } catch (error) {
        console.error(`❌ Error creating ${userData.role}:`, error.message);
      }
    }

    console.log("\n📋 Test Users Summary:");
    console.log("========================");
    for (const user of testUsers) {
      console.log(`\n${user.role}:`);
      console.log(`  Email: ${user.email}`);
      console.log(`  Password: ${user.password}`);
    }

    await mongoose.connection.close();
    console.log("\n✅ Done!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Connection Error:", error);
    process.exit(1);
  }
};

createTestUsers();
