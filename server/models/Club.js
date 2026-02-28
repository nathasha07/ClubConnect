import mongoose from "mongoose";

const clubSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true
    },
    description: String,
    category: String,
    facultyCoordinator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      }
    ],
    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active"
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
);

const Club = mongoose.model("Club", clubSchema);

export default Club;
