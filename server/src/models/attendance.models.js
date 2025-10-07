import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  date: { type: Date, required: true },
  punchIn: { type: Date },
  punchInLocation: { lat: Number, lon: Number },
  punchOut: { type: Date },
  punchOutLocation: { lat: Number, lon: Number },
}, { timestamps: true });

export default mongoose.model("Attendance", attendanceSchema);