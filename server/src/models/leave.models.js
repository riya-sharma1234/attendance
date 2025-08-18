// leave.models.js
import mongoose from "mongoose";

const leaveSchema = new mongoose.Schema({
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  leaveType: {
    type: String,
    enum: ["casual", "planned", "sick", "wfh",],
    required: true
  },
  fromDate: Date,
  toDate: Date,
  reason: String,
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending"
  },
  appliedAt: {
    type: Date,
    default: Date.now
  },
  month: Number,
  year: Number   
});

// Auto fill month/year before save
leaveSchema.pre("save", function (next) {
  const date = this.fromDate || this.appliedAt;
  this.month = date.getMonth() + 1; // 1-12
  this.year = date.getFullYear();
  next();
});

export default mongoose.model("Leave", leaveSchema);
