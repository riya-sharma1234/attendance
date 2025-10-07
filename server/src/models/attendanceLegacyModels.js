import mongoose from "mongoose";

const attendanceLegacySchema = new mongoose.Schema({
  employeeId: { type: String, required: true },
  employeeName: { type: String, required: true },
  attendanceDate: { type: Date, required: true },
  inTime: { type: String, required: true },   // or Date if you parse it
  outTime: { type: String, required: true },  // or Date if you parse it
}, { timestamps: true });

export default mongoose.model("AttendanceLegacy", attendanceLegacySchema);
