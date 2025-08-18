import mongoose from "mongoose";

const documentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  fileUrl: {
    type: String, // store file path or cloud URL
    required: true
  },
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  visibility: {
    type: String,
    enum: ["private", "public", "selected"], 
    default: "private"
  },
  allowedUsers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  ], // only used if visibility = "selected"
}, { timestamps: true });

export default mongoose.model("Document", documentSchema);
