import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: String,
  date: {
    type: Date,
    required: true
  },
  venue: String,
  category: String,
  maxParticipants: Number,
  club: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Club"
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  approvalStatus: {
    type: String,
    enum: ["Pending", "Approved", "Rejected"],
    default: "Pending"
  },
  approvedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  approvalComment: String
}, { timestamps: true });

const Event = mongoose.model("Event", eventSchema);

export default Event;