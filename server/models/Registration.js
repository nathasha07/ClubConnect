import mongoose from "mongoose";

const registrationSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event",
    required: true
  },
  status: {
    type: String,
    enum: ["Pending", "Approved", "Rejected"],
    default: "Pending"
  },
  attendance: {
    type: String,
    enum: ["Present", "Absent", "NotMarked"],
    default: "NotMarked"
  }
}, { timestamps: true });

const Registration = mongoose.model("Registration", registrationSchema);

export default Registration;