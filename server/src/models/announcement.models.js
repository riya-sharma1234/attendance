import mongoose from "mongoose";

const announcementSchema = new mongoose.Schema({
  title: { type: String,  },
  message: { type: String, },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("Announcement", announcementSchema);
