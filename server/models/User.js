import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: {
    type: String,
    enum: ["Student", "Coordinator", "Admin"],
    default: "Student"
  },
  department: String,
  year: Number
});

export default mongoose.model("User", userSchema);